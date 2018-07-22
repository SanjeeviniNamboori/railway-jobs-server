'use strict';

let nodemailer = require('nodemailer');
let smtpTransport = require('nodemailer-smtp-transport');
var randomNumber = require("random-number");
let userName = 'lyncschoolusa@gmail.com';
let password = 'lyncschool123';
let request = require('request');
let transport = nodemailer.createTransport(smtpTransport({
    service: 'Gmail',
    auth: {
        host: 'smtp.gmail.com',
        port: 587,
        user: userName,
        pass: password
    }
}));
var options = {
  min:  333333,
  max:  999999
, integer: true
}
class SendLink{
    
    sendVerificationLink(req,res,pool,id){
      // console.log("In send verification link") ;
        //console.log("dfabfb" + id);
        pool.getConnection((error,connection)=>{
            if(connection){
                connection.query('select usercontact.contactinfo,login.actoken from usercontact inner join login on login.uid=? and usercontact.uid=? and usercontact.ctypeid=? ',[id,id,'2'],(error,result)=>{
                    if(result){
                      //  console.log("hi" + result[0].actoken);
                        //console.log("hi" + result[0].contactinfo);
                          let link ="http://"+req.get('host')+"/verify/"+result[0].actoken;
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
           res.render('success');
       }else{
           console.log(error6);
       }
   })
                    }
                })
            }else{
                console.log(error);
            }
        })
    }
    
    
    
    sendOtp(req,res,pool,id){
     var a = {useruid:id,otp: randomNumber(options)};
        var mobilenumber ;
      //console.log("In sendOTP")  ;
        //console.log("id" + id);
        pool.getConnection((error,connection) => {
            if(connection){
            //    console.log("In connection");
                connection.query('select contactinfo from usercontact WHERE uid=? and ctypeid=?',[id,'3'],(erro,resulto)=>{
                    if(resulto) {
                        mobilenumber = resulto[0].mobile;
                        console.log("mobilenumbeer" + mobilenumber);
                        connection.query('insert into userotp set?',a,(err1,result1)=>{
                            if(result1){ console.log("otp values saved successfully");
                                       res.render('enterotp',{id:id});}
                            else{
                                           console.log(err1);
                                       }
                        })
                     
    console.log(erro);
                        
   /*    request.post('http://api-alerts.solutionsinfini.com/v4/',{method:'sms.json',api_key:'messageAPI', 
                    json: {
                    'sender': senderid,
                    'message': 'Welcome to Rail otp : '+a.otp,
                    'unicode': '1',
                    "flash": 0,
                    "dlrurl": "Delivery URL",
                    "sms":[
                        {
                        "to": mobilenumber
                        }
                        ]
                }},function(error6,response6,body){
           
           if(response6) {
               console.log(response6);
               console.log("OTP has been sent successfully");
           }else{
               console.log(error6);
           }
           
       }
                    });
                        
                        
          
           
       
          */
                        
                        
                        
                        
                        
                        
}
                })
            }else{
                console.log(error);
            }
        })
    }
    
}


module.exports = new SendLink();