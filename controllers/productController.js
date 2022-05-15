const productModel = require('../models/productModel');
const functions = require('../functions');
async function getLastId(req,res){
    let lastId = await productModel.getLastId();
    return res.send(lastId)
}
async function getProducts(req, res) {
    try {
        let exist = await productModel.getProducts(req.body.product,functions.likeString(req.body.product));
        if (exist && exist.length){
            for(let product of Object.values(exist)){
                product.detail = await productModel.getProductDetail(product.idProduct)
            }
            return res.send({product:exist,status:true});
        }
        return res.send({errorMessage: 'no se encontro registro',status: false});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}
async function registerProduct(req, res) {
    try {
        let exist = await productModel.verifyProduct(req.body.product.name);
        if(!exist){
            await productModel.registerProduct(req.body.product);
            let register = await productModel.verifyProduct(req.body.product.name)
            if(register){
                for(let detailProduct of Object.values(req.body.product.detail)){
                    detailProduct.idProduct = register.idProduct
                    await productModel.registerProductDetail(detailProduct)
                }
                return res.send({status:true});
            }
            return res.send({status:false});
        }
        return res.send({errorMessage: 'ya existe un producto con ese nombre',status: false});
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    }
}

module.exports ={
    getLastId,
    getProducts,
    registerProduct
}