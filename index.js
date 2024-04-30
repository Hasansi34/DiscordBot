const express = require("express");
const app = express();

app.listen(3000, () => {
 console.log("proje çalışıo");
})

app.get("/", (req, res) => {
 res.send("bot çalışıo");
})

const Discord = require("discord.js")
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  
});
const fs = require("fs");
const prefix = "!"
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"))
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on("messageCreate", message => {
 if(message.content.startsWith(prefix)) {
   const args = message.content.slice(prefix.length).trim().split(/ +/g)
   const commandName = args.shift()
   const command = client.commands.get(commandName)
   if(!command) return message.channel.send({content: "That Command Not Found"})
   command.run(client, message, args)
 }
  
  if(message.content === "h!help") {
    let emded = new Discord.MessageEmbed()
    .setTitle("Commands")
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setDescription("Baisc command for this bot")
    .setColor("#88F7E9")
    .addField("!hi", "Bots says hi to you")
    .addField("!spam", "prank your friends")
    .addField("!amogus", "I think I know the imposter☭")
    .addField("!say", "you can say anything to our bot☭")
    .setTimestamp()
    message.channel.send({embeds:[emded], content: "**☭Our Bot Commands☭**"})
}
})

client.login(process.env.token);