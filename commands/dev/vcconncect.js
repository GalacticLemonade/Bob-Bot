const {
	SlashCommandBuilder,
} = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vcconnect')
		.setDescription('Joins the requested vc')
		.addChannelOption(option =>
			option.setName('channel')
				.setDescription('The channel to join (must be a voice channel)')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}
		const channel = interaction.options.getChannel('channel');

		joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});

		await interaction.reply({ content: 'Joined', ephemeral: true });
	},
};