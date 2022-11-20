const Discord = require("discord.js");
const register_commands = require("./register_commands");

/**
 * @param {Discord.Client} client
 */

module.exports = (client) => {
    client.guilds.cache.forEach(async (guild) => {
        const commands =
            // Fetch every commands from the guild
            (await guild.commands.fetch().catch(() => {})) ||
            client.commands.size;
        if (commands.size != client.commands.size) {
            // If guild's commands isn't equal to bot's commands, register commands
            register_commands(guild);
        }
    });
};
