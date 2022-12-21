// Require the necessary discord.js classes

const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('../config.json');

// Create a new client instance

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
// ^ guild means discord server

// When the client is ready, run this code (only once)
// use 'c' for the event parameter to differentiate from 'client'

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Login to discord using the client token

client.login(token);
