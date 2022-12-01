const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

module.exports = {
    name: 'invite',
    description: '🎉 Invite the bot to your server!',
    run: async (client, interaction) => {
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new ButtonBuilder()
        .setLabel('Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.gg/MYsvYXbg2P"),
    )
    let invite = new EmbedBuilder()
      .setAuthor({ 
          name: `Invite ${client.user.username}`, 
          iconURL: client.user.displayAvatarURL() 
      })    
    .setTitle("Invite & Support Link!")
    .setDescription(`Invite ${client.user} to your server today!\n Got problems? Join our support server!`)
    .setColor('#06E2F6')
    .setTimestamp()
    .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
    
    interaction.reply({ embeds: [invite], components: [row]});
}
}
