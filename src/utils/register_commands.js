const { REST, Routes } = require("discord.js");

module.exports = async (guild) => {
    const client = guild.client;
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN); // Create new REST with token
    const body = client.commands.map((command) => command.body); // Get body of every command
    try {
        // Register commands
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            {
                body,
            }
        );
    } catch (e) {
        console.log(e);
    }
};
