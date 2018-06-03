const Discord = require("discord.js");
const color = require("./colors.json");
const help = require("./helpcommand.js");

module.exports.success = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Requested by " + message.author.tag, message.author.avatarURL)
    .setColor(color.green)
    .setTitle("Success!")
    .setDescription(msg)

    message.channel.send(embed);
}

module.exports.picture = (message, picture) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Requested by " + message.author.tag, message.author.avatarURL)
    .setColor(color.purple)
    .setImage(picture)

    message.channel.send(embed);
}

module.exports.error = (message, error) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Requested by " + message.author.tag, message.author.avatarURL)
    .setColor(color.red)
    .setTitle("An error has occured!")
    .setDescription(error)

    message.channel.send(embed);
}

module.exports.info = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Requested by " + message.author.tag, message.author.avatarURL)
    .setColor(color.blue)
    .setDescription(msg)

    message.channel.send(embed);
}

module.exports.help = (message, msg) => {
    let embed = new Discord.RichEmbed()
    .setAuthor("Requested by " + message.author.tag, message.author.avatarURL)
    .setTitle("Commands!")
    .setColor(color.blue)

    .setDescription("Shows commands for the bot!")
    .addField(":bulb: General commands", 
    help.command("rainbow", "Rainbow roles!") +
    help.command("ping", "Displays bot's ping to discord"))

    .addField(":seedling: Animal commands",
    help.command("cat", "Shows a random cat") +
    help.command("shibe", "Shows a random shibe") +
    help.command("dog", "Shows a random dog"))

    .addField(":skull: Bot's owner commands" ,
    help.command("eval", "Execute code") +
    help.command("createInvite", "Creates invites for servers"))
        
    .setColor(color.blue)

    message.channel.send(embed);
}