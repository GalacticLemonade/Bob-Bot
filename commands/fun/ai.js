const {
	SlashCommandBuilder,
} = require('discord.js');
const fs = require('node:fs')
const axios = require("axios")
const botDevID = '1190745424693317663'

let context

let startingPrompt = fs.readFileSync('prompt.txt', 'utf8')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ai')
		.setDescription('tells the ai model the requested prompt (force for dev)')
		.addStringOption(option =>
			option.setName('text')
				.setDescription('the text to write to the model')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.roles.cache.has(botDevID)) {
			await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
			return;
		}

        await interaction.deferReply();

        let finalPrompt = interaction.options.getString('text')

        let data = JSON.stringify({
            "model": "llama3",
            "prompt": finalPrompt,
            "stream": false,
            "context": context,
            "options": {
                "seed": Math.floor(new Date().getTime() / 1000)
            },
            "keep_alive": "24h"
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:11434/api/generate',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios.request(config)
          .then(async (response) => {
            let mainresponse = response.data
            let respond = mainresponse.response

            context = mainresponse.context

            console.log(respond)

            interaction.editReply({ content: "API request made" })

            await interaction.channel.send({ content: respond});
          })
          .catch((error) => {
            console.log(error);
          });
	},
};