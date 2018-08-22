const Discord = require("discord.js");
const unirest = require('unirest');
const auth = require("../data/auth.json");
const UDurl = "https://mashape-community-urban-dictionary.p.mashape.com/define?term=";

exports.run = (client, message, args) => {

	//If no words have been specified, return
	if(args[0] == null){
		message.channel.send("Please enter a word!");
		return;
	} 

	var requestURL = UDurl + args[0];

	for(var i = 1; i < args.length; i++){
		requestURL = requestURL + "+" + args[i];
	}

	unirest.get(requestURL)
	.header("X-Mashape-Key", auth.UDAPIkey)
	.header("Accept", "text/plain")
	.end(function (result) {
  		console.log("Status: ", result.status);

  		let resultList = result.body.list;
  		console.log("Body: ", result.body);
  		message.channel.send(createResponseEmbed(resultList));
	});

}


function createResponseEmbed(resultList){
	const embed = new Discord.RichEmbed()
		.setTitle("[Results]")
		.setColor(3447003);

		let length = resultList.length > 3 ? 3 : resultList.length;
	for(var i = 0; i < length; i++){
		embed.addField((i + 1) + ". " + resultList[i].word, resultList[i].definition, true);
	}
	return embed;
}