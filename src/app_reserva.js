var restify = require("restify");
var builder = require("botbuilder");

var server = restify.createServer();

var connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});

server.post("/api/messages", connector.listen());

var inMemoryStorage = new builder.MemoryBotStorage();

var bot = new builder.UniversalBot(connector, [
  function(session) {
    session.send("Seja bem vindo ao XPTO Restaurante");
    
    builder.Prompts.time(
      session,
      "Por favor, informe uma data para sua reserva. Ex.: dia/mês/ano"
    );
  },
  function(session, results) {
    session.dialogData.reservationDate = builder.EntityRecognizer.resolveTime([
      results.response
    ]);
    builder.Prompts.text(session, "Mesa para quantos?");
  },
  function(session, results) {
    session.dialogData.partySize = results.response;
    builder.Prompts.text(session, "A reserva será em qual nome?");
  },
  function(session, results) {
    session.dialogData.reservationName = results.response;

    session.send(
      `Detalhes da reserva: <br/>Data: ${
        session.dialogData.reservationDate
      } <br/>Número de pessoas: ${
        session.dialogData.partySize
      } <br/>Reservado em nome de: ${session.dialogData.reservationName}`
    );
    session.endDialog();
  }
]).set("storage", inMemoryStorage);

module.exports = server;
