const connection = require('../connection');
function getLastId(){
    let query=  `
    select idProduct from product Order by idProduct desc limit 1;
    `;
return connection.runQueryRow(query);
}
function verifyProduct(name){
    let query=  `
    select idProduct from product WHERE name = ?;
    `;
    return connection.runQueryRow(query,[name]);
}
function getProducts(id,name){
    let query=  `
    select idProduct, name, description, unitPrice ,stock from Product where idProduct = ? or name like ?  or description like ?;
    `;
    return connection.runQuery(query,[id,name,name]);
}
function getProductDetail(id){
    let query=  `
    select ProductDetail.idProductDetail,ProductDetail.idProduct,ProductDetail.idMaterial,Material.name as 'nameMateria',ProductDetail.amount from ProductDetail INNER JOIN Material on Material.idMaterial = ProductDetail.idMaterial where idProduct = ?;
    `;
    return connection.runQuery(query,[id]);
}
function registerProduct({name,description,unitPrice}){
    let query=  `
        Insert Into Product(name,description,unitPrice,stock)values(?,?,?,0);
    `;
    return connection.runQuery(query,[name,description,unitPrice]);
}
function registerProductDetail({idProduct,idMaterial,amount}){
    let query=  `
        Insert Into ProductDetail(idProduct,idMaterial,amount)values(?,?,?);
    `;
    return connection.runQuery(query,[idProduct,idMaterial,amount]);
}
function updateStockProduct(stock,idProduct){
    let query=  `
        UPDATE product SET stock = ? Where idProduct = ?
    `;
    return connection.runQuery(query,[stock,idProduct]);
}
function getProductById(idProduct){
    let query=  `
    select * from product WHERE idProduct = ?;
    `;
    return connection.runQueryRow(query,[idProduct]);
}
module.exports={
    getLastId,
    verifyProduct,
    getProducts,
    getProductDetail,
    registerProduct,
    registerProductDetail,
    updateStockProduct,
    getProductById
}