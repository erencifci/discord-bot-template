const { readdir, readdirSync } = require("fs");

const ascii = require("ascii-table");
const table = new ascii("Events");
table.setHeading("Event", "Load Status");

module.exports = (client) => {
    readdir(__dirname + "/../events/", (err, dirs) => {
        // Read event categories in events directory
        if (err) return console.log(err);
        dirs.forEach((dir) => {
            // Read events in each event category
            const events = readdirSync(__dirname + `/../events/${dir}`).filter(
                (file) => file.endsWith(".js")
            );

            for (let file of events) {
                const event = require(`../events/${dir}/${file}`);
                let eventName = file.split(".")[0];
                if (typeof event != "function")
                    return table.addRow(eventName + ` (${dir})`, "✘");
                table.addRow(eventName + ` (${dir})`, "✔");
                client.on(eventName, event.bind(null, client)); // Add event to the bot to trigger events.
            }
        });
        console.log(table.toString());
    });
};
