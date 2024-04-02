const { Events } = require('discord.js');

module.exports = {
	name: Events.GuildMemberAdd,
	execute(member) {
        member.roles.set([ '1190785070672384121' ])
	},
};