#!/usr/bin/env node

var http = require("http"), 
	server,
	wins = 0, // wins of the client
	losses = 0, 
	ties = 0;

server = http.createServer(function(req, res) {
	var responseCode = 200,
		response = {};

	function randomGameResponse () {
		// get random number from 1-5
		switch ( Math.floor(Math.random() * (6 - 1)) + 1 ) {
		case 1:
			return "rock";
		case 2:
			return "paper";
		case 3:
			return "scissors";
		case 4:
			return "spock";
		case 5:
			return "lizard";
		default:
			return null;
		}
	}

	// return win if client is winner
	// c client, s server 
	function getOutcome(c, s) {
		switch (c) {
			case "rock":
				switch (s) {
					case "paper":
						wins++;
						return "win";
					case "spock":
						wins++;
						return "win";
					case "rock":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
					}
			break;
			case "paper":
				switch (s) {
					case "scissors":
						wins++;
						return "win";
					case "lizard":
						wins++;
						return "win";
					case "paper":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
					}
			break;
			case "scissors":
				switch (s) {
					case "rock":
						wins++;
						return "win";
					case "spock":
						wins++;
						return "win";
					case "scissors":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
					}
			break;
			case "spock":
				switch (s) {
					case "paper":
						wins++;
						return "win";
					case "lizard":
						wins++;
						return "win";
					case "spock":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
				}
			break;
			case "lizard":
				switch (s) {
					case "rock":
						wins++;
						return "win";
					case "scissors":
						wins++;
						return "win";
					case "lizard":
						ties++;
						return "tie";
					default:
						losses++;
						return "loose";
				}
		}
	}

	switch (req.url) {
		case "/play/rock":
			response.outcome = getOutcome( "rock", randomGameResponse() );
			break;
		case "/play/paper":
			response.outcome = getOutcome( "paper", randomGameResponse() );
			break;
		case "/play/scissors":
			response.outcome = getOutcome( "scissors", randomGameResponse() );
			break;
		case "/play/spock":
			response.outcome = getOutcome( "spock", randomGameResponse() );
			break;
		case "/play/lizard":
			response.outcome = getOutcome( "lizard", randomGameResponse() );
			break;
		default:
			responseCode = 404;
	}

	response.wins = wins;
	response.losses = losses;
	response.ties = ties;

	res.writeHead(responseCode, {"Content-Type": "application/json"});

	if (responseCode === 200) {
		res.end(JSON.stringify(response));
	}
	else {
		res.end("404 NOT FOUND");
	}

	console.log(req.url);
	console.log(JSON.stringify(response));
});

server.listen(3000);
console.log("Service started. Listening on port 3000.");
