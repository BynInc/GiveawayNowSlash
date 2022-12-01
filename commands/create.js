const Discord = require('discord.js'),
  { EmbedBuilder } = Discord,
  parsec = require('parsec'),
  messages = require('../utils/message');

module.exports.run = async (client, message) => {
  const collector = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id,
    time: 60000,
  });

  let xembed = new EmbedBuilder()
  .setTitle("Giveaway Creation Failed")
  .setColor("#FF0000")
  .setDescription('💥 Took too much time to decide!\nUse ``create`` again to start a new giveaway!')
  .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
  .setTimestamp()


  function waitingEmbed(title, desc) {
    return message.channel.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: `${message.author.tag} + ' | Giveaway Setup'`,
            iconURL: message.member.displayAvatarURL()
          })
          .setTitle('Giveaway ' + title)
          .setDescription(desc + ' within the next 60 seconds.')
          .setFooter({ text: "© GiveawayNow -All Rights Reserved" })
          .setTimestamp()
          .setColor('#06E2F6'),
      ],

    });
  }

  let winnerCount, channel, duration, prize, cancelled;

  await waitingEmbed('Prize', 'Please enter the giveaway prize');

  collector.on('collect', async (m) => {
    if (cancelled) return;

    async function failed(options, ...cancel) {
      if (typeof cancel[0] === 'boolean')
        (cancelled = true) && (await m.reply(options));
      else {
        await m.reply(
          options instanceof EmbedBuilder ? { embeds: [options] } : options
        );
        return await waitingEmbed(...cancel);
      }
    }

    if (m.content === 'cancel'){ 
  collector.stop()
 return await failed('Giveaway Cancelled.', true) 
}

    switch (true) {
      case !prize: {
        if (m.content.length > 100)
          return await failed(
            'The prize can not be more than 100 characters.',
            'Prize',
            'Please enter the giveaway prize'
          );
        else {
          prize = m.content;
          await waitingEmbed('Channel', 'Please enter the giveaway channel');
        }

        break;
      }

      case !channel: {
        if (!(_channel = m.mentions.channels.first() || m.guild.channels.cache.get(m.content)))
          return await failed(
            'Please send a valid channel / channel ID.',
            'Channel',
            'Please enter the giveaway channel'
          );
        else if (!_channel.isTextBased())
          return await failed(
            'The channel must be a text channel.',
            'Channel',
            'Please enter the giveaway channel'
          );
        else {
          channel = _channel;
          await waitingEmbed(
            'Winner Count',
            'Please enter the giveaway winner count.'
          );
        }

        break;
      }

      case !winnerCount: {
        if (!(_w = parseInt(m.content)))
          return await failed(
            'The number of winners must be an integer.',

            'Winner Count',
            'Please enter the giveaway winner count.'
          );
        if (_w < 1)
          return await failed(
            'Winner count must be more than 1.',
            'Winner Count',
            'Please enter the giveaway winner count.'
          );
        else if (_w > 15)
          return await failed(
            'Winner count must be less than 15.',
            'Winner Count',
            'Please enter the giveaway winner count.'
          );
        else {
          winnerCount = _w;
          await waitingEmbed('Duration', 'Please enter the giveaway duration');
        }

        break;
      }

      case !duration: {
        if (!(_d = parsec(m.content).duration))
          return await failed(
            'Please provide a valid duration.',
            'Duration',
            'Please enter the giveaway duration'
          );
        if (_d > parsec('21d').duration)
          return await failed(
            'Duration must be less than 21 days!',
            'Duration',
            'Please enter the giveaway duration'
          );
        else {
          duration = _d;
        }

        return client.giveawaysManager.start(channel, {
          prize,
          duration,
          winnerCount,
          messages,
          hostedBy: client.config.hostedBy && message.author,
        });
      }
    }
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
};
