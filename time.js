var date = new Date();

module.exports.now = date.now;
module.exports.addDays = function(days){
    date.setDate(date.getDate() + days);
}