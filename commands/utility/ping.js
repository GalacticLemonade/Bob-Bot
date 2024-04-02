const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Returns Bob\'s latency'),
	async execute(interaction) {
		console.log('User ' + interaction.user.username + ' (' + interaction.user.id + ') has executed command /ping');

		//const logchannel = interaction.client.channels.cache.get('1130624232284504064');

		//logchannel.send('User ' + interaction.user.username + ' (' + interaction.user.id + ', <@' + interaction.user.id + '>) has executed command /ping');

		const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		interaction.editReply(`Pong!\n(Roundtrip: ${sent.createdTimestamp - interaction.createdTimestamp}ms, Heartbeat: ${interaction.client.ws.ping}ms.)`);
	},
};