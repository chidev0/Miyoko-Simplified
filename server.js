const Discord = require("discord.js");
const MiyokoClient = require("./handler/ClientBuilder.js");
const client = new MiyokoClient();
const mongo = require('./mongo')
const alexa = require("alexa-bot-api");
let ai = new alexa
require('dotenv').config();
const Levels = require("discord-xp");
const mongoose = require('mongoose')


const { Player } = require("discord-player");
const fs = require('fs');
client.player = new Player(client);

const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
  console.log(`Loading discord-player event ${file}`);
  const event = require(`./player/${file}`);
  client.player.on(file.split(".")[0], event.bind(null, client));
};


async function main() {
  const reply = await ai.getReply("How are you mate?", "tamil");

  console.log(reply);
  //Do your stuffs with reply
}
main();

client.on('message', async message => {
  if (message.author.bot) return;

  if (message.channel.id === "775407315473137684") { // if you want it to work only in a specific channel.

  let content = message.content;

  ai.getReply(content,).then(r => message.channel.send(r)); 
  } else {
      return;
  }
});

client.queue = new Map();

client.player.on('trackStart', (message, track) => {
  const dfd = new Discord.MessageEmbed()
  .setTitle('Now Playing')
  .setDescription(`[${track.title}](${track.url})[${track.requestedBy}]`)
  message.channel.send(dfd);

})
require("./handler/module.js")(client);
require("./handler/Event.js")(client);

client.package = require("./package.json");
client.on("warn", console.warn);
client.on("error", console.error);


client.on('message', async message => {
    let recent = client.recent;

    if (message.author.bot || message.author === client.user) return;
  
    // If the user has an exp. cooldown, ignore it.
    if (recent.has(message.author.id)) return;

    const randomAmountOfXp = Math.floor(Math.random() * (25 - 15)) + 15; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
      const user = await Levels.fetch(message.author.id, message.guild.id);
      const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setDescription(`Congratulations, ${message.author.username}! You have reached level ${user.level} :tada:`)
      message.channel.send(embed);
    }
  
      // Generate a random timer. (2)
      let randomTimer = getRandomInt(60000, 75000); // Around 60 - 75 seconds. You can change it.
  
      // Add the user into the Set()
      recent.add(message.author.id);
  
      // Remove the user when it's time to stop the cooldown.
      client.setTimeout(() => {
          recent.delete(message.author.id)
      }, randomTimer);
  
    

  function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
    })

client.login(process.env.token).catch(console.error);
