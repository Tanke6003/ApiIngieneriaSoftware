const connection = require('../connection');
function getLastId(){
    let query=  `
    select idMaterial from material Order by idMaterial desc limit 1;
    `;
return connection.runQueryRow(query);
}
function getMaterials(id,name){
    let query=  `
    select idMaterial, name, description, stock ,available from material where idMaterial = ? or name like ?  or description like ?;
    `;
    return connection.runQuery(query,[id,name,name]);
}
function registerMaterial({name,stock,description}){
    let query =  `
        Insert Into Material(name,stock,description,available)values(?,?,?,1)
    `
    return connection.runQuery(query,[name,stock,description]);
}
function verifyMaterial(name){
    let query =  `
        select name from Material where name = ?
    `
    return connection.runQueryRow(query,[name]);
}
function editMaterial({idMaterial,name,stock,description,available}){
    let query =  `
        UPDATE Material SET name = ? ,stock = ? ,description = ?, available = ? where idMaterial = ?;
    `
    return connection.runQuery(query,[name,stock,description,available,idMaterial]);
}
module.exports={
    getLastId,
    getMaterials,
    registerMaterial,
    verifyMaterial,
    editMaterial
}