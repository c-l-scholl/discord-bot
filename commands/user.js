const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user'),
	async execute(interaction) {
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the object representing the GuildMember (member of the server), which
		// represents the user in a specific guild (server)
		await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};