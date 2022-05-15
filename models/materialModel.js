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
module.exports={
    getLastId,
    getMaterials,
    registerMaterial,
    verifyMaterial
}