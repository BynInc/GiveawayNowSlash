const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.EmbedBuilder()
        .setTimestamp()
        .setTitle(':cry: Youre giving up already?')
        .setColor("#06E2F6")
        .setDescription(
          `You removed the reaction on [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) 😭!`
        )
        .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
      ]
    }).catch(e => {})

  }
}
