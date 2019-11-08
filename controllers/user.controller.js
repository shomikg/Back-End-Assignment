//Importing Node Core Modules and some third-party modules.
const User = require('../models/user.model.js');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var taxMeta = require("../config/taxmeta.config");
const secretKey = require('../config/key.config').user

exports.login=(req,res) =>
    {// Event Listener invoked when the user hits /login route

    User.find()// mongoose method for finding records in a collection.
        .then(tasks => {
            tasks.forEach((task)=>
        {
            if(req.body.user === task.user && req.body.pass === task.pass)
            {// checking a User's credentials.

            //generating Token for future login and authorization
                let token = jwt.sign({user: req.body.user, pass: req.body.pass},
                secretKey,
                { expiresIn: '24h'
                }
              );

              //mongoose method for finding entries by ID and then updating that record
              User.findByIdAndUpdate(task._id.valueOf(), {
                firstName: task.firstName, 
                lastName: task.lastName,
                user : task.user,
                pass : task.pass,
                annualSalary : task.annualSalary,
                superRate : task.superRate,
                month: task.month,
                tok : token
            }).then((stu)=>{
                return res.json({
                success: true,
                message: 'Student Authentication successful!',
                token: token
              });
            }).catch((stu)=>{console.log("token not inserted");});
              
            }
        });
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving student Details."
            });
        });
    }
exports.register = (req,res) =>
    {// Event Listener invoked when the user hits /registerUser route

        const schema = Joi.object().keys({
            firstName: Joi.string().alphanum().min(1).max(30).required(),
            lastName: Joi.string().alphanum().min(1).max(30).required(),
            user: Joi.string().alphanum().min(3).max(30).required(),
            pass: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
            annualSalary: Joi.number().positive().required(),
            superRate: Joi.number().positive().min(0).max(12).required(),
            month: Joi.string().alphanum().min(3).max(8),
            tok: [Joi.string(), Joi.number()],
        });// Defining a Schema for JOI Validation
        
        //Getting Input from user through Post Request Body
        const data = {
            firstName: req.body.firstName, 
            lastName: req.body.lastName,
            user : req.body.user,
            pass : req.body.pass,
            annualSalary : req.body.annualSalary,
            superRate : req.body.superRate
        }

        //Validating the User Input (data) with the help of JOI and the schema defined above
        Joi.validate(data,schema, function(err,value){
            if(err)//If any of the validations fail
            console.log(err);
            else
            {//If it does not
                const stu = new User(data);
                stu.save()
                .then(data2 => {
                      res.json({
                        success: true,
                        message: 'Successfully Registered!',
                      });
                    
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating a student."
                    });
                });
            }
        })
    }
exports.generatePaySlip = (req,res)=>
    {// Event Listener invoked when the user hits /generatePaySlip/month route
        var mon = req.params.month;
        var token = req.headers['x-access-token'] || req.headers['authorization'] || "";
        User.findOne({ tok: token }, (err, updatedDoc) => {
            
            taxMeta.forEach((meta)=>{
                if(updatedDoc.annualSalary>=meta.minSalary && updatedDoc.annualSalary<=meta.maxSalary)
                {
                    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'NOvember', 'December'];
                    let paymentYear = new Date().getFullYear();
                    let paymentMonth  = months.indexOf(mon);
                    let date_str = `${paymentYear} ${paymentMonth+1} 1`
                    // console.log(date_str)
                    console.log(new Date(date_str));
                    let month_index = new Date(date_str).getMonth();
                    console.log(month_index)
                    let last_date = (new Date(new Date(paymentYear,(month_index + 1), 1) - 24*60*60*1000)).getDate();
                var tax = Math.round((meta.baseTax + ((updatedDoc.annualSalary - meta.minSalary) * meta.taxPerDollar)) / 12);
                res.send({
                    "Name": updatedDoc.firstName+updatedDoc.lastName,
                    "Pay Period": `01 ${months[month_index+1]} - ${last_date} ${months[month_index+1]}`, 
                    "Gross Income": Math.round(updatedDoc.annualSalary / 12),
                    "Income Tax Payable for this month": tax,
                    "Net Income": Math.round(updatedDoc.annualSalary / 12) - tax,
                    "Super Amount": Math.round((Math.round(updatedDoc.annualSalary / 12) * updatedDoc.superRate) / 100)
                })
                }
            })
            
              
          })
    }

exports.updateSalary = (req,res)=>
{// Event Listener invoked when the user hits /updateSalary/sal route

    var sal = req.params.sal;
    var token = req.headers['x-access-token'] || req.headers['authorization'] || "";

          User.findOneAndUpdate({tok: token}, {$set:{annualSalary:sal}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
            else
            {
                res.json({
                    success: true,
                    message: 'Successfully Registered!',
                  });
            }
        });
        
}

