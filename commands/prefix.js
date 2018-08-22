const fs = require("fs");
const config = require("../config/config.json");
const auth = require("../config/auth.json");

//TODO Change it so only admin or moderator can change the prefix

//Command to change the prefix
exports.run = (client, message, args) => {
	var user = message.member;
	console.log(args);

	if(auth.backupId == user.user.id){
		var oldPrefix = config.prefix;
		console.log(oldPrefix);
		var newPrefix = args[0];
		console.log(newPrefix);
	  	config.prefix = newPrefix;

	  	fs.writeFile("/home/rakeem/Documents/Javascript space/config/config.json", JSON.stringify(config), (err) => 
	  		console.error);

	  	message.channel.send("Prefix changed from " + oldPrefix + " to " +
	  		newPrefix);
	} else {
		message.channel.send("Permission denied!");
	}
}