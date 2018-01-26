module.exports = function(app) {
    var index = require('../controller/mysql.server.controller'); 
    var index2 = require('../controller/redis.server.controller'); 
    app.get('/transcoding_file', index.getMysql);
    app.get('', index2.getRedis);
} 



