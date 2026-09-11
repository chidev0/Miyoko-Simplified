const discord = require("discord.js")
const ms = require("ms")

exports.run = async (client, message, args) => {
 
 let logchannel = message.guild.channels.cache.find(ch => ch.name === "logs")
 if(!logchannel) return message.channel.send("Cant find channel called logs")
 
 let role = message.guild.roles.cache.find(rl => rl.name === "Muted")
 if(!role) return message.channel.send("Cant find role called Muted")
 
 let user = message.mentions.members.first()
 if(!user) return message.channel.send("You need to mention a user to mute. You know that right?")
 
 let time = args[1]
 if(!time) time = "15m"
 
 let reason = args.slice(2).join(" ")
 if(!reason) reason = "No Reason Provided"
 
 if(user.hasPermission("MANAGE_ROLES")) return message.channel.send("You can't mute someone with the manage roles permission")
 
 let logembed = new discord.MessageEmbed()
 .setColor("RED")
 .setTitle(`User Temporariy Muted | ${user.user.tag}`)
 .addField("Staff" , `${message.author}`)
 .addField("Reason" , `${reason}`)
 .addField("Duration", `${time}`)

 let dm = new discord.MessageEmbed()
 .setColor("WHITE")
 .setTitle(`**You have been temporarily muted!**`)
 .addField("Server", `${message.guild.name}`)
 .addField("Muted by:", `${message.author}`)
 .addField("Reason", `${reason}`)
 .addField("Duration", `${time}`)
 .setFooter('Miyoko')
 if(ms(time)){
 try{
 user.send(dm)
 } catch (err) {
 console.log(err)
 }
 
 user.roles.add(role)
 logchannel.send(logembed)

let sucess = new discord.MessageEmbed()
.setColor("GREEN")
.setTitle(`**Silence, ${user.user.tag}** | ${time}`)
.setImage('https://i.imgur.com/ZCb2GLm.gif')
.setFooter('A log of the mute has been generated in #logs')

 message.channel.send(sucess)
 
 setTimeout(function() {
 user.roles.remove(role)
 logchannel.send(`${user} has been unmuted`)
 }, ms(time))
 }
}

exports.help = {
    name: "mute",
    description: "Silence a user",
    usage: "!mute <user> <time> [reason]",
    example: "!mute @user 3m Spam"
  };
  
  exports.conf = {
    aliases: [""],
    botPermissions: ["MANAGE_ROLES"],
    memberPermissions: ["MANAGE_ROLES"],
    cooldown: 3
  }