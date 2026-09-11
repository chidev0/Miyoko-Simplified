module.exports = async (client, member, message) => {
    const discord = require("discord.js");
    let code = randomInteger(100000, 1000000).toString();
    channel = client.channels.cache.get('734517439307448350');
    const canvas = require("discord-canvas");
    const Welcome = require('../models/welcome')
    const mongoose = require('mongoose')
    const welcomeCanvas = new canvas.Welcome();
    const a = "000000"; 

    member.roles.add("734518826066247680");

    const x = '<:right:795890966547791893>'
    const idk = [
        `${x} | whispers pssst, **${member.user.username}**, people here are too cool here...`,
        `${x} | Hello ! **${member.user.username}**, have a good stay here.`,
        `${x} | Time for more respect since **${member.user.username}** is here.`,
        `${x} | Behold, **${member.user.username}**! It came to be that you are the ${member.guild.memberCount}rd member here.`,
        `${x} | Привет **${member.user.username}**!`,
        `${x} | Hi **${member.user.username}**!`,
        `${x} | Welcome to ${member.guild.name} my dear **${member.user.username}**`,
        `${x} | *Shooooosh* **${member.user.username}** landed on ${member.guild.name} surface.`,
        `${x} | Russian athem starts playing and we all see **${member.user.username}** on a red carpet..`,
        `${x} | It-can't-b-bee. i-it's. **${member.user.username}**.`,
        `${x} | Not to fear, **${member.user.username}** is here to solve the case!`,
        `${x} | **${member.user.username}** heard there was a party.`
        ];

    const word = idk[Math.floor(Math.random() * idk.length)];

    Welcome.findOne({ Guild: member.guild.id }, async(err, data) => {
    if(data) {    
               try {
                 member.guild.channels.cache.get(data.channel).send(`${word}`)
             } catch (e) {
              
             }   
    }
    })
    const embed6 = new discord.MessageEmbed()
    .setColor("RED")
    .setDescription(`${member}, I tried sending you a DM but it seems you have them disabled. Please enable them and try again`)
    .setFooter("Follow the instructions in the image above to allow me to send you DMs")
    .setImage("https://myrtilus.reeee.ee/VxElss.png") // Archived: this image was hosted on my own image-sharing domain.

    const embed2 = new discord.MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Verification Captcha")
    .setDescription(`Welcome to ${member.guild.name}, before you get started please type the code below in chat in order to verify that you are real.`)
    .setFooter("3 Minutes until the prompt ends")
    .addFields(
        { name: '**Why?**', value: 'This is to protect the server against targeted attacks using automated user accounts' },
        { name: '**What if I dont get it correct?**', value: 'You have 3 attempts to correctly guess the code below, after your third attempt you will automatically be kicked from the discord. You will be able to join back.', inline: false },
        { name: '**Your code**', value: `||${code}||`, inline: false },
    )
    let filter = m => m.author.id === member.id 
    let options = {max: 1, time : 100000, errors:["time"]}

    member.send(embed2)
    .then(dmChannel => {
        dmChannel.channel.awaitMessages(filter, options).then(collected => {
            if(collected.first().content === code){           
                const embed1 = new discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Attempting to verify you in ${member.guild.name}`)
                member.send(embed1)          
                member.roles.remove("734518826066247680");
                const embed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You have been succesfully verified in ${member.guild.name}`)
                member.send(embed)

        }

        if(collected.first().content !== code){
            retry()
            
        }
        
    })

    })

    .catch(err => channel.send(embed6).then(i => i.delete({timeout: 20000})));
    function randomInteger(min,max) {
        min = Math.ceil(min);
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min +1)) + min
    }

function retry() {
    const embed = new discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Verification unsuccessful")
    .setFooter("You have 2 attempts remaining")
    let filter = m => m.author.id === member.id 
    let options = {max: 1, time : 100000, errors:["time"]}

    member.send(embed).then(dmChannel => {
        dmChannel.channel.awaitMessages(filter, options).then(collected => {
            if(collected.first().content === code){ 
            const embed1 = new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`Attempting to verify you in ${member.guild.name}`)
            member.send(embed1)          
            member.roles.remove("734518826066247680");
            const embed = new discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`You have been succesfully verified in ${member.guild.name}`)
            member.send(embed)

        }

        if(collected.first().content !== code){
            retry2()

            
        }
    })
})
}

function retry2() {
    const embed = new discord.MessageEmbed()
    .setColor("RED")
    .setDescription("Verification unsuccessful")
    .setFooter("You have 1 attempts remaining")
    let filter = m => m.author.id === member.id 
    let options = {max: 1, time : 100000, errors:["time"]}

    member.send(embed).then(dmChannel => {
        dmChannel.channel.awaitMessages(filter, options).then(collected => {
            if(collected.first().content === code){           
                const embed1 = new discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`Attempting to verify you in ${member.guild.name}`)
                member.send(embed1)          
                member.roles.remove("734518826066247680");
                const embed = new discord.MessageEmbed()
                .setColor("GREEN")
                .setDescription(`You have been succesfully verified in ${member.guild.name}`)
                member.send(embed)

        }

        if(collected.first().content !== code){
            const embed = new discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Verification unsuccessful | You have been kicked from the discord server")
            .setFooter("Please rejoin to try again")
            member.send(embed)
            setTimeout(function() {
                    member.kick()          
            }, 3000)

            
        }
    })
})
}

}