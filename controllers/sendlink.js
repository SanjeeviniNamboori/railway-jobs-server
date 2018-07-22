'use strict';

let nodemailer = require('nodemailer');
let request = require('request');
let promise = require('promise');
let smtpTransport = require('nodemailer-smtp-transport');
let userName = 'lyncschoolusa@gmail.com';
let password = 'lyncschool123';
let senderid = 'RAILCO';
let high = 9999999999;
let low = 1000000000;
let messageAPI= 'Afe82221676b29fbc6f549e61738bf995';
let transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        host: 'smtp.gmail.com',
        port: 587,
        user: userName,
        pass: password
    }
}));


class SendLink{

    sendVerificationLink(req,res,pool,id){
       console.log("In send verification link") ;
        //console.log("dfabfb" + id);
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('select usercontact.contactinfo,login.actoken from usercontact inner join login on login.uid=? and usercontact.uid=? and usercontact.ctypeid=? ',[id,id,'2'],(error,result)=>{
                    if(result){
                      //  console.log("hi" + result[0].actoken);
                        //console.log("hi" + result[0].contactinfo); 192.168.1.10
//let link ="http://"+req.get('host')+"/verify/"+result[0].actoken;
//let link = "http://192.168.1.16:9000/verify/"+result[0].actoken;
                        let link = "http://localhost:9000/#!/activation/"+result[0].actoken;
   let mailOptions = {
        from : userName,
        to: result[0].contactinfo,
        subject:  "[Railway]" + " " + " Please verify your email address.",
                        html: "Help us secure your railway job account by verifying your email address" + " This lets you access all of railway job  features." +"<br/>" + "" + "<a href=" + link + ">Click here to verify </a>"
    }


   transport.sendMail(mailOptions,(error6,response6)=>{
       if(response6){
           //console.log(error6);
           console.log("mail sent successfully");
          // res.render('success');
    res.status(200).send({toState:"EmailVerificationSuccess"});
       }else{
           console.log(error6);
           res.status(400).send({message:"error"});
       }
   })
         }
                })
            }else{
                console.log(error);
                           res.status(400).send({message:"connection error"});
            }
        })
    }



    sendOtp(req,res,pool,id){
     console.log("In sendOTP")  ;
        let otp = Math.floor(Math.random() * (high - low)) + low;
        let post_user = {useruid : id, otp: otp};
        let message='OTP for Railjobs Mobile Verification is '+otp;

        return new promise((resolve,reject)=>{


        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('insert into userotp set?' ,post_user,(error1,result1)=>{
                    if(result1){
                        console.log("OTP code inserted successfully");
                        connection.query('select usercontact.contactinfo,login.actoken from usercontact inner join login on login.uid=? and  usercontact.uid=? and usercontact.ctypeid=?',[id,id,'3'],(err8,res8)=>{
                            if(res8){
                               // console.log("inside sendlink.js" + res8[0].contactinfo);
                                resolve(res8[0].contactinfo);
                                 //  res.render('enterotp',{id:id,authenticationtoken: res8[0].actoken});


                                res.status(200).send({id:id,authenticationtoken: res8[0].actoken, toState: "otpverification"});
                            }else{
                                reject(err8 );
                                res.status(400).send("error");
                            }
                        })
                      //  res.render('success');

                    }     else{
                        console.log("IN otp code" + error1);
                      //  res.render('error')
                     res.status(400).send("error");

                    }
                })
            }
        })

        }).then(function(r){
            console.log(message);
         //   res.status(200).send("success");
           // console.log("telephone" + r);

           let url='http://api-alerts.solutionsinfini.com/v4/?method=sms&api_key='+messageAPI+'&to='+r+'&sender='+senderid+'&message='+message;
      console.log(url+"SMS url");
                request.post(url,function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.status(200).send("success");
        }else{
            console.log(error);
                     res.status(400).send("error");

     }
    });



        });




    }    // end of method

} // end of class


module.exports = new SendLink();
