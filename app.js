/*
Welcome to the pits of hell with this shitty code
Don't start whining cause the code is bad, this is
the best of the best shit code, if you want it to
be better, make it better yourself, was fun making
the bot while it lasted, im pretty sure there's a
memory leak in the server shit, but idc honestly.


    -ItzNop
*/

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");
const sf = require("snekfetch")
const msg = require("./utils/msg.js")

client.colors = require("./servers.json");

let rainbow = 0;

client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(function() {
        client.user.setPresence({ game: { name: config.prefix + "help | " + client.guilds.size + " Servers! | " + client.users.size + " Users!", url: "https://www.twitch.tv/ProESTGaming", type: 1 } });
    //Update every 30 seconds
    }, 30 * 1000);


    client.setInterval(() =>{

        //adding this so it doesnt start doing weird stuff
        if(rainbow > 0.9) { //0.9 for perfect loop
            rainbow = 0
        }else{
            rainbow += 0.01;
        }

        //try to change role color for every server
        for(let i in client.colors) {
            let guildId = client.colors[i].guild;
            let guild = client.guilds.get(guildId);


            //if server gets deleted or bot gets kicked, remove from config
            if(guild === null) {
                delete client.colors[i];
                fs.writeFile("./servers.json", JSON.stringify(client.colors, null, 4), err => {
                    if(err) throw err;
                });
                return;
            }

            
            //try to change the role
            try{
                guild.roles.find("name", client.colors[i].role).setColor(hslToRgb(rainbow, 1, 0.5))
                .catch(err => { 
                    delete client.colors[i]
                    fs.writeFile("./servers.json", JSON.stringify(client.colors, null, 4), err => {
                        if(err) throw err;
                    });
                    return;
                });
            }catch(err){
                delete client.colors[i]
                fs.writeFile("./servers.json", JSON.stringify(client.colors, null, 4), err => {
                    if(err) throw err;
                });
                return;
            }
        }
        //Change it every 5 seconds
    }, 5 * 1000)
});

client.on("message", async message =>{


    //Does stuff and removes char length
    let command = message.content.split(" ")[0].slice(config.prefix.length);
    let args = message.content.split(" ").slice(1);
    //let mention = message.guild.member(message.mentions.users.first());


    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;


    if(command === "help")
        return msg.help(message);


    if(command === "ping")
        return msg.info(message, "Ping: `" + Math.round(client.ping) + "ms`");

	
	if(command === "eval") {
        if(message.author.id !== config.ownerid) return;
			try{
				eval(args.join(" "));
			}catch(err){
				message.channel.send("srry left syntax in other pant")
        }
    }


    if(command === "createInvite") {
        //owner check
        if(message.author.id !== config.ownerid) return;

        //gets last word and removes last word, ik shit way but works since channels cant have spaces
        let channel = args.pop();

        //tries to get the invite
        try{
            client.guilds.find("name", args.join(" ")).channels.find("name", channel).createInvite().then(invite => message.channel.send("Invite: https://discord.gg/" + invite.code))
        }catch(err){
            message.channel.send("Something went wrong, Usage: (server, channel)")
        }
    }


    if(command === "rainbow") {
        let rainbowRole = args.join(" ");

        if(!message.member.hasPermission("ADMINISTRATOR"))
            return msg.error(message, "You must have the **`ADMINISTRATOR`** permission!")


        if(!message.guild.me.hasPermission("ADMINISTRATOR"))
            return msg.error(message, "I must have the **`ADMINISTRATOR`** permissions!")
        
            
        if(!message.member.guild.roles.find("name", rainbowRole))
            return msg.error(message, "Usage: **`(role name)`**");


        if(message.member.guild.roles.find("name", rainbowRole).position >= message.guild.me.highestRole.position)
            return msg.error(message, "My highgest role must be higher than the mentioned role!")


        msg.success(message, "Successfully applied rainbow colors to **`" + rainbowRole + "`**")

        client.colors[message.guild.name] = {
            guild: message.guild.id,
            role: rainbowRole
        }

        

        fs.writeFile("./servers.json", JSON.stringify(client.colors, null, 4), err => {
            if(err) throw err;
        });
    }


    if(command === "cat") {
        sf.get("http://aws.random.cat/meow")
            .then(res => {
                msg.picture(message, res.body.file)
                //console.log(res.text)
            })
    }


    if(command === "shibe") {
        sf.get("http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true")
            .then(res => {
                msg.picture(message, res.body[0])
            })
    }


    if(command === "dog") {
        sf.get("https://random.dog/woof.json")
            .then(res => {
                msg.picture(message, res.body.url)
            })
    }
});


//rgb junk copy pasted from stackoverflow since i was too lazy to code it myself
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//login with this shitty code
client.login(config.token);