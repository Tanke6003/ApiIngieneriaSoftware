const productModel = require('../models/productModel');
const materialModel = require('../models/materialModel');
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
        let exist = await productModel.verifyProduct(req.body.name);
        if(!exist){
            await productModel.registerProduct(req.body);
            let register = await productModel.verifyProduct(req.body.name)
            if(register){
                for(let detailProduct of Object.values(req.body.detail)){
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
async function createProduct(req,res){
    try {
        let product = await productModel.getProductById(req.body.idProduct)
        let productDetail = await productModel.getProductDetail(product.idProduct);
        for(let detail of productDetail){
            let stockMaterial = await materialModel.getMaterials(detail.idMaterial,detail.nameMateria)
            console.log((detail.amount * req.body.quantity))
            console.log(stockMaterial[0].stock)
            if((detail.amount * req.body.quantity) > stockMaterial[0].stock)
                return res.send({status:false,detail});
            stockMaterial[0].stock = stockMaterial[0].stock -(detail.amount * req.body.quantity)
            console.log(stockMaterial[0])
            materialModel.editMaterial(stockMaterial[0]);
            product.stock += req.body.quantity
            productModel.updateStockProduct(req.body.quantity,req.body.idProduct)
            return res.send({status:true});
        }
    } catch (ex) {
        return res.status(500).send(functions.messagecatch(ex));
    } 
}

module.exports ={
    getLastId,
    getProducts,                                                                                                
    registerProduct,
    createProduct
}