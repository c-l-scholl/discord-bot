// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance (guild means server)
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// collection of commands
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
	// Set a new item in the Collection with the key as the command name and
	// the value as the exported module
	// if ('data' in command && 'execute' in command) {
	// 	client.commands.set(command.data.name, command);
	// } else {
	// 	console.log(`[WARNING] The command at 
	// 	${filePath} is missing a required "data" or "execute" property.`);
	// }
}


// When the client is ready, run this code (only once)
// use 'c' for the event parameter to differentiate from 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Execute commands
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) {
		return;
	}
	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

// Login to discord using the client token
client.login(token);
