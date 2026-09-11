const { MessageEmbed } =require("discord.js")
 exports.run = async (client, message, args) => {
    const logChannel = message.guild.channels.cache.get("658815765914451990") || message.channel;
    let channel = message.mentions.channels.first();
  
  
    if (channel) {
      args.shift();
    } else channel = message.channel;

    // Check type and viewable
    if (channel.type != 'text' || !channel.viewable) return message.channel.send(`Please mention an accessible text channel or provide a valid text channel ID`);

    let member = message.mentions.members.first()
    if (member) {
      args.shift();
    }

    let amount;

    if (parseInt(args[0]) > 100) {
        amount = 100;
    } else {
        amount = parseInt(args[0]);
    }

      if(!amount) amount = 20;

    // Check channel permissions
    if (!channel.permissionsFor(message.guild.me).has(['MANAGE_MESSAGES']))
      return message.channel.send('I do not have permission to manage messages in the provided channel');


      if (message.deletable) {
        message.delete();
    }

    // Find member messages if given
    let messages;
    if (member) {
      messages = (await channel.messages.fetch({ limit: amount })).filter(m => m.member.id === member.id);
    } else messages = amount;

    if (messages.size === 0) { // No messages found

      message.channel.send(
        new MessageEmbed()
          .setTitle('Purge')
          .setDescription(`Unable to find any messages from ${member}.`)
          .addField('Found Messages', `\`${messages.size}\``, true)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor)
      ).then(msg => msg.delete({ timeout: 10000 })).catch(err => client.log(`Uh oh...${err}`));

    } else { // Purge messages

      channel.bulkDelete(messages, true);
    }

    let logEmbed = new MessageEmbed()
    .setTitle('Messages Purged')
    .addField('Amount', `\`${amount}\``,)
    .addField("Staff" , `${message.author}`)
    .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);

    if (member) {
        logEmbed
          .addField('User', `${member}`);
      }

      if (channel) {
        logEmbed
        .addField('Text Channel', `${channel}`);
      }
      logChannel.send(logEmbed);      
}
    exports.help = {
        name: "purge",
        description: "Bulk delete a set amount of messages from a user or text channel",
        usage: "!purge [#channel] [@user] [amount]",
        example: "!purge 10\n!purge @user 16\n!purge #general @user 50\n!purge #general"
      };
      
      exports.conf = {
        aliases: ["prune"],
        botPermissions: ["MANAGE_MESSAGES"],
        memberPermissions: ["MANAGE_MESSAGES"],
        cooldown: 3
      }
