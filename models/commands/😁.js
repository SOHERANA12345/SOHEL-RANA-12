const fs = require("fs");
module.exports.config = {
	name: "chumma",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "JOY", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "🙂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("😁")==0 || event.body.indexOf("🤣")==0 || event.body.indexOf("😆")==0 || event.body.indexOf("😹")==0) {
		var msg = {
				body: "বুইড়া বটি তুই এত হাসিস না হাসলে তোরে চোরের মত লাগে..!🌚🤣",
			}
			api.sendMessage( msg, threadID, messageID);
    api.setMessageReaction("😘", event.messageID, (err) => {}, true)
		}
	}
	module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
