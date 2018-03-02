const Discord = require("discord.js");
const bot = new Discord.Client();
const ms = require("ms");
const fs = require("fs");
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const express = require('express');
const app = express();

const adapter = new FileSync('database.json');
const storeadapter = new FileSync('store.json');
const db = low(adapter);

db.defaults({ burgers: []})
    .write()

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
    console.log(`MacDo fonctionne sur le port ${app.get('port')}`)
})


var Dev = "🌌DEV🌌";
var Mod = "🌠Mod🌠";
var log = "414180156312387597";

var prefix = "!";
const token = "NDE0MTEyMzYzMTk4MDIxNjMy.DWo4qw.SQzm4jsdF663lSeiJ8mprpBVD-k";
var mention = "<@414112363198021632>";
var memberCount = bot.users.size;
var servercount = bot.guilds.size;

var Propose = "Proposé par **MacDo**";

bot.mutes = require("./mutes.json");

function sendError(message, description) {
    message.channel.send({embed: {
        color: 15158332,
        description: ':x: ' + description
    }});
}



// READY
bot.on('ready', function() {
    console.log("-—————————————————————————————————————————-")
    console.log(`[!] Connexion en cours ...\n[!]Veuiller Patienté!\n[!]Les évenement sont après !\n[!]Les préfix actuelle sont: ${prefix}\n[!]Mentions = ${mention}\n[!]Nombre de membres: ${memberCount}\n[!]Nombre de serveurs: ${servercount}`)
    console.log("-—————————————————————————————————————————-")
    bot.user.setUsername("MacDo")
    bot.user.setActivity("RP BOT PREFIX : !")
    bot.user.setStatus("dnd")
});

// ME
bot.on('message', message => {
    if(message.content[0] === prefix) {
        let splitMessage = message.content.split(" ");
            if(splitMessage[0] === '!me') {
            var sender = message.author.username.toString();
            var humeur = message.content.substr(4);
            var me_embed = new Discord.RichEmbed()
                .setThumbnail(message.author.avatarURL)
                .addField(`**RP** COMMANDE`, `***${sender}*** : ${humeur}`)
                .setFooter(`${Propose}`)
                .setColor('#D00101')

            message.delete();
            message.channel.send({embed: me_embed});
        }
    }
});

// ANNNONCE
bot.on('message', message => {      
    let splitMessage = message.content.split(" ");
        if(splitMessage[0] === '!annonce') {

            message.delete();
        if (!message.member.roles.find("name", Dev)) {
        }
        if (!message.member.roles.find("name", Mod)) {
             message.channel.bulkDelete(1)
             return;
        }
        var sender = message.author.username.toString();
        var annonce = message.content.substr(9);
        var annonce_embed = new Discord.RichEmbed()
            .addField(`***ANNONCE***`, `**${annonce}**`)
            .setFooter(`${Propose}`)
            .setColor('#F0C800')
        const infomp_embed = new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .setTitle(`__ANNONCE__ COMMANDE`)
            .addField(`Message envoyé :`, `${annonce}`)
            .setFooter(`${Propose}`)
            .setColor('#D00101')
        const annoncelog_embed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setTitle(`**MOD** COMMANDE`)
            .addField(`${sender} a fait une annonce :`, `${annonce}`)
            .setFooter(`${Propose}`)
            .setColor('#D00101')
        
        console.log(`-————————————————————-\nUne annonce a étais faite la voici ${annonce}\nElle a étais faite par ${sender}\n-————————————————————-`)
        bot.channels.get(log).send({embed: annoncelog_embed});
        bot.channels.get('412541931092967424').send({embed: annonce_embed});
        message.author.createDM().then(channel => {
            channel.send({embed: infomp_embed});
        })

        }
})

// INFO
bot.on('message', message => {      
    let splitMessage = message.content.split(" ");
        if(splitMessage[0] === '!info') {

            message.delete();
        if (!message.member.roles.find("name", Dev)) {
        }
        if (!message.member.roles.find("name", Mod)) {
             message.channel.bulkDelete(1)
             return;
        }
        var sender = message.author.username.toString();
        var info = message.content.substr(6);
        var info_embed = new Discord.RichEmbed()
            .addField(`***INFO***`, `**${info}**`)
            .setFooter(`${Propose}`)
            .setColor('#01A8FB')
        const infomp_embed = new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .setTitle(`__INFO__ COMMANDE`)
            .addField(`Message envoyé :`, `${info}`)
            .setFooter(`${Propose}`)
            .setColor('#D00101')
        const infolog_embed = new Discord.RichEmbed()
            .setThumbnail(message.author.avatarURL)
            .setTitle(`**MOD** COMMANDE`)
            .addField(`${sender} a dit une info :`, `${info}`)
            .setFooter(`${Propose}`)
            .setColor('#D00101')
        
        console.log(`-————————————————————-\nUne info a étais dit la voici ${info}\nElle a étais faite par ${sender}\n-————————————————————-`)
        bot.channels.get(log).send({embed: infolog_embed});
        bot.channels.get('412541931092967424').send({embed: info_embed});
        message.author.createDM().then(channel => {
            channel.send({embed: infomp_embed});
        })
    }
})

