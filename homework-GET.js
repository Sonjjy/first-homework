var express = require('./config/express-config'); 
var app = express(); 

app.listen(8000); 
module.exports = app; 

console.log('Server running on 8000');

