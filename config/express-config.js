var express = require('express'); 

module.exports = function() {
     var app = express();
     require('../router/server.route.js')(app);
     return app; 
} 


