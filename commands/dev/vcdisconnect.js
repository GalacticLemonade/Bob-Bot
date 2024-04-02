const {
	SlashCommandBuilder,
} = require('discord.js');
const { getVoiceConnection } = require('@discordjs/voice');
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcdisconnect')
		.setDescription('Leaves the requested vc')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to disconnect from (must be a voice channel and be connected to it)')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}
		const channel = interaction.options.getChannel('channel');
		console.log('User ' + interaction.user.username + ' (' + interaction.user.id + ') has executed command /vcdisconnect with channel ' + channel.name);

		//const logchannel = interaction.client.channels.cache.get('1130624232284504064');

		//logchannel.send('User ' + interaction.user.username + ' (' + interaction.user.id + ', <@' + interaction.user.id + '>) has executed command /vcdisconnect with channel ' + channel.name);

		const connection = getVoiceConnection(channel.guild.id);

		connection.destroy();

		await interaction.reply({ content: 'Left', ephemeral: true });
	},
};