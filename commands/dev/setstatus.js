const { SlashCommandBuilder } = require('discord.js');

const botDevID = '1190745424693317663';

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('setstatus')
		.setDescription('Sets Bobs status')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text to set Bobs status to')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		console.log(interaction.options.getString('text'))

		interaction.client.user.setStatus(interaction.options.getString('text'));

		await interaction.reply({ content: 'Set status', ephemeral: true });
	},
};