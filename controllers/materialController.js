const materialModel = require('../models/materialModel');
const functions = require('../functions');
async function getLastId(req,res){
    let lastId = await materialModel.getLastId();
    return res.send(lastId)
}
async function getMaterials(req, res) {
    try {
        let exist = await materialModel.getMaterials(req.body.material,functions.likeString(req.body.material));
        if (exist && exist.length)
            return res.send({Materials:exist,status:true});
        return res.send({errorMessage: 'no se encontro registro',status: false});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}
async function registerMaterial(req,res) {
    try {
        let exist = await materialModel.verifyMaterial(req.body.name);
        if(exist)
            return res.send({errorMessage: 'Ya existe una materia prima con ese nombre',status: false});
        await materialModel.registerMaterial(req.body)
        return res.send({status:true});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}
async function editMaterial(req, res){  
    try {
        let echo = await materialModel.editMaterial(req.body);
        if(echo)
            return res.send({status:true});
        return res.send({status:false})
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));    
    }
}
module.exports={
    getLastId,
    getMaterials,
    registerMaterial,
    editMaterial
}