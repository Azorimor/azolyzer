import {
  getRepository,
} from 'typeorm';
import Transport from 'winston-transport';
import {
  WinstonLog,
} from '../entity/WinstonLog';
import moment from 'moment';

/**
 * Class for the Postgres transport object.
 * @class
 * @param {Object} options
 * @param {String} [options.level=info] - Level of messages that this transport
 * should log.
 * @param {Boolean} [options.silent=false] - Boolean flag indicating whether to
 * suppress output.
 * @param {String} [options.label] - Label stored with entry object if defined.
 * @param {String} [options.name] - Transport instance identifier. Useful if you
 * need to create multiple Postgres transports.
 */
export class PostgresTransport extends Transport {
  private name: string;
  /**
   * Create a new Transport.
   * @param {object} options The options for the logger.
   */
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
   * @param {any} info Level at which to log the message. See
   * [info.message, info.level, info.meta]
   * @param {Function} callback Continuation to respond to when complete.
   * @return {any} If this logger is silent, null gets returned.
   */
  log(info : any, callback: () => void):any {
    setImmediate(() => {
      this.emit('logged', info);
    });

    if (this.silent) {
      callback();
      return null;
    }
    const logRepository = getRepository(WinstonLog);
    const logEntry = logRepository.create({
      timestamp: moment().utc().format(),
      level: info.level,
      message: info.message,
      meta: info.meta,
      service: info.service,
    });
    logRepository.save(logEntry);
    callback();
  }
}
