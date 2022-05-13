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
    console.log(object)
    for(attribute in object)
        if(attribute.value == '' || attribute.value == null)
            return true;
}
module.exports = {
    messagecatch,
    likeString,
    attributeNull
}