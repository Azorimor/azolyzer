/**
 * @module 'winston-pg-native'
 * @fileoverview Winston transport for logging into PostgreSQL
 * @license MIT
 * @author Andrei Tretyakov <andrei.tretyakov@gmail.com>
 * @author Jeffrey Yang <jeffrey.a.yang@gmail.com>
 */

import {getRepository, Repository, getConnection} from "typeorm";
import Transport from "winston-transport";
import { WinstonLog } from "../entity/WinstonLog";
import moment from "moment";

/**
 * Class for the Postgres transport object.
 * @class
 * @param {Object} options
 * @param {String} [options.level=info] - Level of messages that this transport
 * should log.
 * @param {Boolean} [options.silent=false] - Boolean flag indicating whether to
 * suppress output.
 * @param {String} options.conString - Postgres connection uri
 * @param {String} [options.tableName='winston_logs'] - The name of the table you
 * want to store log messages in.
 * @param {Array} [options.tableFields=['level', 'msg', 'meta']] - array of the table fields
 * @param {String} [options.label] - Label stored with entry object if defined.
 * @param {String} [options.name] - Transport instance identifier. Useful if you
 * need to create multiple Postgres transports.
 */
export class PostgresTransport extends Transport {

  private name: string;

  constructor(options : any) {
    super(options);
    //
    // Name this logger
    //
    this.name = options.name || 'Postgres';
    //
    // Set the level from your options
    //
    this.level = options.level || 'info';

    this.silent = options.silent || false;
  }

  /**
   * Core logging method exposed to Winston. Metadata is optional.
   * @param {string} level Level at which to log the message.
   * @param {string} message Message to log
   * @param {Object=} meta Metadata to log
   * @param {Function} callback Continuation to respond to when complete.
   */
  log(info : any, callback: () => void) {
    setImmediate(() => {
      this.emit("logged",info);
    });

    if (this.silent) {
      callback();
      return null;
    }
    const logRepository = getRepository(WinstonLog);
    const logEntry = logRepository.create({
      timestamp : moment().utc().format(),
      level: info.level,
      message: info.message,
      meta: info.meta,
      service: info.service
    });
    logRepository.save(logEntry);
    callback();
  }
}
