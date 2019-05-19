// Dependencies
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

var moment = require('moment');
require('moment-timezone');
moment.tz('Asia/Tokyo');

var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

// var url = "mongodb://localhost:27017/pinball";

var url = "mongodb://joemar12:joemar12@ds159156-a0.mlab.com:59156,ds159156-a1.mlab.com:59156/pinball?replicaSet=rs-ds159156";

const crypto = require('crypto');
app.set('port',5000);
var ObjectId = require('mongodb').ObjectID;


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'


app.get('/',function(request,response){
	response.sendFile(path.join(__dirname , 'index.html'));
});

app.get('/tableresult', function (request, response) {
  response.sendFile(path.join(__dirname, 'tableresult.html'));
});


app.get('/gameresult', function (request, response) {
  response.sendFile(path.join(__dirname, 'gameresult.html'));
});

app.get('/ED6D8EE518C839F807091DF11FA4F2A7D804F3AEBA3FC8B7D5A7E5A5A3B966C8', function (request, response) {
  response.sendFile(path.join(__dirname, 'admin.html'));
});


app.get('/result', function (request, response) {
  response.sendFile(path.join(__dirname, 'result.json'));
});


app.use(express.static('./'));


// server.listen(5000, function() {
//   console.log('Starting server on port 5000');
// });

server.listen(server_port , server_ip_address , function(){
    console.log('Listening on' + server_ip_address + ', port' + server_port);   
})



var resultList = [];

// L1 = -20 cheked
// L2 = -20.6 checked
// L3 = -19.2 cheked
// R3 = -20.2 checked
// R2 = -21.4 checked
// R1 = -21.2 checked

var ballForce = [-20 , -20.6 , -19.2, -20.1 , -18.7 , -21.2];

var color3Pos = [4566 , 4623, 4678];

var color2Pos = [56.8,0];

var rHorizontal_1 = [18500, 18450];

var rHorizontal_2 = [0,50];

var rHorizontal_3 = [18500,18450];

var rHorizontal_4 = [0,50];

var rHorizontal_5 = [18500, 18450];

var rHorizontal_6 = [0,50];

getresult(resultList);


function getresult(resultList) {

        var bForce = Math.floor(Math.random() * 6);
        var r3Pos = Math.floor(Math.random() * 3);
        var r2Pos = Math.floor(Math.random() * 2);
        var rH1 = Math.floor(Math.random() * 2);
        var rH2 = Math.floor(Math.random() * 2);
        var rH3 = Math.floor(Math.random() * 2);
        var rH4 = Math.floor(Math.random() * 2);
        var rH5 = Math.floor(Math.random() * 2);
        var rH6 = Math.floor(Math.random() * 2);

        resultList.bForce = bForce;
        resultList.r3Pos = r3Pos;
        resultList.r2Pos = r2Pos;
        resultList.rH1 = rH1;
        resultList.rH2 = rH2;
        resultList.rH3 = rH3;
        resultList.rH4 = rH4;
        resultList.rH5 = rH5;
        resultList.rH6 = rH6;

        return resultList;

}


