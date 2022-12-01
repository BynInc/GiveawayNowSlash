const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎊 Hurray! 🎊`)
          .setColor("#06E2F6")
          .setDescription(`Heya ${member.user}\n You just won **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** 🥳`)
          .setTimestamp()
          .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
        ]
      }).catch(e => {})
    });

  }
}
