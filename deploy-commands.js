const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];

// Grab all the command files from the commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output from each of the command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prep an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// deploy commands
(async () => {
	try {
		console.log(`Start refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);

	} catch (error) {
		// Catch any errors
		console.error(error);
	}
})();