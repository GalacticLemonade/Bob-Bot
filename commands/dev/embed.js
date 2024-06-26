const {
	SlashCommandBuilder,
	EmbedBuilder
} = require('discord.js');
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('embed')
		.setDescription('sends the RULES!!! YAYY!!!!'),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		const consEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Rules")
			.addFields(
				{ name: '1.', value: 'Please treat all members with respect and kindness.' },
				{ name: '2.', value: 'No NSFW content will be tolerated in any way.' },
				{ name: '3.', value: 'Do not share other people\'s personal info.' },
				{ name: '4.', value: 'This server is english only. As such, refrain from other languages.' },
				{ name: '5.', value: 'If you spread misinformation about bob, you will be 1984\'d (silenced).' },
				{ name: '6.', value: 'Abide by Discord TOS.' },
				{ name: '7.', value: 'Use common sense. Do not exploit loopholes.' },
			)
			.setTimestamp()
			.setFooter({ text: 'Last updated' })

		await interaction.channel.send({ embeds: [consEmbed] });
		await interaction.reply({ content: 'Echoed', ephemeral: true });
	},
};