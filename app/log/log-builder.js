function LogBuilder(moduleName) {
    this.moduleName = moduleName;
    this.mode = 0;
    //this.mode = 1;
}

LogBuilder.prototype.buildMessage = function buildMessage(message) {
    return new Date() + " - " +this.moduleName + " - " + message;
};

LogBuilder.prototype.info = function info(message) {
    if(this.mode) {
        console.log(this.buildMessage(message));
    }
};

LogBuilder.prototype.debug = function debug(message) {
    if(this.mode) {
        console.log(this.buildMessage(message));
    }
};

LogBuilder.prototype.error = function error(message) {
    if(this.mode) {
        console.log(this.buildMessage(message));
    }
};

module.exports = LogBuilder;