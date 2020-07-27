import {Message} from "discord.js"
export default {
    name: "ping",
    description: "Ping command!",
    execute(message : Message, args : string[]) {
        message.channel.send("Pong");
    }
};