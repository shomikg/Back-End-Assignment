
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const secretKey = require("../config/key.config").user;
const User = require('../models/user.model.js');


exports.checkToken = (req, res, next) => {
  var token = req.headers['x-access-token'] || req.headers['authorization'] || "";
  User.findOne({ tok: token }, (err, updatedDoc) => {

    if (updatedDoc === null) {
        return res.json({
            success: false,
            message: 'No User Logged In'
          });
    }

    else {
      next();
    }
  })

}

exports.signout = (req, res) => {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    User.findOneAndUpdate({ tok: token }, { $set: { tok: 'No Token' } }, { new: true }, (err, updatedDoc) => {
      if (updatedDoc === null) {
        return res.send("No user to signout");
      }
      else
        return res.send("Signed Out User");
    });
  }
