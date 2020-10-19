const index = require('./index');
function convertToGet(queryRes){
    console.log("Controller " + queryRes)
    return queryRes
}
module.exports = { convertToGet }