'use strict';

let bcrypt = require('bcrypt');
const saltRounds = 10;


class ChangePassword {
    
    changePassword(req,res,pool){
          let oldpassword = req.body.oldPassword;
            let newpassword = req.body.newPassword;
        let sessionid = req.session.userid;
        let hash = bcrypt.hashSync(newpassword, salt);

        pool.getConnection((error,connection)=>{
          if(connection){
              connection.query('select login.password from login where uid=?'[sessionid],(err,result)=>{
                  if(result){
                      let db_pass = result[0].password;
let actual =bcrypt.compareSync(oldpassword,db_pass) ;
                      
                      if(actual ==  true){
                          
                          connection.query('update login set password=? where uid=?',[hash,sessionid],(err1,res1)=>{
                              if(res1){
                                  console.log("password changed successfully");
                              }else{
console.log("change password failed");                                }
                          })
                          
                      }else{
                        console.log("change password failed");  
                      }
                      
                    
                  }
              })
          }
            
        })
    }
    
    
}



module.exports = new ChangePassword();