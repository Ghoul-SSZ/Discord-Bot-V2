const Discord = require("discord.js");
const config = require("./data/config.json");
const client = new Discord.Client();
const auth = require("./data/auth.json");


client.login(auth.token);

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	var executed = false;

	//If the message isn't inteded for the bot or is from another bot
	if(!message.content.startsWith(config.prefix) || message.author.bot) return;

	if(message.content.startsWith(config.prefix)){
		//Get the individual string in the command 
		const args = message.content.split(" ");
		console.log(args);
		const command = args.shift().slice(config.prefix.length);

		try{
			console.log(`./commands/${command}.js\n`);
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(client, message, args);
			console.log("Command done! Awaiting next command!\n");
			executed = true;

		} catch (error){
			console.log(error);
			console.log("Could not find command!\n");
		}
		
		if(!executed){
			let commandFile = require(`./commands/soundByte.js`);
			commandFile.run(client, message, message.content.split(" "));
			console.log("Audioplay done! Awaiting next command!");
		}
	}
});