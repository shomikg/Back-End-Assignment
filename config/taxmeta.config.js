//Exporting Rules for calculating Tax

module.exports =  [{
    "minSalary": 0,
    "maxSalary": 18200,
    "baseTax": 0,
    "taxPerDollar": 0
},
{
    "minSalary": 18201,
    "maxSalary": 37000,
    "baseTax": 0,
    "taxPerDollar": 0.19
},
{
    "minSalary": 37001,
    "maxSalary": 87000,
    "baseTax": 3572,
    "taxPerDollar": 0.325
},
{
    "minSalary": 87001,
    "maxSalary": 180000,
    "baseTax": 19822,
    "taxPerDollar": 0.37
},
{
    "minSalary": 180001,
    "maxSalary": 0,
    "baseTax": 54232,
    "taxPerDollar": 0.45
}];