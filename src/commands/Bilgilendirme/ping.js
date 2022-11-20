const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

exports.run = async function (client, interaction) {
    await interaction.deferReply();
    const { ws } = interaction.client;
    const discord_ping = ws.ping;
    const bot_ping = Math.abs(Date.now() - interaction.createdTimestamp);

    const embed = new Discord.EmbedBuilder()
        .setColor("Green")
        .setDescription(
            `Discord Gecikmesi: **__\`${discord_ping}\`__ ms**\nBot Gecikmesi: **__\`${bot_ping}\`__ ms**`
        );

    interaction.editReply({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
};

exports.help = {
    name: "ping",
    description: "Botun pingini gösterir.",
    usage: "ping",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};

exports.data = new Discord.SlashCommandBuilder()
    .setName(this.help.name)
    .setDescription(this.help.description);
