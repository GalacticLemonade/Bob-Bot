const { SlashCommandBuilder } = require('discord.js');

const fs = require('fs');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('bob')
		.setDescription('bob'),
	async execute(interaction) {
		console.log('User ' + interaction.user.username + ' (' + interaction.user.id + ') has executed command /bob');

		//const logchannel = interaction.client.channels.cache.get('1130624232284504064');

		//logchannel.send('User ' + interaction.user.username + ' (' + interaction.user.id + ', <@' + interaction.user.id + '>) has executed command /bob');
		await fs.readdir('./assets/images/', (err, files) => {

			const max = files.length - 1;
			const min = 0;

			const index = Math.round(Math.random() * (max - min) + min);
			const file = files[index];

			interaction.reply({
				content: 'bob',
				files: ['./assets/images/' + file],
			});
		});
	},
};