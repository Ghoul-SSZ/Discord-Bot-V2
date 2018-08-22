const ytdl = require('ytdl-core');
const auth = require("../data/auth.json");
var https = require('https');

const ytAuth = auth.ytAPIkey;
var musicQueue = [];
var iReady = true; 
var streamOptions = { seek: 0, volume: 0.5};
var boundVoiceChannel = null;
var dispatcher = null;

exports.run = (client, message, args) => {
	const action = args[0];

	//Are we ready to start a command?
	if(iReady){

		if(action == "q" || action == "queue"){ // Queue songs or show queue
			iReady = false;
			if(args[1] != undefined){
				var searchWords = args.slice(1);
				var searchQuery = createSearchQuery(searchWords);
				sendQueryAndQueueSong(searchQuery, message.channel);
			} else {
				showQueue(message);
				iReady = true;
			}
		} 

		else if(action == "p" || action == "play"){ // Start playing songs
			console.log(dispatcher);
			if(!dispatcher){  // I check this to make sure that the bot isn't playing somewhere else
				if(musicQueue.length > 0){
					playSong(client, message);
				} else {
					message.channel.send("There is nothing to play!");
				}
			}

		} 

		else if((action == "s" || action == "skip") && dispatcher) { //Is a song playing???
			console.log("We are starting with skip command");
			//TODO Check if a song is actually playing before trying to skip
			dispatcher.end("skip");

		}

		else if(action == "l" || action == "leave"){ //Leave voice channel
			boundVoiceChannel.leave();
			boundVoiceChannel = null;
			dispatcher = null;
			//TODO Add a message telling the user that the queue has been purged
		} 

		else if(action == "pq" || action == "purgequeue"){
			musicQueue = [];
			repeatList = [];
		} 

	} 
}

function createSearchQuery(searchWords){
	var searchQuery = searchWords.splice(0, 1);
	searchWords.forEach(function(word){
		searchQuery += `+${word}`;
	});
	console.log(searchQuery);
	return searchQuery;
}

function sendQueryAndQueueSong(searchQuery, channel){

	var requestUrl = "https://www.googleapis.com/youtube/v3/search" + `?part=snippet&maxResults=1&q=${searchQuery}&key=${ytAuth}`;
	https.get(requestUrl, (res) => {

		let rawData = '';

		res.on('data', (chunk) => { rawData += chunk; });
 		res.on('end', () => {
    		try {
      			const parsedData = JSON.parse(rawData);
      		

      			if(parsedData.items[0].id.kind === 'youtube#video'){
      				var vidId = parsedData.items[0].id.videoId;
      				var vidTitle = parsedData.items[0].snippet.title;
      				musicQueue.push({
      					'streamUrl' : vidId, 
      					'vidTitle' : vidTitle
      				});
      			}
      			channel.send(vidTitle + " have been added to the queue!");
      			iReady = true;

    		} catch (e) {
      			console.error(e.message);
      			channel.send("Could not find yt video from that query.");
      			iReady = true;
    		}


  		});
	});

}

function showQueue(message){
	let queueString = "\n[Music Queue]";

	for(i = 0; i < musicQueue.length; i++){
		queueString += `\n${i+1}: ${musicQueue[i].vidTitle}`;
	}
	message.channel.send({	"embed": {
   			"description" : `${queueString}`
  		}});

}

function playSong(client, message){
	if(!boundVoiceChannel && musicQueue.length > 0){
		if(!message.member.voiceChannel){
			message.channel.send("You need to be seated in a voice channel to play music!");
			return;
		}
		boundVoiceChannel = message.member.voiceChannel;
		boundVoiceChannel.join();
	}

	if(boundVoiceChannel == message.member.voiceChannel){//put dispatcher = null whenever we stop
		console.log("We are setting the stream");
		var stream = ytdl('https://www.youtube.com/watch?v=' + musicQueue[0].streamUrl,  { filter : 'audioonly' });

		dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
		dispatcher.once("end", end => {
			console.log("I am the end called: " + end);
			console.log("end is: " + end);
			console.log(end + " is in the end clause of dispatcher!\n");

			queueNextSong();

			dispatcher = null;
	
			console.log(end + " is playing the next song");
			playSong(client, message);

		})
		
		dispatcher.on('error', (err) => {
          	console.log(err);
        });
	}

}

function queueNextSong(){
	musicQueue.splice(0,1);
	console.log(musicQueue);
}

function stopPlaying(){
	dispatcher = null;
}