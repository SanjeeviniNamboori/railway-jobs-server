'use strict';

class VerifyOtp{
    
    verifyUserOtp(req,res,pool,id){
       // console.log(" in verifyotp" +  id);
        //here id is activation token
        let user_otp = req.body.otp;
        let userid = req.body.secretid;
        //console.log("user_otp" + user_otp);
        pool.getConnection((err,connection)=>{
            if(connection){
                console.log("in connection");
                connection.query('select login.actoken, userotp.otp from login inner join userotp on login.uid=? and userotp.useruid=?',[userid,userid],(err,result)=>{
                    if(result){
                        console.log(result);
                        if((result[0].otp == user_otp) && (result[0].actoken == id) ){
                          //  res.render('setpassword',{id:id});
            res.status(200).send({id:id,tostate:"otpactivation"});
                        }else{
                           // res.render(error);
            res.status(400).send("error");
                        }
                    }
                })
            }
        })
        
    }
    
}


module.exports = new VerifyOtp();