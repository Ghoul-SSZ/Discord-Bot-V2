const config = require("../data/config.json");
const fs = require('fs');

var iReady = true;

//TODO Check bug when it gets multiple requests at the same time (from different users)

exports.run = (client, message, args) => {
	if(iReady && message.member.voiceChannel){
		iReady = false;
    var file = args[0].slice(1);

    var pathName = config.soundfile + `/${file}.mp3`;
    console.log(pathName);
    if(!fs.existsSync(pathName)){
      iReady = true;
      return;
    }

  	var voiceChannel = message.member.voiceChannel;
  	voiceChannel.join()
  		.then(connection => {
        

  			const dispatcher = connection.playFile(pathName);
  			dispatcher.on("end", end => {
  				console.log("We are done with soundByte request!");
  				iReady = true;
  				voiceChannel.leave();

  			})
  		})
  		.catch(err => console.log(err));
	}
}