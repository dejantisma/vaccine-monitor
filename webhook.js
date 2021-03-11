const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();


client.login(config.botToken);
exports.webhookClient = new Discord.WebhookClient(config.webhookID, config.webhookToken);
exports.embed = (isSuccess,item) => new Discord.MessageEmbed()
    .setTitle(isSuccess ? "Appointment open!" : "Payment declined")
    .setURL('https://vaccine.heb.com/scheduler')
    .setColor(isSuccess ? "GREEN" : "RED")
    .setDescription(item.name)
   // .setThumbnail(validURL(imageURL) ? imageURL : "")
   .setThumbnail("https://www.nhpr.org/sites/nhpr/files/styles/x_large/public/202011/CoronavirusBall_red_CDChighrez.png")
    .addFields(
        {name: 'Name',value:item.name,inline:true},
        {name: 'Street',value:item.street,inline:true},
        {name: 'City',value:item.city,inline:true},

    )
    .setTimestamp()
    .setFooter('vaxaio','https://www.nhpr.org/sites/nhpr/files/styles/x_large/public/202011/CoronavirusBall_red_CDChighrez.png');

