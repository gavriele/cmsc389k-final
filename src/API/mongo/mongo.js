require("dotenv").config();
const mongoose = require("mongoose");
const chalk = require("chalk");

// To color code the errors in the terminal
var connected = chalk.bold.green;
var error = chalk.bold.red;
var disconnected = chalk.bold.yellow;

// Connect to MongoDB
const mongoDB = process.env.MONGODB;
url = "mongodb://user1:<password>@cluster0-shard-00-00-r0fic.mongodb.net:27017,cluster0-shard-00-01-r0fic.mongodb.net:27017,cluster0-shard-00-02-r0fic.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority"
console.log("mongodb", mongoDB);
mongoConnect = () => {
    mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        .catch(err => {
            console.log("Error occur in Mongoose", err);
        });

    // MongoDB connected
    mongoose.connection.on("connected", function () {
        console.log(connected("Mongoose connection is open"));
    });

    // MongoDB disconnected due to error
    mongoose.connection.on("error", function (err) {
        console.log(
            error("Mongoose connection has occured " + err + " error")
        );
    });

    // MongoDB disconnected
    mongoose.connection.on("disconnected", function () {
        console.log(disconnected("Mongoose connection is disconnected"));
        process.exit(0);
    });
};

module.exports = {
    mongoConnect
};