const employeeController = require('./controllers/employeeController');
const loadRoutes = (app) =>{
    app.post('/employees/registerEmployee',employeeController.registerEmployee);
    app.post('/employees',employeeController.getEmployees);
    app.post('/employees/edit',employeeController.editEmployee);
    app.get('/employees/getLastId',employeeController.getLastId);
}
module.exports = {
    loadRoutes
}