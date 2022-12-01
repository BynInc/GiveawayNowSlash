const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, winners) {
    winners.forEach((member) => {
      member.send({
        embeds: [new Discord.EmbedBuilder()
          .setTitle(`🎁 New Winner!`)
          .setColor("#06E2F6")
          .setDescription(`${member.user}\n We've rerolled **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** and you have just won! 🥳 `)
          .setTimestamp()
          .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
        ]
      }).catch(e => {})
    });
  }
}
