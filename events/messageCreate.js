const { Events, PresenceUpdateStatus } = require('discord.js');
const fs = require('node:fs')
const axios = require("axios")
const botDevID = '596209842906071040'

let context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))

async function onlineUsers(msg) {
    let final = ""
    await msg.guild.members.fetch({ withPresences: true }).then(fetchedMembers => {
        const totalOnline = fetchedMembers.filter(member => member.presence?.status === PresenceUpdateStatus.Online || PresenceUpdateStatus.Idle || PresenceUpdateStatus.DoNotDisturb);

        for (let i of totalOnline) {
            let username = i[1].user.username

            final += "\r\n  " + username + ' - userid of ' + i[1].user.id
        }
    });
    return final
}

async function lastmessages(msg) {
    let final = ""
    await msg.channel.messages.fetch({limit: 50}).then(messages => {
        let newmessages = messages.reverse()
        for (let i of newmessages) {
            let username = i[1].author.username
            let content = i[1].content

            final += "\r\n  [" + username + "]: " + content
        }
    })
    return final
}

async function mmmmm(message) {
    context = JSON.parse(fs.readFileSync('context.txt', 'utf8'))
    let startingPrompt = fs.readFileSync('prompt.txt', 'utf8')
    let passOne = startingPrompt.replaceAll("{{MemberCount}}", message.guild.memberCount)
    let passTwo = passOne.replaceAll("{{Time}}", new Date().toLocaleTimeString())
    let passThree = passTwo.replaceAll("{{Date}}", new Date().toLocaleDateString())
    let passFour = passThree.replaceAll("{{DiscordID}}", message.author.id)
    let passFive = passFour.replaceAll("{{DiscordUsername}}", message.author.username)
    let passSix = passFive.replaceAll("{{Channel}}", message.channel.name)
    let passSeven = passSix.replaceAll("{{OnlineUsers}}", await onlineUsers(message))
    let passEight = passSeven.replaceAll("{{LastMessages}}", await lastmessages(message))
    let finalPrompt = passEight.replaceAll("{{UserInput}}", message.content)

    console.log(finalPrompt)

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