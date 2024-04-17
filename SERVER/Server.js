const app = require("./App");
const connectDatabase = require("./DB/Database");

//handling uncaught errore
process.on("uncaughtException", (err) => {
    console.log(`error: ${err.message}`);
    console.log("Shutting down the server for handling encaught exception");
});

//unhandled promise rejection

process.on ("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});



//config

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config(
    {path: "Config/.env"}
    );
}
//connect to databasse
connectDatabase();
// create server
const server = app.listen(process.env.port, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});