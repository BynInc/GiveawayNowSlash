const Discord = require('discord.js');
module.exports = {
  async execute(giveaway, member, reaction) {
    reaction.users.remove(member.user);
    member.send({
        embeds: [
          new Discord.EmbedBuilder()
            .setTitle(`Giveaway ended already!`)
            .setColor('#06E2F6')
            
            .setDescription(
              `Hey ${member.user} **[[This Giveaway]](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** has already ended!`
            )
            .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
            .setTimestamp(),
        ],
      })
      .catch((e) => {});
  },
};
