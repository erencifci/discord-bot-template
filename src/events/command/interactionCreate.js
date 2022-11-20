const Discord = require("discord.js");
const { ownerID } = require("../../../config.json");

let talkedRecently = new Set();

const embed = new Discord.EmbedBuilder().setColor("Red");

/**
 * @param {Discord.Client} client
 * @param {Discord.Interaction} interaction
 */

module.exports = async (client, interaction) => {
    if (!interaction.isChatInputCommand()) return; // Check if interaction is chat input

    let cmdName = interaction.commandName; // Get command name from user's interaction
    let cmd = client.commands.get(cmdName); // Get command from Commands Collection
    let settings = cmd.props.settings;
    let perm = settings.perm;

    const reply = (text) =>
        // Function to reply to the interaction
        interaction.reply({
            embeds: [embed.setDescription(`**${text}**`)],
            ephemeral: true, // Set only visible for the user
        });

    // If interaction sent by bot owner do not check
    if (interaction.user.id !== ownerID) {
        if (!settings.enabled) return reply("Bu komut şu anda devre dışı!");

        if (settings.onlyOwner)
            return reply("Bu komutu sadece bot sahibi kullanabilir!");

        // Permission Control
        if (perm && !interaction.memberPermissions.has(perm))
            return reply(
                `Bu komutu kullanmak için \`${perm}\` yetkisine sahip olmalısın!`
            );

        // Cooldown Control
        if (talkedRecently.has(interaction.user.id))
            return reply("Komutları çok hızlı kullanıyorsun!");

        talkedRecently.add(interaction.user.id);
        setTimeout(() => {
            talkedRecently.delete(interaction.user.id);
        }, 1500);
    }

    try {
        await cmd.props.run(client, interaction); // Execute command
    } catch (error) {
        let reply = {
            content: "Bilinmeyen bir hata oluştu!",
            ephemeral: true,
        };
        console.error(error);
        if (interaction.deferred) await interaction.editReply(reply);
        else interaction.reply(reply);
    }
};
