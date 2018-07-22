'use strict';


let mysql = require('mysql');
let promise = require('promise');
let randtoken = require('rand-token');


class Registration{
    
    
    registerUser(req,res,pool,data){

        var elements = [];

        data.date = new Date();
        data.randomToken = randtoken.generate(16);
        
        console.log(data)
        
var post_user = {
    username : data.userName, typeid:data.type
};   
        
     pool.getConnection((error,connection)=>{   
        return new promise((resolve,reject)=>{
        if(connection){
         connection.query('insert into user set?',post_user,(error1,result1)=>{
            if(result1){
                console.log("user data saved successfully");
                data.insertId = result1.insertId;
                connection.query('select * from contacttype',(error2,result2)=>{
                    if(result2){
                        console.log("contact type elements read successfully");
                        resolve(result2);
             }
                    }
                   );
    //res.render('verification',{id:data.insertId});
                res.status(200).send({id:data.insertId});
                }
                
            });
        }    
         })
     // end of promise
    
     
     
        .then((result2)=>{
          return new promise((resolve,reject)=>{
        var   ret = JSON.parse(JSON.stringify(result2));
             
    var count =0;
              for(var key in data){
     //   console.log("value" + key);
                  
        for(var i=0;i<ret.length;i++){
            if(key == ret[i].contacttypeinfo){             
                var contactone={ctypeid:ret[i].ctypeid,uid:data.insertId,contactinfo: data[key]}
            connection.query('insert into usercontact set? ',contactone,(error3,result3)=>{
                if(result3){
                    console.log("contact details saved");
                     count++;
                    if(count== Object.keys(contactone).length){resolve(data);} ;
                }
                
            });
                
            }
            //console.log(count+"   count");
                   
        }
        
    }            
                
          });
                

        }).then(()=>{
            var login_data ={date:data.date,uid:data.insertId,password:null,isactive:false,actoken:data.randomToken }

    connection.query('insert into login set?', login_data,(error5,result5)=>{
       if(result5) console.log("login data saved successfully");
        else console.log(error5);
    })        
            
            
        }).catch((err4)=>{
            if(err4){
              console.log(err4);
                res.status(400).send({message: "Registration failed" })
            }
              })
     })
     
     
     
     
     
    }
}

module.exports = new Registration();