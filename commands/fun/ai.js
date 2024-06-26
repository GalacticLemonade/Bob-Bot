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
        
        let passOne = startingPrompt.replaceAll("{{MemberCount}}", interaction.guild.memberCount)
        let passTwo = passOne.replaceAll("{{Time}}", new Date().toLocaleTimeString())
        let passThree = passTwo.replaceAll("{{Date}}", new Date().toLocaleDateString())
        let passFour = passThree.replaceAll("{{DiscordUsername}}", interaction.member.displayName)
        let finalPrompt = passFour.replaceAll("{{UserInput}}", interaction.options.getString('text'))

        let data = JSON.stringify({
            "model": "llama3",
            "prompt": finalPrompt,
            "stream": false,
            "context": context,
            "options": {
                "seed": Math.floor(new Date().getTime() / 1000)
            }
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
            let mainresponse = response.data //JSON.stringify(response.data);
            let respond = mainresponse.response
            context = mainresponse.context
            await interaction.editReply({ content: respond});
          })
          .catch((error) => {
            console.log(error);
          });

		//await interaction.reply({ content: 'Echoed', ephemeral: true });
	},
};