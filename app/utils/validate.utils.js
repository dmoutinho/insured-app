module.exports.CONST = {
    REQUIRED : "_REQUIRED",
    MIN : "_MIN",
    MAX : "_MAX",
    MIN_MAX : "_MIN_MAX",
    EMAIL_FORMAT : "_EMAIL_FORMAT" 
};

function toArray(validateReturn) {
    let erros = [];
    for(let field in validateReturn) {
        erros = erros.concat(validateReturn[field]);
    }
    return erros;
}

module.exports.concatMessages = function(validateReturn) {
    let messageArray = toArray(validateReturn);
    messageArray.forEach(function(message, index) {
        this[index] = message.toUpperCase().split(" ").join("");
    }, messageArray);
    return messageArray;
};