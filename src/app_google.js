var restify = require("restify");
var builder = require("botbuilder");

var server = restify.createServer();

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post("/api/messages", connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
  session.send("Link da sua pesquisa: %s", "http://lmgtfy.com/?q=" + session.message.text);
});

module.exports = server;
