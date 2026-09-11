const Discord = require("discord.js"), cooldowns = new Discord.Collection()
const PrefixSchema = require('../models/prefix')
const mongoose = require('mongoose')
const mongo = require('../mongo')
const Levels = require("discord-xp");
require('dotenv').config();
Levels.setURL(process.env.db);
// cooldowns will store the user when they are still in the cooldown mode.


module.exports = async (client, message) => {

  if (!message.guild) return;
  if (message.author.bot) return;

  // The legacy word blacklist was removed for the portfolio archive.
  let inviteLink = ["discord.gg/", "discord.com/invite", "discordapp.com/invite"];
  
  if (inviteLink.some(word => message.content.toLowerCase().includes(word))) {
    await message.delete();
    return message.channel.send("No! :angry:")
  }
  
  if (message.channel.id === "734517439307448350") { 
    if (message.content.toLowerCase().startsWith("resend")) {
      client.emit('guildMemberAdd', message.member);
      await message.delete();
      
      
    }
    else { 
      setTimeout(function() {
        message.delete()          
}, 1000)
const embed1 = new Discord.MessageEmbed()
.setColor('WHITE')
.setDescription('Did you mean to type `Resend`?\nNote: Do not send your code in here')
return message.channel.send(embed1).then(i => i.delete({timeout: 10000}));
    }
  }

  const data = await PrefixSchema.findOne({
    Guild: message.guild.id
});

//If there was a data, use the database prefix BUT if there is no data, use the default prefix which you have to set!
if(data) {
  var prefix = data.Prefix;
} else{
  var prefix = '!'
}
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let msg = message.content.toLowerCase();
    let cmd = args.shift().toLowerCase();
    let sender = message.author;
    if (!message.content.startsWith(prefix)) return;
    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
      // Many people don't know what is message.flags.
  // We've already seen a bot who has a message.flags or they would called, parameter things.
  message.flags = []
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1)); // Example: /play -soundcloud UP pice
  }
  
  if (!commandFile) return; // If the commands doesn't exist, ignore it. Don't send any warning on this.
  
  // This will set a cooldown to a user after typing a command.
  if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());
  
  const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(commandFile.help.name),
        cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;
  
  if (!timestamps.has(member.id)) {
    if (!client.config.owners.includes(message.author.id)) {
      // If the user wasn't you or other owners that stored in config.json
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(`Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
    }
    
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
  }

          // botPermissions
          if (commandFile.conf.botPermissions) {
            const neededPermissions = [];
            commandFile.conf.botPermissions.forEach((perm) => {
              if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
                neededPermissions.push(perm);
              }
            });
  
            if (neededPermissions[0]) {
              let embed = new Discord.MessageEmbed ()
              .setColor("RED")
              .setTitle(`I don't have permission to run this command`)
              .setImage('https://i.imgur.com/okrzb7l.gif')
              .setFooter(`Missing permission(s): ${neededPermissions}`);
              return message.channel.send(embed);
            }
          }
  
          // memberPermissions
          if (commandFile.conf.memberPermissions) {
            const neededPermissions = [];
            commandFile.conf.memberPermissions.forEach((perm) => {
              if (!message.channel.permissionsFor(message.member).has(perm)) {
                neededPermissions.push(perm);
              }
            });
  
            if (neededPermissions.length > 0) {
              let embed2 = new Discord.MessageEmbed ()
              .setColor("RED")
              .setTitle('Insufficient Permissions')
              .setImage('https://i.imgur.com/uxOZxU1.gif')
              .setFooter(`Permission(s) needed: ${neededPermissions}`);
              return message.channel.send(embed2);
            }
          }

  if (commandFile.conf.nsfw && commandFile.conf.nsfw === true && !message.channel.nsfw) {
    return message.channel.send("This channel is not a NSFW channel")
  }
  try {
    if (!commandFile) return;
    commandFile.run(client, message, args);
  } catch (error) {
    console.log(error.message);
  } finally {

    console.log(`${sender.tag} (${sender.id}) ran a command: ${cmd}`);
  }
  if (message.author.bot || message.author === client.user) return;
  
}
