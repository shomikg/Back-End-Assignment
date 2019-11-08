# Node.js Back-End Assignment (Pay-Slip Generation)

This repository contains the homework assignment given to us by a trainer to generate payslips for users.

![](/img/img1.JPG)

## Back-End Assignment
### Assignment : When a user input's the employee's details: first name, last name, annual salary (natural numbers) and super rate (0% -12% inclusive), payment start date, the program should generate payslip information with name, pay period, gross income, income tax, net income and super annuation. 

![](/img/img2.png)


## The Solution

### Launching the Server

Too launch the application please run the following command from the project root folder:

```bash
npm install
node server
```

You may also run the application in debugging mode:

```bash
env NODE_DEBUG=server,stripe,mailgun,cli,workers node server.js
```

Running the APP for different environments:

```bash
NODE_ENV=staging node server.js

```

### Front-End

The following paths are available for the user in browser after launching the app.

#### Index Page

Path: `http://localhost:3000/`

![](/img/img3.PNG)

#### Register

Path: `http://localhost:3000/registerUser`

![](/img/img4.PNG)

#### Login

Path: `http://localhost:3000/login`

![](/img/img5.PNG)

#### Generate Payslip

Path: `http://localhost:3000/generatePayslip/:month`

![](/img/img6.PNG)

#### Update Existing User's Salary

Path: `http://localhost:3000/updateSalary/:sal`

![](/img/img7.PNG)

#### Signout Exisiting User

Path: `http://localhost:3000/signout`

![](/img/img8.PNG)


### Back-End (API)

The following endpoints are available from API perspective.


#### User Endpoints

##### Create the User

Request example:

```bash
curl -X POST \
  http://localhost:3000/registerUser \
  -d '{
	"firstName": "Andrew",
	"lastName": "Smith",
	"user": "andrew123",
	"pass": "123",
	"annualSalary": "60050",
  "superRate": "9"
}'
```
