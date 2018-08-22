INSTALLATION:
* First, node package manager (npm) and node.js needs to be installed on the system.
* Install discord.js in project with command "npm install discord.js"
* For sound support, add "npm install opusscript" (or "npm install node-opus", which is
	better quality, but requires python 2.7.x and build-essentials). You also need
	ffmpeg on the system, which is installed through "sudo apt-get install ffmpeg"

* Bot can be launched (at least when testing) by typing "node 'mainfilename' "
	e.g "node mybot.js" or "node mybot"

FEATURES:
* MUSIC BOT: A user should be able to queue up one or several songs to a playlist on the bot.
When the user presses play, it should move into the user's voice channel and play the song into the music channel. Basic features should include:
 - skipping to the next song in the playlist
 - stopping the music stream
 - get the bot to leave the voicechannel
 - purging the playlist
 - Easy to implement additional features in the future
If the user isn't in a voicechannel when it requests to play music, the bot should send error message telling them to get inside a voicechannel.
Right now, I'll just focus on getting the music player to queue the first song it finds. In the future, I may add multiple suggestions.

* PING TESTER: A simple ping-pong message, which should return a pong message and the response time.
* GIF GENERATOR: Given a random search word, the bot should return a random gif. If no keyword has been specified, the bot should just return a random gif. Remember to investigate any ways to get funnier gifs (right now, the ones I get are a bit stale).
* PLAY SOUNDBYTES: Sohuld be able to store special soundbytes on the server that are played when their specific keywords are written into the chat by themselves. A suggestion is to let the server look if they represent a sound after they check if they represent a command. The bot joins the voicechannel, plays the sound and then leaves. If user is not in a voicechannel, either generate error or do nothing (Log some shit).
* OW HERO RANDOMIZER: Should be able to randomize heroes for anyone asking.
* PREFIX CHANGER: Should be able to change the prefix to something else.

MUSIC BOT NOTES:
I should probably still have the skeleton I had before. However, it might be smart to split up the music part into different files with methods, one for searching for song, one for queuing it after giving suggestion to the user and one for handling playing.
* BUG: It seems to have trouble when searching for "littlev". Says that "undefined has been added to the queue". Wonder if it is due to bad connection.


FUTURE IMPROVEMENTS:
- Right now I will probably only let the bot do one thing at a time. At a later timeframe, I could probably just queue the instructions if multiple people are requesting stuff from the server.
- When the user wants to add a song, the bot should return at least three suggestions to what song should be queued, which means the server should await a response when the user makes a query.
