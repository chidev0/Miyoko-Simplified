const { MessageEmbed } = require("discord.js");

    exports.run = async (client, message, args) => {
        const { MessageEmbed } = require("discord.js");

        exports.run = async (client, message, args) => {
            const logChannel = message.guild.channels.cache.get("658815765914451990") || message.channel;
    
    
                    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
                    let reason = args[1]
                    if(!reason) { let reason = 'No provided' }
            
                    if(!member) {
                    let embed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle('Who do you want me to ban?')
                        .setImage('https://i.imgur.com/RkIfjMP.gif');
                    return message.channel.send(embed)                   
                    }
    
                    if(member.user.id === message.author.id) {
                    let embed = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle("Why are you trying to ban yourself?")
                        .setImage('https://i.imgur.com/lxwbq7i.gif');            
                    return message.channel.send(embed)
                    } 
                    
                    if(!member.kickable) return message.channel.send(`I can\`t ban that user!`)
    
                    try{
                        var kickbed = await message.channel.send( { embed: { description: `\`[⏲60s]\` Are you sure you want to ban ${member}? \`[yes/no]\``, color: 'YELLOW' } } )
                        await kickbed.react("✅");
                        await kickbed.react("❌");
                    } catch (error){
                        console.log(error)
                     }
    
                    let timer = 60
    
    
                   var confirmation = setInterval(function() {
                       
                        timer -= 15
                        kickbed.edit( { embed: { description: `\`[⏲${timer}s]\` Are you sure you want to ban ${member}? \`[yes/no]\``, color: 'YELLOW' } } )
                    }, 15000);
    
    
                     const filter = (reaction, user) => user.id === message.author.id;
                     var collector = kickbed.createReactionCollector(filter, {
                       time: 60000
                     });
            
                     collector.on("collect", (reaction, user) => {
                        switch (reaction.emoji.name) {
                            case "✅":
                                const idk = [
                                    "https://media1.tenor.com/images/dc269398c26d9d35dc016d935269008d/tenor.gif",
                                    "https://media1.tenor.com/images/78609805dbfc0ef6ca0ab5caaa73c84d/tenor.gif",
                                    "https://i.imgur.com/LQije5S.gif",
                                    'https://media1.tenor.com/images/768250291272842e2d2e7f6f426dcde2/tenor.gif',
                                    'https://media1.tenor.com/images/51e2f717151b4ec0e227dec754c991ee/tenor.gif'
                                    ];
                                    const word = idk[Math.floor(Math.random() * idk.length)];
    
                                let embed = new MessageEmbed()
                                .setColor('GREEN')
                                .setDescription(`**Goodbye, ${member.user.username}! \`(${member.user.id})\`**`)
                                .setImage(word);
                            
                                let logembed = new MessageEmbed()
                                .setColor("RED")
                                .setTitle(`User Ban | ${member}`)
                                .addField("Staff" , `${message.author}`)
                                .addField("Reason" , `${reason}`)
    
                                member.ban({ reason: reason })
                                .then(() => {
                                    message.channel.send(embed)
                                    logChannel.send(logembed);
                                }).catch(err => {
                                    if (err) return message.channel.send(`I couldn't ban ${member.user.username}: ${err}`)
                                })
                            break
                            case "❌":
                                message.channel.send({embed:{description: `**${member.user.tag}** lives to see another day`, color: `RED`}})
                            break
                            default:
                                collector.stop()
                                break;
                        }
                        collector.stop()
                    })
                    collector.on('end', (ignore, error) => {
                        var finish = setInterval(function() {
                            clearInterval(confirmation);
                            clearInterval(finish);
                        }, 2000);
                        kickbed.reactions.removeAll().catch(console.error);
                    });
          }
    }
    exports.help = {
        name: "ban",
        description: "ban a member from the server",
        usage: "!ban <user> <reason>",
        example: "!ban @user spam"
      };
      
      exports.conf = {
        aliases: [""],
        botPermissions: ["BAN_MEMBERS"],
        memberPermissions: ["BAN_MEMBERS"],
        cooldown: 3
      }
