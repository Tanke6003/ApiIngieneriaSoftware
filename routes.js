const employeeController = require('./controllers/employeeController');
const materialController = require('./controllers/materialController');
const productController = require('./controllers/productController');
const loadRoutes = (app) =>{
    //employees
    app.get('/employees/getLastId',employeeController.getLastId);
    app.post('/employees',employeeController.getEmployees);
    app.post('/employees/registerEmployee',employeeController.registerEmployee);
    app.post('/employees/edit',employeeController.editEmployee);
    //materials
    app.get('/materials/getLastId',materialController.getLastId);
    app.post('/materials',materialController.getMaterials);
    app.post('/materials/registerMaterial',materialController.registerMaterial);
    app.post('/materials/edit',materialController.editMaterial);
    //product
    app.get('/products/getLastId',productController.getLastId);
    app.post('/products',productController.getProducts);
    app.post('/products/registerProduct',productController.registerProduct);
    app.post('/products/createProduct',productController.createProduct);
}   
module.exports = {
    loadRoutes
}