const mongoose = require('mongoose');

var init = () =>
    {
        //Defining MongoDb Schema
        const UserSchema = mongoose.Schema({
            firstName: String,
            lastName: String,
            user: String,
            pass: String,
            annualSalary: Number,
            superRate: Number,
            tok : String
        }, {
            timestamps: true 
        });

        return mongoose.model('User', UserSchema, 'User');;
    }

module.exports = init();
