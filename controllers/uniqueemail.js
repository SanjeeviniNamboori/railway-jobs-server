'use strict';

class UniqueEmail{
    
    
    checkEmail(req,res,pool){
        let email = req.body.email;
        console.log("in uniqueemail " +email);
        pool.getConnection((err,connection)=>{
            if(connection){
                console.log("in connection");
                connection.query('select usercontact.contactinfo from usercontact where contactinfo=? and ctypeid=?',[email,'2'],(error,result)=>{
                    if(result.length>0){
                       // res.send("email already exists");
                         console.log("email already exists");
                        res.status(200).send({message: "email already exists"});
                    }else{
                        //res.send("email doesn't exists");
                        console.log("email doesn't exists");
                        res.status(200).send({message: "email doesn't exists"});
                    }
                })
            }
        })
    }
    
}

module.exports = new UniqueEmail();