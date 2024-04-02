const {
	SlashCommandBuilder,
} = require('discord.js');
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos the text to the current channel.')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('The text to echo back.')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		await interaction.channel.send(interaction.options.getString('text'));
		await interaction.reply({ content: 'Echoed', ephemeral: true });
	},
};