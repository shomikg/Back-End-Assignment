class Routes
{// class Routes encapsulating method for providing routes to the app instance provided
    routing(app)
    {
        var Middleware = require("../controllers/middleware");
        var User = require('../controllers/user.controller.js');
        app.get('/', (req, res) => {
            res.json({"message": "Back-End Technical Test."});
        });

        //############### Defining Route ###################
        app.post('/login', User.login);
    
        app.post('/registerUser', User.register);
    
        app.get('/generatePaySlip/:month', Middleware.checkToken, User.generatePaySlip);
        
        app.get('/updateSalary/:sal',Middleware.checkToken, User.updateSalary)
    
        app.get('/signout', Middleware.signout);
    }
}

module.exports = Routes;//Exporting Routes Module in order to define routes to the app instance provided