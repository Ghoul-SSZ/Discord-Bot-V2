

exports.run = (client, message, args) => {

	if(args == null){
		message.channel.send("Nobody loves you!");
	}

	var person1 = args[0].toLowerCase();
	var person2;
	var selfLove = false;
	if(args[1] != null){
		person2 = args[1].toLowerCase();
	} else {
		person2 = args[0].toLowerCase();
		selfLove = true;
	}

	var p1length = person1.length; 
	var p2length = person2.length;
	var p1val = person1.charCodeAt(0);
	var p2val = person2.charCodeAt(0);

	for(var i = 1; i < p1length; i++){
		p1val = p1val * person1.charCodeAt(i);
		
	}

	for(var i = 1; i < p2length; i++){
		p2val = p2val * person2.charCodeAt(i);
	}

	var percentage = (p1val * p2val) % 101;
	var result;

	if(!selfLove){
		if(percentage >= 0 && percentage <= 25){
			result = "Wow, get the restraint order ready!";
		} else if (percentage > 25 && percentage < 50){
			result = "Find someone better!";
		} else if (percentage >= 50 && percentage < 75){
			result = "Good fit! Best of luck to you!";
		} else {
			result = "What a lovely couple! Quick, prepare the lube!";
		}
		message.channel.send(person1 + " and " + person2 + " has " + percentage + "% chance of love!"
			+ "\n" + result); 
	} else {
		if(percentage >= 0 && percentage <= 25){
			result = "Wow, you hate yourself. Just make sure not to include me in your suicide note!";
		} else if (percentage > 25 && percentage < 50){
			result = "You need more self love. Remember, if Honeybooboo's mother can be married twice, then there is hope even for you!";
		} else if (percentage >= 50 && percentage < 75){
			result = "Good that you like yourself, because I don't.";
		} else {
			result = "If you could, you would marry yourself!";
		}
		message.channel.send(person1 + " has a self love of " + percentage + "%" + "\n"
			+ result);
	}
}