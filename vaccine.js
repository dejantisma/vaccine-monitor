const fetch = require("node-fetch");
const chalk = require('chalk');
const webhook = require('./webhook');
const dateTime = require('date-time');

function monitor() {
  fetch("https://heb-ecom-covid-vaccine.hebdigital-prd.com/vaccine_locations.json", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site"
    },
    "referrer": "https://vaccine.heb.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }).then(res => res.json()).then(res => {

    for (var i = 0; i < res.locations.length; i++) {
      if (res.locations[i].city === 'SAN ANTONIO') {
        if (res.locations[i].openTimeslots > 0) {
          console.log(chalk.green(`[${dateTime()}] Found open appointment at `  + res.locations[i].name + '. Street address: ' + res.locations[i].street));
          webhook.webhookClient.send({
            username: 'vaxaio',
            avatarURL: 'https://www.nhpr.org/sites/nhpr/files/styles/x_large/public/202011/CoronavirusBall_red_CDChighrez.png',
            embeds: [webhook.embed(true, res.locations[i])],
          })
        } else {
          console.log(chalk.yellow(`[${dateTime()}] No open appointments at ` + res.locations[i].name + ', monitoring..'));
        }
      }
    }
    


  }).catch(err => console.log(err));


  setTimeout(monitor, 10000); //10s delay
}

monitor();


