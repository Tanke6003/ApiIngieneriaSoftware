const employeeController = require('./controllers/employeeController');
const materialController = require('./controllers/materialController');
const loadRoutes = (app) =>{
    app.post('/employees/registerEmployee',employeeController.registerEmployee);
    app.post('/employees',employeeController.getEmployees);
    app.post('/employees/edit',employeeController.editEmployee);
    app.get('/employees/getLastId',employeeController.getLastId);
    //materials
    app.get('/materials/getLastId',materialController.getLastId);
    app.post('/materials',materialController.getMaterials);
    app.post('/materials/registerMaterial',materialController.registerMaterial)
}
module.exports = {
    loadRoutes
}