// This file runs the express application
// We do not want to have all of this in the same file as what is in app.js because we want to be able to export app.js without the listen method.
// Otherwise we would not be able to set up tests that made requests without them actually being 'heard' by the server.
const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log("The server is running on port " + port);
});
