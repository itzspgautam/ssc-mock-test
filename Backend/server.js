const app = require("./app");

//Handling uncought exeption
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
});

//Server Start on port
const server = app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port:" + process.env.PORT);
});

//unhandled promis rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection.");
  server.close(() => {
    process.exit;
  });
});
