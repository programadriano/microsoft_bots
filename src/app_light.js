var restify = require("restify");
var builder = require("botbuilder");
var five = require("johnny-five");

var led;

var board = new five.Board();
board.on("ready", function() {
  led = new five.Led(13);
  ///led.blink(500);
});

var server = restify.createServer();

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post("/api/messages", connector.listen());

var bot = new builder.UniversalBot(connector, function(session) {
  if (session.message.text == "ligar") {
    led.on();
  } else if (session.message.text == "desligar") {
   led.off();
  }
});

module.exports = server;
