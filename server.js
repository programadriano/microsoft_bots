var server = require("./src/app_light");

server.listen(process.env.port || process.env.PORT || 3978, function() {
  console.log("%s listening to %s", server.name, server.url);
});
