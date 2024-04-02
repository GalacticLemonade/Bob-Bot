const {
	SlashCommandBuilder,
	EmbedBuilder
} = require('discord.js');
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed2')
		.setDescription('just a general command for when i gotta send embed yk'),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		const consEmbed = new EmbedBuilder()
			.setColor(0x206694)
			.setTitle("Reaction roles")
			.addFields(
				{ name: 'Minecraft', value: '<:ugly:1190722016374947941> - Pings regarding updates/changes to the minecraft server' },
				{ name: 'Bob Simulator', value: '<:what:1190891925650284604> - Pings regarding the Bob Simulator game' },
				{ name: 'Random stuff', value: '<:depressed:1190894416962015343> - Pings about random stuff (that is not related to anything)' },
			)
			.setTimestamp()
			.setFooter({ text: 'Last updated' })

		await interaction.channel.send({ embeds: [consEmbed] });
		await interaction.reply({ content: 'Echoed', ephemeral: true });
	},
};