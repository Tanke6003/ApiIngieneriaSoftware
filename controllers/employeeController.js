const employeeModel = require('../models/employeeModel');
const constants = require('../constants');
const functions = require('../functions');
async function registerEmployee(req,res) {
    try {
        let exist = await employeeModel.verifyRfc(req.body.rfc);
        exist.lastId = await employeeModel.getLastId();
        if(exist)
            return res.send({errorMessage: 'El rfc que quieres usar ya existe en la base de datos',status: false});
        await employeeModel.registerEmployee(req.body)
        return res.send({status:true});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}
async function getEmployees(req, res) {
    try {
        let exist = await employeeModel.getEmployees(req.body.employee,functions.likeString(req.body.employee));
        if (exist && exist.length)
            return res.send({Employees:exist,status:true});
        return res.send({errorMessage: 'no se encontro registro',status: false});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}
async function editEmployee(req, res){  
    try {
        let echo = await employeeModel.editEmployee(req.body);
        if(echo)
            return res.send({status:true });
        res.send({status:false})
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));    
    }
}
module.exports={
    registerEmployee,
    getEmployees,
    editEmployee
}