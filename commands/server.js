const { SlashCommandBuilder } = require('discord.js');
// const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server'),
	async execute(interaction) {
		// for delaying a message
		// await interaction.deferReply();
		// await wait(4000);
		// await interaction.editReply(`This server is ${interaction.guild.name} and has
		// 	${interaction.guild.memberCount} users.`);

		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} users.`);
	},
};