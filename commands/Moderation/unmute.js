const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_ROLES"))return message.channel.send("You need the manage roles permission to use this command")
 
    let logchannel = message.guild.channels.cache.find(ch => ch.name === "logs")
    if(!logchannel) return message.channel.send("Cant find channel called logs")
    
    let role = message.guild.roles.cache.find(rl => rl.name === "Muted")
    if(!role) return message.channel.send("Cant find role called Muted")
    
    let user = message.mentions.members.first()
    if(!user) return message.channel.send("You need to mention a user to unmute. You know that right?")
    
    if(user.roles.cache.has(role)) {
       return message.channel.send("User is not muted")
     }
    
    let logembed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`User Unmuted | ${user.user.tag}`)
    .addField("Unmuted by" , `${message.author}`)
   
    let dm = new Discord.MessageEmbed()
    .setColor("WHITE")
    .setTitle(`**You have been unmuted in ${message.guild.name}**`)
    .setFooter('Miyoko')

    let sucess = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`I have succesfuly unmuted ${user.user.tag}.`)
    try { 
      await user.roles.remove(role)
      logchannel.send(logembed)
      message.channel.send(sucess)
     }
     catch (err) {
       message.channel.send(`I was unable to unmute that user...${err}`)
     }
       }
exports.help = {
    name: "unmute",
    description: "unmute a user",
    usage: "unmute <user>",
    example: "!help unmute"
  }
  
  exports.conf = {
    aliases: ["free"],
    botPermissions: ["MANAGE_ROLES"],
    memberPermissions: ["MANAGE_SERVER"],
    cooldown: 1
  }