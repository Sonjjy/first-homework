var url = require('url')
    ,_redis = require('redis')
    ,fs = require('fs')
    ,http = require('http');

var service_account = '';

//config.json 받아오기
const file = fs.readFileSync('./config/config.json', (err, data)=>{
    if(!file) {
        throw new Error("Couldn't read config file");
      }
});
const str = JSON.parse(file);

//redis접속하기. 접속안될시 다시 시도.
var redis = _redis.createClient(str.redis.PORT, str.redis.IP);

function rediserr(){
    var i = 1;
        setInterval(function() {
            if (i === 3) clearInterval(this);
            console.log(i + ' ');
            i++;
        }, 1000);
        console.log('restart redis!');
        return re;
}
var re = redis.on('connect',function(err){
            console.log('redis connected!\n');
            if(err){
                rediserr();
            }
});


exports.getRedis = function(req, res){
    res.writeHead(200, { 'Content-Type' : 'application/json' });

    //service_account parameter 받아오기
    var uri = req.url;
    var query = url.parse(uri, true).query;

    //예상치 못한 예외 처리
    process.on('uncaughtException', function(err){
        
        console.log('uncaughtException 발생 : '+ err);
    });

    
    
    //kollus API서버 URL에서 중복차단정책을 받아옴
    http.get(str.URL+'/0/media_auth/duplicate_block/policy/'+ query.service_account +'?api_key='+ str.redis.key +'&api_reference='+ str.redis.api_reference, function(res){
                
                //response body를 redis에서 받아오기
                var jk = 'dup_'+ service_account +'_policy_json'; 

                var bodyChunks = [];
                res.on('data', function(chunk) {
                   bodyChunks.push(chunk);
                        
                }).on('end', function() {
                    body = Buffer.concat(bodyChunks);
                    console.log('BODY -> ' + body);
                    
                    redis.get(jk, function(err, res){
                        return res;
                    });
                });
        });
        
         
    res.end(); 
    
};
     