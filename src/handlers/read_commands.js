const { readdir, readdirSync } = require("fs");

const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Load Status");

module.exports = (client) => {
    readdir("./src/commands/", (err, dirs) => {
        // Read categories in commands directory
        if (err) return console.log(err);

        dirs.forEach((dir) => {
            // Read every commands in each category
            const commands = readdirSync(`./src/commands/${dir}`).filter(
                (file) => file.endsWith(".js")
            );
            for (let file of commands) {
                // Check and set every command
                let props = require(`../commands/${dir}/${file}`);

                if (!props.run || !props.settings || !props.data) {
                    table.addRow(file, `✘`);
                    continue;
                } else {
                    const body = props.data;
                    client.commands.set(props.help.name, { props, body }); // Add command to Commands Collection
                    table.addRow(file, "✔");
                }
            }
        });

        console.log(table.toString());
    });
};
