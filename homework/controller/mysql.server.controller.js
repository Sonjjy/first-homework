var url = require('url')
    ,fs = require('fs')
    ,mysql = require('mysql')


//config.json 받아오기
var file = fs.readFileSync('./config/config.json', (err)=>{
    if(err) {
        throw new Error("Couldn't read config file");
    }
    console.log('open config file.\n');

});
const str = JSON.parse(file);

//mysql 연결 설정.
var client = mysql.createConnection({
    host : str.mysql.IP,
    port : str.mysql.PORT,
    user : str.mysql.id,
    password : str.mysql.pw,
    database : str.mysql.database   
});

client.on('connect', function(err){
    console.log('mysql connected!\n');
            if(err){
                console.log(err);
            }
});

exports.getMysql = function(req, res){    
    res.writeHead(200, { 'Content-Type' : 'application/json' });

    console.log('media_content_key : ' + req.query.media_content_key + "\n");

    //예상치 못한 예외 처리
    process.on('uncaughtException', function(err){
        
        console.log('uncaughtException 발생 : '+ err);
    });
    
    var sqlQuery_one = str.mysql.sqlQuery_one + req.query.media_content_key + "'";
    var sqlQuery_two = str.mysql.sqlQuery_two + req.query.media_content_key + "'";
                    
    function callback1(err, rows, fields){
        if(err){ throw err;}    
        else{
             console.log(JSON.stringify(rows, null, 2));
        }
    }

    function callback2(err, rows, fields){
        if(err){ throw err;}    
        else{
            console.log("    \"transcoding_files\" : " + JSON.stringify(rows, null, 10));
        }
    }


    client.query(sqlQuery_one, callback1);
    client.query(sqlQuery_two, callback2);
    //console.log(client);
    
    //다시 불러오면 err
    client.end();
     
    res.end();

};     