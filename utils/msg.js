const Discord = require("discord.js");
const config = require("../config.json")
const fs = require("fs");
const color = require("./colors.json")

module.exports.success = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(color.green)
    .setTitle("Success!")
    .setDescription(msg)

    message.channel.send(embed);
}

module.exports.error = (message, error) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(color.red)
    .setTitle("An error has occured!")
    .setDescription(error)

    message.channel.send(embed);
}

module.exports.info = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setColor(color.blue)
    //.setTitle("Thi")
    .setDescription(msg)

    message.channel.send(embed);
}

module.exports.help = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle("Commands!")
    .setColor(color.blue)

    .setDescription("Shows commands for the bot!")
    .addField(":bulb: General commands", 
    "**`c!rainbow`** - Make roles rainbow!\n" + 
    "**`c!ping`** - Why is the bot slow?")

    .addField(":skull: Bot's owner commands" ,
    "**`c!eval`** - Tasty code!\n" +
    "**`c!createInvite`** - Creates invites for servers!")
        
    .setColor(color.blue)

    message.channel.send(embed);
}