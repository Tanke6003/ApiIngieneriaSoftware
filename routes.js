const employeeController = require('./controllers/employeeController');
function loadRoutes(app) {
    app.post('/employees/registerEmployee',employeeController.registerEmployee);
    app.post('/employees',employeeController.getEmployees);
    app.post('/employees/edit',employeeController.editEmployee);
}
module.exports = {
    loadRoutes
}