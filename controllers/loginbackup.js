'use strict';
//let randtoken = require('rand-token');
let bcrypt = require('bcrypt');

const saltRounds = 10;

class Login{
   userAuthentication(req,res,pool){
        let user_input = req.body.uname;
     //   console.log("user_input" + user_input);
        let user_password = req.body.pass;
             //   console.log("user_password" + user_password);

        //let authentication_token = randtoken.generate(16);
       let salt = bcrypt.genSaltSync(saltRounds);
let authentication_token = bcrypt.hashSync(user_input, salt);
        pool.getConnection((error,connection) =>{
            if(connection ){
            //    console.log("in connection");
             connection.query('select * from user where username=? ',[user_input],(error,res1)=>{
                 if(res1){
                  if(res1.length>0){
                  connection.query('select * from login where uid = ? ',[res1[0].uid],(err1,res2)=>{
                      if(res2) {
                       
                          if(res2[0].password == null){
                              console.log("Password is null. Authentication failed");
                              res.render('error');
                          }else{
                        var actual = bcrypt.compareSync(user_password,res2[0].password ); // false 
                              if(actual == true){
                                  req.session.userid =  res1[0].uid;
                                  req.session.authenticationtoken = authentication_token;
                                  req.session.typeid = res1[0].typeid;
                              connection.query('select * from userauth where uid=?',[res1[0].uid],(errd,resd) =>{
                                  if(resd.length>0){
                                         //  console.log("in if loop");
                                      connection.query('update userauth set authenticationtoken=? where uid=? ',[authentication_token,res1[0].uid],(errorj,resultj)=>{
                                          if(resultj) {
                                              console.log("user authentication token updated successfully");
                                          }
                                      })
                                  } else{
                                   //   console.log("in else loop");
                                     // console.log("in else" + res1[0].uid);
                                       //console.log("in else" + authentication_token);
                                      var post_user = {uid : res1[0].uid, authenticationtoken:authentication_token}; 
                                      connection.query('insert into userauth set ? ',post_user,(erru,resu)=>{
                                        if(resu)                                               
                                            console.log("user authentication token inserted successfully");
                                          else console.log("in error loop "+ erru);
 
                                      })
                                  }
                               
                              })
                              
                              console.log("user logged in successfully");
                             res.redirect('/dashboard');
                                  
                           //   }
                          }else{
                             console.log("no account exists with the credentials!!");
                              res.render('error');
                          }
                              
                          }
                      }
                  })
                  
                  }else{
                    //  console.log("in else looop");
 
                     connection.query('select * from usercontact where contactinfo=? ',[user_input],(errort,resultt)=>{
                         if(resultt.length>0){
                                                    //      console.log("in loginfile" + resultt[0].uid);

                             connection.query('select * from login inner join user on  login.uid=? and user.uid=?',[resultt[0].uid,resultt[0].uid],(err,ress)=>{
                               if(ress){
                                   
                                   if(ress[0].password == null){
                              console.log("Password is null. Authentication failed");
                              res.render('error');
                          }
                                  else {
                                   
                                   
                                   
                                   
                                   var actual = bcrypt.compareSync(user_password,ress[0].password );
                                                                 if(actual == true){

                                 //  if(user_password == ress[0].password){
                                                                     
                                        req.session.userid =  resultt[0].uid;
                                  req.session.authenticationtoken = authentication_token;
                                    req.session.typeid = ress[0].typeid;
                            // console.log("in loginfile" + ress[0].typeid);
                                       connection.query('select * from userauth where uid=?',[resultt[0].uid],(errd,resd) =>{
                                  if(resd.length>0){
                                      connection.query('update userauth set authenticationtoken=? where uid=? ',[authentication_token,resultt[0].uid],(errorj,resultj)=>{
                                          if(resultj) {
                                              console.log("user authentication token updated successfully");
                                          }
                                      })
                                  } else{
                                      var post_user = {
    uid : resultt[0].uid, authenticationtoken:authentication_token
}; 
                                      connection.query('insert into userauth set ? ',post_user,(erru,resu)=>{
                                        if(resu)                                               
                                            console.log("user authentication token inserted successfully");
 
                                      })
                                  } 
                                      })
                                       
                                                                 
                                       
                                       
                                      console.log("user logged in successfully");
                                    res.redirect('/dashboard');
                                                                 
                                                                 
                                   } else{
                                       res.render('error');
                                   }
                                  }
                               }  else {
                                   res.render('error');
                               }
                             })
                         }else{
                             console.log("no account exists with the credentials!!");
                             res.render('error');
                         }
                     })
                 }
                 
                 } 
             })
            }else{
                console.log(error);
            }
        })
    } 
}
module.exports = new Login();