const constants = require('./constants');
function messagecatch(ex){
    console.log(ex);
    let data = {errorMessage:constants.CATCH_MESSAGE,errorData: ex,status: false};
    return data;
}
function likeString(like){
    return likeStringResult = "%" + like + "%";
}
function attributeNull(object){
    for(let attribute of Object.values(object)){
        if(attribute== "" || attribute == null)
            return true;
    }
    return false;
}
module.exports = {
    messagecatch,
    likeString,
    attributeNull
}