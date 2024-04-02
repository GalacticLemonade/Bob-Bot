const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const util = require('util');
const botDevID = '1190745424693317663';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('eval')
		.setDescription('Evaluate a Node.js command on the server.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The Node.js command to evaluate.')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

		const command = interaction.options.getString('command');

		let output;
		try {
			output = await new Promise(resolve => resolve(eval(command)));
			output = util.inspect(output, { depth: 0 });
		}
		catch (error) {
			output = error.message;
		}
		const embed = new EmbedBuilder()
			.setTitle('Result')
			.setColor(0x5865F2)
			.setDescription(`\`\`\`js\n${output}\n\`\`\``);
		await interaction.reply({ embeds: [embed] });
	},
};