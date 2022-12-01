const messages = require("../utils/message");
module.exports.run = async (client, message, args) => {
  // If the member doesn't have enough permissions
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: MANAGE_MESSAGES not found!"
    );
  }

  // Giveaway channel
  let giveawayChannel = message.mentions.channels.first();
  // If no channel is mentionned
  if (!giveawayChannel) {
    return message.reply(":x: Invalid Message ID!\n**Try Again?**");
  }

  // Number of winners
  let giveawayNumberWinners = parseInt(args[1]);
  // If the specified number of winners is not a number
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.reply(
      ":x: Invalid Number!\n**Try Again?**"
    );
  }

  // Giveaway prize
  let giveawayPrize = args.slice(2).join(" ");
  // If no prize is specified
  if (!giveawayPrize) {
    return message.reply(":x: Invalid Prize Name!\n**Try Again?**");
  }
  // Start the giveaway
  await client.giveawaysManager.start(giveawayChannel, {
    // The giveaway prize
    prize: giveawayPrize,
    // The giveaway winner count
    winnerCount: parseInt(giveawayNumberWinners),
    // Who hosts this giveaway
    hostedBy: client.config.hostedBy ? message.author : null,
    // specify drop
    isDrop: true,
    // Messages
    messages
  });
  message.reply(`Giveaway started in ${giveawayChannel}!`);
}
