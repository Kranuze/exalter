const key = require('./key.json');
const translate = require('@iamtraction/google-translate');
const fs = require('fs')
var Discord = require("discord.js");
var Client = new Discord.Client({
    intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            Discord.Intents.FLAGS.DIRECT_MESSAGES
    ]
});



const prefix = "."

Client.on("ready", () => {
    console.log(`Logged in as ${Client.user.tag}!`);
});


//testping
Client.on("messageCreate", message => {
    if (message.author.bot) return;
    var burgers = 2;

    if (message.content.startsWith(prefix + "miam")){
        var burgers = message.content.slice(5).trim();
        message.channel.send(`Serin a mangé ${burgers} burgers 🍔`);
    }
    else if (message.content === prefix + "pong"){
        message.reply("Mais ta gueule !");
    }
});


//cloud
Client.on("messageCreate", message => {
    if (message.author.bot) return;
    var msgCloud = "null";
    var usrCloud = message.author.username

    if (message.content.startsWith(prefix + "cloudS")){
        var msgCloud = message.content.slice(7).trim();
        fs.writeFile(`./cloud/${usrCloud}.txt`, `${msgCloud}`, (err) => {
            if(err) {
                message.reply(err);
                return
            }
            message.reply("Success");
        });
    }
})

Client.on("messageCreate", message => {
    if (message.author.bot) return;
    var usrCloud = message.author.username

    if (message.content.startsWith(prefix + "cloudR")){
        fs.readFile(`./cloud/${usrCloud}.txt`, 'utf-8', (err, data) => {
            if (err) {
                console.error(err)
                return    
            }
            message.reply(data)
        });
    }
})

//ggtrad
Client.on('messageCreate', message => {
    if (message.content.startsWith(prefix + "ggtrad")){
        if (message.author.bot) return;
        const SayMessage = message.content.slice(7).trim();

        translate(SayMessage, { from: 'fr', to: 'it' }).then(SayMessage => {
            console.log(SayMessage.text);
            
        translate(SayMessage.text, { from: 'it', to: 'de' }).then(SayMessage => {
            console.log(SayMessage.text);
            
        translate(SayMessage.text, { from: 'de', to: 'en' }).then(SayMessage => {
            console.log(SayMessage.text);
        
        translate(SayMessage.text, { from: 'en', to: 'ar' }).then(SayMessage => {
            console.log(SayMessage.text);
        
        translate(SayMessage.text, { from: 'ar', to: 'lb' }).then(SayMessage => {
            console.log(SayMessage.text);

        translate(SayMessage.text, { from: 'lb', to: 'ca' }).then(SayMessage => {
            console.log(SayMessage.text);

        translate(SayMessage.text, { from: 'ca', to: 'fr' }).then(SayMessage => {
            console.log(SayMessage.text);
            
            message.channel.send(SayMessage.text);
            
        });});});});});});});
    }
});


//help
Client.on("messageCreate", message => {
    if (message.author.bot) return;

    if (message.content === prefix + "help"){
        const helpembed = new Discord.MessageEmbed()
                .setURL("https://pornhub.ru/")
                .setColor("#33adff")
                .setAuthor("Exa", "https://image-uviadeo.journaldunet.com/image/450/1461248386/1582286.jpg")
                .setDescription("Voici les commandes disponibles sur le serveur ! :D")
                .addField('.bot "<statut>"', "Change le statut du bot.")
                .addField(".clear X", "Supprime les derniers messages")
                .addField('.ggtrad "<texte>"', "Détruit un texte avec l'aide de Google.")
                .addField(".help", "La commande que tu viens d'utiliser, connard !")
                .addField(".miam", "Commande provisoire qui donne un burger à Serin.")
                .setTitle("Clique BG");
                

        message.channel.send({  embeds:  [helpembed]});
    }
});

Client.login(key.token);