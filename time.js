var date = new Date();

module.exports.obj = date;
module.exports.addDays = function(days){
    date.setDate(date.getDate() + parseInt(days));
}