setInterval(function(){


    var seconds = 60 - moment().format('ss');
    io.sockets.emit('sec',seconds);

    if (seconds == 10) {


        var roundx = moment().format('HH') * 60;
        var roundy = moment().format('mm');
        var nowdate = moment().format('YYYY-MM-DD');
        var rounds = (parseInt(roundy) + parseInt(roundx)) + 1;
        var secret_code = rounds+'pinball'+moment().format('DD-MM-YYYY');
        var hash = crypto.createHmac('sha256',secret_code).digest('hex');


        if (resultList.bForce == 0) {
            var resPos = 'L1';
        } else if (resultList.bForce == 1) {
            var resPos = 'L2';
        } else if (resultList.bForce == 2) {
            var resPos = 'L3';
        } else if (resultList.bForce == 3) {
            var resPos = 'R3';
        } else if (resultList.bForce == 4) {
            var resPos = 'R2';
        } else if(resultList.bForce == 5) {
            var resPos = 'R1';
        }


        io.sockets.emit('gameData',
            {
                'ballForce' : ballForce[resultList.bForce],
                'pospos' : resPos,
                'r3Pos' : color3Pos[resultList.r3Pos] ,
                'r2Pos' : color2Pos[resultList.r2Pos] ,
                'rh1' : rHorizontal_1[resultList.rH1] ,
                'rh2' : rHorizontal_2[resultList.rH2] ,
                'rh3' : rHorizontal_3[resultList.rH3] ,
                'rh4' : rHorizontal_4[resultList.rH4] ,
                'rh5' : rHorizontal_5[resultList.rH5] ,
                'rh6' : rHorizontal_6[resultList.rH6] ,
            }
        );

        // Logic of the results

        if (resPos == 'L1') {

            if (resultList.r3Pos == 0) {
                var res3Color = 'RED';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'GREEN';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'BLUE';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'BLACK';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'YELLOW';
            }

            if (resultList.rH1 == 0) {
                var numberRes = 1;
            } else if (resultList.rH1 == 1) {
                var numberRes = 2;
            }

        } else if (resPos == 'L2') {


            if (resultList.r3Pos == 0) {
                var res3Color = 'GREEN';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'BLUE';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'RED';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'YELLOW';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'BLACK';
            }

            if (resultList.rH2 == 0) {
                var numberRes = 3;
            } else if (resultList.rH2 == 1) {
                var numberRes = 4;
            }

        } else if (resPos == 'L3') {


            if (resultList.r3Pos == 0) {
                var res3Color = 'BLUE';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'RED';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'GREEN';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'BLACK';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'YELLOW';
            }

            if (resultList.rH3 == 0) {
                var numberRes = 5;
            } else if (resultList.rH3 == 1) {
                var numberRes = 6;
            }


        } else if (resPos == 'R3') {


            if (resultList.r3Pos == 0) {
                var res3Color = 'RED';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'GREEN';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'BLUE';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'YELLOW';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'BLACK';
            }

            if (resultList.rH4 == 0) {
                var numberRes = 7;
            } else if (resultList.rH4 == 1) {
                var numberRes = 8;
            }


        } else if (resPos == 'R2') {


            if (resultList.r3Pos == 0) {
                var res3Color = 'GREEN';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'BLUE';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'RED';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'BLACK';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'YELLOW';
            }

            if (resultList.rH5 == 0) {
                var numberRes = 9;
            } else if (resultList.rH5 == 1) {
                var numberRes = 10;
            }


        } else if (resPos == 'R1') {


            if (resultList.r3Pos == 0) {
                var res3Color = 'BLUE';
            } else if (resultList.r3Pos == 1) {
                var res3Color = 'RED';
            } else if (resultList.r3Pos == 2) {
                var res3Color = 'GREEN';
            }


            if (resultList.r2Pos == 0) {
                var res2Color = 'YELLOW';
            } else if (resultList.r2Pos == 1) {
                var res2Color = 'BLACK';
            }

            if (resultList.rH6 == 0) {
                var numberRes = 1;
            } else if (resultList.rH6 == 1) {
                var numberRes = 2;
            }

        }

        if (numberRes % 2 == 0) {
            var sniff = 'EVEN';
        } else if (numberRes % 2 != 0) {
            var sniff = 'ODD';
        }

        // End Logic of the results

            var myobj = {
                'rounds' : rounds,
                'hash' : hash ,
                'nowdate' : nowdate,
                'resPos' : resPos,
                'res3Color' : res3Color ,
                'res2Color' : res2Color ,
                'numberRes' : numberRes,
                'sniff' : sniff,
            }




            var jsonObj = {
                rounds : rounds,
                colors3 : res3Color ,
                colors2 : res2Color ,
                sniff : sniff,
            }

            var fs = require('fs');
            let data = JSON.stringify(jsonObj);


            setTimeout(function(){
                fs.writeFileSync('result.json', data);
            },10000);

        setTimeout(function(){
            io.sockets.emit('gameResPass' , {'res3Color' : res3Color , 'res2Color' : res2Color , 'numberRes' : numberRes , 'rounds' : rounds , 'sniff' : sniff});

            MongoClient.connect(url , {useNewUrlParser : true }, function(err,db) {
                if (err) throw err;
                var dbo = db.db('pinball');

                dbo.collection('game').insertOne(myobj , function(err,res){
                    if (err) throw err ;
                    console.log("ROUND "+rounds+" Has been recorded");
                    db.close();
                })
            }) // end inserting data

            setTimeout(function(){
                resultList = [];
                return getresult(resultList);
            },5000);

        },20000);



    }


    console.log(resultList)


},1000); //end setInterval function