// PURGE
bot.on('message', message => {
    let splitMessage = message.content.split(" ");
    if (splitMessage[0] === '!purge') {
        async function purge() {
            message.delete();
            if (!message.member.roles.find("name", Dev)) {
                sendError(message, 'Tu n\'a pas la permission ')
            }
            if (!message.member.roles.find("name", Mod)) {
                sendError(message, 'Tu n\'a pas la permission ') 
                return;
            }
            if (isNaN(splitMessage.slice(1)[0])) {
                sendError(message, 'Mettez un nombre. \n Utilisation: ' + prefix + 'purge <nombre>');
                return;
            }

            var sender = message.author.username.toString();
            const fetched = await message.channel.fetchMessages({limit: splitMessage.slice(1)[0]});
            console.log(`-————————————————————-\n` + fetched.size + ` message trouvé. Suppression\nExécuté par ${sender}\n-————————————————————-`);
            const purge_embed = new Discord.RichEmbed()
                .setThumbnail(message.author.avatarURL)
                .setTitle(`**MOD** COMMANDE`)
                .addField(`${sender} :`, `${fetched.size} message supprimé`)
                .setFooter(`${Propose}`)
                .setColor('#D00101')
            const purgemp_embed = new Discord.RichEmbed()
                .setThumbnail(bot.user.avatarURL)
                .setTitle(`__PURGE__ COMMANDE`)
                .addField(`Voici les logs de la commande`, `${fetched.size} message supprimé`)
                .setFooter(`${Propose}`)
                .setColor('#D00101')

            bot.channels.get(log).send({embed: purge_embed});
            message.author.createDM().then(channel => {
                channel.send({embed: purgemp_embed});
            })

            message.channel.bulkDelete(1)
            message.channel.bulkDelete(fetched)
                .catch(error => sendError(message + 'Error: ${error}'));
        }

        purge();

    }
});

// HELP
bot.on('message', message => {
    if(message.content === prefix + "help") {
    var help_embed = new Discord.RichEmbed()
        .setTitle('***HELP*** COMMANDE')
        .addField('!me <Action> :', "Commande pour dire une action **Utilisable par tous le monde**")
        .addField('!annonce <Annonce> :', "Commande pour dire une annonce **Utilisable par le staff**")
        .addField('!purge <Nombre> :', "Commande pour supprimer un certain nombre de message **Utilisable par le staff**")
        .addField('!help :', "Commande pour afficher la liste de commandes **Utilisable par tous le monde**")
        .addField('!info :', "Commande pour dire une info **Utilisable par le staff**")
        .setFooter(`${Propose}`)
        .setColor('#01A8FB')
        message.delete();
        message.author.createDM().then(channel => {
            channel.send({embed: help_embed});

        })
    }
});

// BURGER LIST
bot.on('message', message =>{
    if (message.content === prefix + "burgers") {
        message.channel.bulkDelete(1)
        var value = message.content.substr(10);
        var msgauthor = message.author.username.toString();
        var burgers = db.get("burgers").filter({user: msgauthor}).find("burgers").value()
        var burgersfinal = Object.values(burgers);
        var burgers_embed = new Discord.RichEmbed()
            .setTitle(`**Burgers de ${msgauthor}**`)
            .setDescription("Voici tous vos burgers")
            .addField("**Burgers : **", `**${burgersfinal[1]}** :hamburger:`)
            .setColor('#F08000')
            message.author.createDM().then(channel => {
                channel.send({embed: burgers_embed});
                await(50)
                message.channel.bulkDelete(1)
            })
        }
})
// BURGER WIN
bot.on('message', message =>{
    var value = message.content.substr(10);
    var msgauthor = message.author.username.toString();

    if(message.content[0] === prefix)return;

    if(message.author.bot)return;

    if(!db.get("burgers").find({user: msgauthor}).value()){
        db.get("burgers").push({user: msgauthor, burgers:1}).write();
    }else{
        var userburgersdb = db.get("burgers").filter({user: msgauthor}).find('burgers').value();
        //console.log(userburgersdb);
        var userburgers = Object.values(userburgersdb)
        //console.log(userburgers);
        //console.log(`Nombre de burgers : ${userburgers[1]}`)

        db.get("burgers").find({user: msgauthor}).assign({user: msgauthor, burgers: userburgers[1] += 1}).write();

    }
})

// JOIN
bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find("name", "Novice");
    member.guild.channels.find("name", "join-leave").send(':hand_splayed::skin-tone-3: ' + member.user.username + ' vien de rejoindre MacDo')
    member.addRole(role)
    member.createDM().then(channel => {
        return channel.send('Bienvenue sur le Discord de MacDo ' + member.displayName);
    })
});

// LEAVE
bot.on('guildMemberRemove', member => {
    member.guild.channels.find("name", "join-leave").send(':hand_splayed::skin-tone-3: ' + member.user.username + ' vien de quitter MacDo')
    member.createDM().then(channel => {
        return channel.send('Repasse une prochaine fois ' + member.displayName);
    })     
});

// BOT LOGIN
bot.login(token)