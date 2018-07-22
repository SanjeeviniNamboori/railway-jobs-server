'use strict';


let mysql = require('mysql');
let bcrypt=  require('bcrypt');
const saltRounds = 10;

class SetPassword {
userPass(req,res,pool,id){
    console.log("in set password");
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(req.body.p1, salt);
    pool.getConnection((err1,connection)=>{
      if(connection){
          
          connection.query('select login.isactive from login WHERE actoken=?', [id],(er,rs)=>{
              if(rs[0].isactive == 0){
              
            connection.query("update login SET password=?, isactive=? WHERE actoken=?",[hash,true,id],(err,obj)=>{
                  if(obj)  {console.log("Password has been set succesfully");
                          //    res.render('success');}
                            res.send({"statuscode":200 ,tostate:"signIn"});}
                                        else
                        {console.log(err);
                          res.status(400).send("error");
                         
                                            }
       
   })
            
            
              }else{
                  res.status(400).send({"statuscode":200 ,"message":"already activated"});
              }
              
          });
            
            
            
            
    }else{
          connection.release();
          console.log("error" + err1);
      }
      }); 
}
}

module.exports =  new SetPassword();


