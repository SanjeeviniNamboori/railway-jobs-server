'use strict';

class UniqueUsername{
    
    
    checkUsername(req,res,pool){
        let username = req.body.username;
        console.log("in uniquename" + username);
        pool.getConnection((err,connection) =>{
            if(connection){
                console.log("in connection");
                connection.query('select user.username from user where username =? ', [username],(error,result)=>{
                    if(result.length>0){
                    //res.send("user already exists");
                      console.log("user already exists");  res.status(200).send({message:"user already exists"});
                }else{
                    //res.send("user doesn't exists");
                     console.log("user doesn't exists");
                    res.status(200).send({message: "user doesn't exists"});
                }
                               })
            }
        })
    }
    
    
}



module.exports = new UniqueUsername();