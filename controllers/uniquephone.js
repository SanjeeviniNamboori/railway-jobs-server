'use strict';

class UniquePhone{
    
    checkPhone(req,res,pool){
        let phone = req.body.phone;
        console.log("in uniquephone" + phone);
        pool.getConnection((err,connection)=>{
            if(connection){
                console.log("in connection ");
                connection.query('select usercontact.contactinfo from usercontact where contactinfo=? and ctypeid=?',[phone,'3'],(error,result)=>{
                    if(result.length>0){
                        console.log("mobile number already exists");
                        res.status(200).send({message:"mobile already exists"});
                        
                    }else{
                        console.log("mobile number doesnt exists");
                        res.status(200).send({message:"mobile number doesnt exists"});
                    }
                })
            }
        })
    }
    
}



module.exports = new UniquePhone();