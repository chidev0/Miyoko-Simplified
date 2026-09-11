const PrefixSchema = require('../../models/prefix')
const mongo = require('../../mongo')
const { Message, MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
    const res = await args.join(" ")
    PrefixSchema.findOne({ Guild : message.guild.id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            const embed = new MessageEmbed()
            .setTitle('Current prefix')
            .setColor('WHITE')
            .setDescription(`My Prefix in **${message.guild.name}** is **${data.Prefix}**`)
            .setFooter(`To change this, run ${data.Prefix}prefix <prefix>`)
            if(!res) return message.channel.send(embed)
            await PrefixSchema.findOneAndDelete({ Guild : message.guild.id })
            data = new PrefixSchema({
                Guild : message.guild.id,
                Prefix : res
            })
            data.save()
            const embed1 = new MessageEmbed()
            .setTitle('Prefix Update')
            .setColor('GREEN')
            .setDescription(`My prefix has been updated to **${data.Prefix}**`)
            .setFooter('Miyoko')
            message.channel.send(embed1)
        } else {
            const embed = new MessageEmbed()
            .setTitle('No prefix set')
            .setColor('RED')
            .setDescription('Since there was not an assigned prefix in this server, it is set by default to `;`. To change this run `;prefix <prefix>`')
            .setFooter('Miyoko')
            if(!res) return message.channel.send(embed)
            data = new PrefixSchema({
                Guild : message.guild.id,
                Prefix : res
            })
            data.save()
            const embed1 = new MessageEmbed()
            .setTitle('Prefix Set')
            .setColor('GREEN')
            .setDescription(`My prefix has been set to **${data.Prefix}**`)
            .setFooter('Miyoko')
            message.channel.send(embed1)
        }
    })
    
    }
    
exports.help = {
    name: "prefix",
    description: "View/change the prefix of the current server",
    usage: "<prefix>",
    example: "!prefix ?"
  };
  
  exports.conf = {
    aliases: [""],
    memberPermissions: ["MANAGE_SERVER"],
    cooldown: 5 // This number is a seconds, not a milliseconds.
    // 1 = 1 seconds.
  }