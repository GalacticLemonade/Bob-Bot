const { SlashCommandBuilder } = require('discord.js');
//const token = '';
const { token } = require('../../config.json')
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts bob'),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.' });
			return;
		}

		const client = interaction.client;
		await interaction.deferReply({ ephemeral: true })
			.then(() => client.destroy())
			.then(() => client.login(token));
		await interaction.editReply('Bob restarted!');
	},
};