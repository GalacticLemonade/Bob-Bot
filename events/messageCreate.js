const { Events } = require('discord.js');
const fs = require('node:fs')
const axios = require("axios")
const botDevID = '596209842906071040'

let context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))

async function mmmmm(message) {
    context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))
    if (message.content.includes("-raw") && message.author.id == botDevID) {
        let content = message.content.replaceAll("-raw", "")
        let data = JSON.stringify({
            "model": "llama3",
            "prompt": content,
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
            console.log(JSON.stringify(mainresponse.context))
            fs.writeFileSync("context.txt", JSON.stringify(mainresponse.context), "utf8")
    
            message.reply({ content: respond});
          })
          .catch((error) => {
            console.log(error);
          });
          return;
    }

    let startingPrompt = fs.readFileSync('prompt.txt', 'utf8')
    let passOne = startingPrompt.replaceAll("{{MemberCount}}", message.guild.memberCount)
    let passTwo = passOne.replaceAll("{{Time}}", new Date().toLocaleTimeString())
    let passThree = passTwo.replaceAll("{{Date}}", new Date().toLocaleDateString())
    let passFour = passThree.replaceAll("{{DiscordID}}", message.author.id)
    let passFive = passFour.replaceAll("{{DiscordUsername}}", message.author.username)
    let finalPrompt = passFive.replaceAll("{{UserInput}}", message.content)

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

      await message.channel.sendTyping();
      
      axios.request(config)
      .then(async (response) => {
        let mainresponse = response.data
        let respond = mainresponse.response

        fs.writeFileSync("context.txt", JSON.stringify(mainresponse.context), "utf8")

        message.reply({ content: respond});
      })
      .catch((error) => {
        console.log(error);
      });
}

module.exports = {
	name: Events.MessageCreate,
	async execute(msg) {
		if (msg.author.bot) { return }

        let content = msg.content.toLowerCase()
        let isntReply = msg.reference === null

        if (content.includes('bob') || msg.content.includes('<@1190741398874501140>')) {
            mmmmm(msg)
            return
        }

        if (!isntReply && msg.mentions.repliedUser.id == 1190741398874501140) {
            mmmmm(msg)
            return
        }
	},
};