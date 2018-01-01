const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

function insertSpaces(aString) {
  return aString.split("").join(" ");
}

function insertClap(aString) {
  return aString.split("").join(" 👏 ");
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Fstrings = [" with a transformer.", ", but creates a black hole and gets sucked in.", " with poutine.", ", but they slipped on a banana peel", " and in the end, the only victor was the coffin maker.", ", and what a fight it is! Whoa mama!", ", with two thousand blades!", ", but he fell into a conveniently placed manhole!" , ", but they tripped over a rock and fell in the ocean.", ", but they hurt themselves in their confusion.", ". SHORYUKEN!", ". HADOUKEN!", ". KA-POW!", " with a pillow.", " with a large fish.", ", but they stumbled over their shoelaces.", ", but they missed.", " with a burnt piece of toast.", ", but it wasn't very effective..."];

var rand = Fstrings[Math.floor(Math.random() * Fstrings.length)];

var dadmode = 0;

String.prototype.toAlternatingCase = function () {
    tmp = this.toLowerCase(); (this[0] == this[0].toLowerCase() ? i = 1 : i = 0); for(i; i < tmp.length; i = i+2) { tmp = tmp.substr(0,i) + tmp[i].toUpperCase() + tmp.substr(i+1); } return tmp;
}

Array.prototype.randomElement = function (array) {
    return array[Math.floor(Math.random() * array.length)]
}

client.on('ready', () => {
  console.log(`Logged in and ready to serve ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`)
  client.user.setGame(config.game);
});

client.on('message', message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (message.content.startsWith("I'm") && dadmode == "1") {
    message.channel.send("Hi, " + message.content.substring(4) + ", I'm Dad!")
  }
  if (message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send(`Ping: ${Math.round(client.ping)}ms`);
  } else

  if (command === 'pressf') {
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`${message.author} 🇫`);
    message.channel.send(`${member} 🇫`);
  } else

  if (command === 'help') {
    message.react('👌');
    message.author.send(`**Available Commands in ${message.channel}:**\n\n\`p.help\` - This, of course.\n\`p.ping\` - Shows your ping.\n\`p.pressF\` - Pays respects to a user or you.\n\`p.coin\` - Flip a coin.\n\`p.spongemock [text]\` - MoCk SoMe TeXt\n\`p.fight <user>\` - Fight someone, ripped straight from Bug Bot.\n\`p.guildinfo\` - Learn about the guild you're in.\n\`p.spinner [type]\` - Spin a fidget spinner.\n\`p.about\` - Learn more about me!\n\`p.shame\` - S H A M E\n\`p.dadmode\` - Ever wanted Paradox to make shitty dad jokes? Me neither, but I did it anyway.\n\`p.clap\` - Claps\n\`p.invite\` - Gets an invite link for the bot.\n\`p.aesthetic\` - M A K E S T E X T V A P O R W A V E\n\`p.avatar <user>\` - Gets the avatar of a user or you.\n\`p.report [bug]\` - Reports a bug to the developers.\n\`p.suggest [feature]\` - Suggests a feature to the developers.\n\`p.banne\` - Banne a user.\n\`p.uptime\` - Check the bot's uptime.\n\n**__Developer__**\n\n\`p.eval\` - ***SECRET COMMAND NOT FOR USE BY NORMIES***\n\`p.say\` - Makes the bot say something.\n\nFor additional help contact Gallium#1327 or join https://discord.gg/By4Qs4R`);
  } else

  if (command === 'coin') {
    var random = Math.floor((Math.random() * 10) + 1);
    if(random & 1)
      return message.channel.send("The coin landed on **heads**.");
    message.channel.send("The coin landed on **tails**.");
  } else

  if (command === 'spongemock') {
    let mocktext = args.slice().join(' ');
    if (!mocktext)
      return message.reply("YoU cAn'T mOcK tExT tHaT dOeSnT eXiSt");
    if (message.content.substring(15) != 0) {
      message.channel.send(mocktext.toAlternatingCase(), {
        files: ['./mock.jpg']
    })}
  } else

  if (command === "fight") {
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`${message.author.username} is fighting Paradox${Fstrings.randomElement(Fstrings)}`);
    message.channel.send(`${message.author.username} is fighting ${member}${Fstrings.randomElement(Fstrings)}`);
  } else

  if (command === "guildinfo") {
  var serverCreated = new Date(message.guild.createdTimestamp);
  message.channel.send(new Discord.RichEmbed()
      .setDescription(`Created by ${message.guild.owner.user.tag} on ${serverCreated.toLocaleDateString()}`)
      .setColor(message.member.displayColor)
      .setThumbnail(message.guild.iconURL)
      .setAuthor(`Information on ${message.guild.name}:`)
      .addField("Guild ID:", message.guild.id)
      .addField("Members:", message.guild.memberCount)
      .addField("Region:", message.guild.region)
    );
  } else

  if (command === 'about') {
    message.channel.send(":wave: Hello, I am **Paradox**!\n\nI am a Discord bot for fun and moderation!\n\nI was written by **Gallium**#1327 using Discord.js. You can find my code at <https://github.com/benzarr410/Paradox>.\n\nTo see a full list of commands, type `p.help`, or join my support server at <https://discord.gg/By4Qs4R>!\n\nIf you want to invite me to your server use `p.invite`!")
  } else

  if (command === 'invite') {
    message.channel.send("Paradox is a Discord bot for fun and moderation!\nTo add me to your server, click the link below:\n\n:link: **<https://discordapp.com/oauth2/authorize?client_id=315834856095481856&scope=bot&permissions=268747841>**\n\nTo see a full list of my commands, type `p.help`.\nIf you require additional help, contact **Gallium**#1327 or join my support server <https://discord.gg/By4Qs4R>")
  } else

  if(command === "shame") {
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send("Shame on...no one. You forgot to shame someone.");
    message.channel.send(`${member} 🔔 ***S H A M E*** 🔔`);
  } else

  if (command === "spinner") {
    const spinnerType = args.join(" ");
    if (!spinnerType)
      return message.channel.send("Spin a spinner using `p.spinner [type]`\n\nAvailable spinners: Red, Orange, Yellow, Green, Blue, Purple, Space");
    if (spinnerType === "red") {
      var spinner = "<:SpinnerRed:354283874051686401>"
    } else
    if (spinnerType === "orange") {
      var spinner = "<:SpinnerOrange:354283875310239745>"
    } else
    if (spinnerType === "yellow") {
      var spinner = "<:SpinnerYellow:354283875402252289>"
    } else
    if (spinnerType === "green") {
      var spinner = "<:SpinnerGreen:354283875003793409>"
    } else
    if (spinnerType === "blue") {
      var spinner = "<:SpinnerBlue:327104206987198464>"
    } else
    if (spinnerType === "purple") {
      var spinner = "<:SpinnerPurple:327104206567636992>"
    } else
    if (spinnerType === "pink") {
      var spinner = "<:SpinnerPink:327104206244937729>"
    } else
    if (spinnerType === "space") {
      var spinner = "<:SpinnerSpace:327104206060126208>"
    } else return message.channel.send("Not a valid spinner type!\n\nAvailable spinners: Red, Orange, Yellow, Green, Blue, Purple, Space")
    message.channel.send(`You spun the ${spinnerType} spinner. ${spinner}`);
    var spinFor = randNum(10, 120);
    setTimeout(function() {
       message.channel.send(`Your ${spinnerType} spinner spun for **${spinFor}** seconds. ${spinner}`);
     }, spinFor*1000);
   } else

  if (command === "dadmode") {
    const setting = args.join(" ");
    if (!setting)
      return message.channel.send("Please specify `on` or `off`!")
    if (setting === "off" && dadmode === 1) {
      message.channel.send("Dad mode off. Dad must have gone on a business trip.");
      dadmode = 0;
    } else
    if (setting === "on" && dadmode === 0) {
      dadmode = 1;
      message.channel.send("Dad mode on. Send a message starting with **I'm** to begin.");
    } else
    if (setting === "off" && dadmode === 0) {
      message.channel.send("Dad mode is already off!");
    } else
    if (setting === "on" && dadmode === 1) {
      message.channel.send("Dad mode is already on!");
    } else return message.channel.send("I couldn't understand. Please specify `on` or `off`!")
  } else

  if (command === 'aesthetic') {
    const spacedText = args.join(" ");
    if (!spacedText)
      return message.channel.send("Please enter a message!");
      message.channel.send(`\`\`\`${insertSpaces(spacedText)}\`\`\``);
  } else

  if (command === 'eval') {
    if (message.author.id !== config.devID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`An error occurred:\`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  } else

  if (command === 'avatar') {
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send(`Avatar for **${message.author.username}**: ${message.author.avatarURL}`);
    message.channel.send(`Avatar for **${member}**: ${member.user.avatarURL}`);
  } else

  if (command === 'report') {
    const report = args.join(" ");
    message.client.users.get(config.devID).send(`**${message.author.tag}** reported a bug:\n\n${report}`);
    message.reply("Your report has been sent!");
  } else

  if (command === 'suggest') {
    const suggestion = args.join(" ");
    message.client.users.get(config.devID).send(`**${message.author.tag}** has submitted a suggestion:\n\n${suggestion}`);
    message.reply("Your suggestion has been sent!");
  } else

  if (command === "banne") {
    let member = message.mentions.members.first();
    if (!member)
      return message.channel.send("u cannot banne no users");
      message.channel.send(`**${member}** has ben banne ✨`);
  } else

  if (command === "say") { // I think this is what you mean by speech
    if (message.author.id !== config.devID) return;
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  } else

  if (command === 'uptime') {
    var hours = (Math.round(client.uptime / (1000 * 60 * 60)));
    var days = (Math.floor(hours / 24));
    var finHours = (hours - days * 24);
    var minutes = (Math.round(client.uptime / (1000 * 60)) % 60);
    var seconds = (Math.round(client.uptime / 1000) % 60);
    message.channel.send(`I have been online for **${days}** days, **${finHours}** hours, **${minutes}** minutes, and **${seconds}** seconds!`);
  } else

  if (command === 'clap') {
    const text = args.join("");
    if (!text)
      return message.channel.send("Please enter a message!");
    message.channel.send(insertClap(text));
  }
});

client.login(config.token);
