/**
 * Class for all Events, the discord bot should listen to.
 * An Instance of this class should handle all events of its type.
 */
export class DiscordEvent {
  name: string;

  /**
   * Create the Eventhandler class.
   * @param {string} name The discord name of the event.
   */
  constructor(name:string) {
    this.name = name;
  }
}
