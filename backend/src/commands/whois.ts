import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

export class WhoIsCommand extends Command {
    constructor(client : CommandoClient) {
        super(client, {
            name: "whois",
            group: "moderation",
            memberName: "whois",
            description: "Return user information about a mentioned user.",
            aliases: ["userinfo"]
        });
    }

    run(message: CommandoMessage){
        return message.say("Testing");
    }
};