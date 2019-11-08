class Server
{// class Server encapsulating launching a Server
    constructor()
    {// Server() constructor
        this.express = require('express');
        this.bodyParser = require('body-parser');
        this.dbConfig = require('./config/database.config.js');
        this.mongoose = require('mongoose');
        this.Route = require('./routes/routes.js')
    }

    appInit()
    {
        //Init method of Server class used to launching Server
        const app = this.express();
        app.use(this.bodyParser.urlencoded({ extended: true }))
        app.use(this.bodyParser.json());

        this.mongoose.Promise = global.Promise;
        //Connect MongoDB Server through Mongoose Module
    this.mongoose.connect(this.dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");// When DB Connection is succesfully established
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);// When DB Connection is not established
    process.exit();// Stop the event loop
});
        new this.Route().routing(app);// Creating a Route Class Object for providing routes to the initialized app

        //Started listening requests
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        });
    }
}

new Server().appInit();// Creating a Server class object and invoking appInit() method for launching a Server