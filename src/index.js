const { Client, Collection } = require("discord.js");
const { readdir, readdirSync } = require("fs");
const mongoose = require("mongoose");
require("dotenv").config(); // Loads .env file contents into process.env

const client = new Client({
    intents: ["Guilds", "GuildMessages", "GuildMembers", "MessageContent"], // Create intents for access to get messages, members, guilds
});

client.commands = new Collection(); // Create new Commands Collection
client.categories = readdirSync("./src/commands");

readdir("./src/handlers", (_, files) => {
    files.map((file) => {
        // Execute every handler
        let handler = file.split(".")[0];
        require(`./handlers/${handler}`)(client);
    });
});

(async function () {
    await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("MongoDB Connected."));
})();

client.login(process.env.TOKEN); // Login to the bot
