const CATCH_MESSAGE = 'Algo salio mal';
const IMG_ROUTE = 'http://localhost/image/'
function messagecatch(ex){
    console.log(ex);
    let data = {errorMessage:CATCH_MESSAGE,errorData: ex,status: false};
    return data;
}
function likeString(like){
    return likeStringResult = "%" + like + "%";
}
module.exports = {
    CATCH_MESSAGE,
    IMG_ROUTE,
    messagecatch,
    likeString
}