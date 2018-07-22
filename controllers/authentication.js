'use strict';


let mysql = require('mysql');
let pool = mysql.createPool({
connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'railways',
    debug    :  false    
});



class Authentication{
    
    isAuthenticated(req,res,next){
        console.log("in authentication");
        console.log("dfsf" + JSON.stringify(req.headers));
         req.token = req.headers["authorization"];
        console.log("authorization" + req.token);
        req.uid = req.headers["userid"];
        console.log("uid" + req.uid);
      //  var uid = req.query.uid;
     //   var token = req.query.token;
      //  var uid = req.session.userid;
        //var token = req.session.authenticationtoken;
        pool.getConnection((err,connection)=>{
            if(connection){
                console.log("got connected");
                connection.query('select * from userauth where uid=? and authenticationtoken =?', [req.uid, req.token] ,(err,result)=>{
                    if(result[0]==null) {
                        //console.log(result[0])
                        //console.log(token)
                        res.status(400);
                     //   res.redirect('/login');
                    }else{
                      console.log("Authentication Success");
                      //  console.log(result[0])
                        //console.log(token)
                        next();
                        
                    }
                })

            }else{
                        res.status(400);
            }
        })
    }
    
  
    
}


module.exports = new Authentication();