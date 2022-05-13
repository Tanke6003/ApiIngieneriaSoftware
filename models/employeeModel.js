const connection = require('../connection');
function verifyRfc( rfc){
    let query=  `
    select name from Employee where rfc = ?
    `;
return connection.runQueryRow(query,[rfc]);
}
function registerEmployee({name,rfc,position,birthday,phone,salary}){
    let query =  `
        Insert Into Employee(name,rfc,position,birthday,phone,salary,status)values(?,?,?,?,?,?,1)
    `
    return connection.runQuery(query,[name,rfc,position,birthday,phone,salary]);
}
function getEmployees(id,name){
    let query =  `
    select idEmployee,name,rfc,position,birthday,phone,salary,status from Employee where idEmployee = ? or name like ?  or rfc like ?
    `
return connection.runQuery(query,[id,name,name]);
}
function editEmployee({name,rfc,position,phone,salary,status,idEmployee}){
    let query =  `
        UPDATE Employee SET name = ? ,rfc = ? ,position = ?, phone = ?,salary = ?,status = ? where idEmployee = ?;
    `
    return connection.runQuery(query,[name,rfc,position,phone,salary,status,idEmployee]);
}
module.exports={
    verifyRfc,
    registerEmployee,
    getEmployees,
    editEmployee
}