io.on('connection',function(socket){


    socket.on('adminOps',function(data){
        console.log(data)
        console.log('RUN')

        if ( data.bForce != null) {
            resultList.bForce = data.bForce;  
        }
        
        if (data.r3Pos != null) {
             resultList.r3Pos = data.r3Pos;   
        }

        if (data.r2Pos != null) {
            resultList.r2Pos = data.r2Pos; 
        }

        if (data.rH1 != null) {
            resultList.rH1 = data.rH1;
        }

        if (data.rH2 != null) {
            resultList.rH2 = data.rH2;
        }

        if (data.rH3 != null) {
            resultList.rH3 = data.rH3;
        }

        if (data.rH4 != null) {
             resultList.rH4 = data.rH4;
        }

        if (data.rH5 != null) {
            resultList.rH5 = data.rH5;
        }

        if (data.rH6 != null) {
            resultList.rH6 = data.rH6;
        }


        return resultList;

   
    })



    socket.on('newVisitor',function(data){
        socketid = socket.id;

        MongoClient.connect(url,function(err,db){
            if (err) throw err;
            var dbo = db.db('pinball');
            var mysort = {_id : -1};
            var query = {nowdate : data.today_data_date}
            dbo.collection('game').find().limit(100).sort(mysort).toArray(function(err,result){
                io.to(socketid).emit('loadData' , result);
                db.close();
            })
        })
    }) // end socket for new Visitor



    socket.on('LoadMoreResult',function(data){
        console.log(data)
        socketid = socket.id;

        MongoClient.connect(url, { useNewUrlParser: true } ,function (err,db) {
            if (err) throw err;
            var dbo = db.db('pinball');
            var mysort = {_id : -1};
            var query = {nowdate : data.today_data_date};
            // var limitData = parseInt(data.result_limit)
            dbo.collection("game").find(query).limit(data.result_limit).sort(mysort).toArray(function(err,result){
                if (err) throw err;
                console.log(result)
                io.to(socketid).emit('loadData' , result);
                db.close();
            })
        })
    })




    socket.on('HistoryClient',function(date){
        socketid = socket.id;

        MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("pinball");
                var query = {nowdate : date};
               var mysort = { _id: -1 };
               var query = {nowdate : date.sort};
              dbo.collection("game").find(query).limit(10).sort(mysort).toArray(function(err, result) {
                    console.log(result);
                      if (err) throw err;
                      io.to(socketid).emit('loadDatahis', result);
                      db.close();
                }); 

            dbo.collection('game').find(query).count(function(err, dataCount) {
      
                  io.to(socketid).emit('pageCount', dataCount);
                  db.close();
            });         


         })
    })




    socket.on('sortbydate' , function(date){
        socketid = socket.id;
        MongoClient.connect(url,  { useNewUrlParser: true } ,function(err, db) {
          var mysort = {_id: -1 };
          var query = {nowdate : date};
          if (err) throw err;
          var dbo = db.db("pinball");
          dbo.collection("game").find(query).limit(10).sort(mysort).toArray(function(err, result) {
             io.to(socketid).emit('loadsort', result);
             
            db.close();
          });


          dbo.collection('game').find(query).count(function(err, dataCount) {
         
                  io.to(socketid).emit('pageCount', dataCount);
                  db.close();
            }); 
        });

    })



    socket.on('page_control',function(data){
        socketid = socket.id;

        MongoClient.connect(url,  { useNewUrlParser: true } ,function(err, db) {
          var mysort = {_id: -1 };
          var query = {nowdate : data.sort};
          if (err) throw err;
          var dbo = db.db("pinball");
          dbo.collection("game").find(query).skip(data.skip).limit(10).sort(mysort).toArray(function(err, result) {
             io.to(socketid).emit('getpageload', result);
            db.close();
          });

        });
    })



    socket.on('searchDatahis',function(data){
        socketid = socket.id;
        MongoClient.connect(url, function(err, db) {

          if (err) throw err;
          var dbo = db.db("pinball");
          var dbrounds = parseInt(data.roundcode);
          var dbgameid = ObjectId(data.saltcode);
          var query = { _id : dbgameid , hash : data.hashcode , rounds : dbrounds};
           // { $and : [{ hash : data.hashcode } , {rounds : data.roundcode }] };
          dbo.collection("game").find(query).toArray(function(err, result) {
            console.log(result.length)
            console.log(result)
            if (result.length > 0) {
                 io.to(socketid).emit('resdata', result);
                
            } else {
                 io.to(socketid).emit('invalid');
            }
            db.close();
          });
        });
    })

    
    socket.on('check-res',function(data){
        socketid = socket.id;
        MongoClient.connect(url, {useNewUrlParser : true}, function(err, db) {
          if (err) throw err;
          var dbo = db.db("pinball");
          console.log(data)
          var query = {hash : data};
           // { $and : [{ hash : data.hashcode } , {rounds : data.roundcode }] };
          dbo.collection("game").find(query).toArray(function(err, result) {
            console.log(result)
            io.to(socketid).emit('return-res',result);
            db.close();
          });
        });


    })





})
