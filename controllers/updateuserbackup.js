'use strict';
let promise = require('promise');
let dashboard = require('./dashboard.js');


class UpdateUser{
    
    updateUser(req,res,pool){
            var data={};

        
 data.fullName = req.body.info.fullName;
        //console.log(data)
      //  data.userName = req.body.info.userName;
        data.mobile = req.body.info.mobile;
      //  data.email = req.body.info.email;
        data.type= 1;
        data.homeTown = req.body.info.homeTown;
        data.areaOfInterest = req.body.info.areaOfInterest;
        data.personalYearsOfExperience = req.body.info.personalYearsOfExperience;
        data.maritalStatus = req.body.info.maritalStatus;
        data.nationality =  req.body.info.nationality;
        data.languagesKnown =  req.body.info.languagesKnown;
        data.location =  req.body.info.location;
        data.professionalYearsOfExperience = req.body.info.professionalYearsOfExperience;
        data.jobRole = req.body.info.jobRole;
        data.department =  req.body.info.department;
        data.reasonOfLeavingJob =  req.body.info.reasonOfLeavingJob;
     /* data.gender = req.body.info.gender;
        data.fathersName = req.body.info.fathersName;
        data.dateOfBirth = req.body.info.dataOfBirth;
        data.presentAddress = req.body.info.presentAddress;
        data.permanentAddress = req.body.info.permanentAddress;
        data.qualification = req.body.info.qualification; 
        */
        data.insertId = req.session.userid;
     //   data.insertId = 1;
        
       // console.log("data" + JSON.stringify(data));
        
        pool.getConnection((error,connection)=>{
        return new promise((resolve,reject)=>{

            if(connection){
              //  console.log("in connection");
                connection.query('select * from contacttype',(error1,result1)=>{
                    if(result1){console.log("contact type elements read successfully");
                               resolve(result1);
                               }
                })
            }
            
        }).then((result1)=>{
           // console.log("in then function");
          return new promise((resolve,reject)=>{
             var   ret = JSON.parse(JSON.stringify(result1));
            //  console.log("json" +  ret);
             var count =0;
             //  var count1 =0;
           for(var key in data){
       // console.log("value" + key);
                  
        for(var i=0;i<ret.length;i++){
            if(key == ret[i].contacttypeinfo){             
               // var contactone={ctypeid:ret[i].ctypeid,uid:data.insertId,contactinfo: data[key]}
                
                connection.query("update usercontact SET contactinfo=? WHERE ctypeid =? and uid=?",[data[key],ret[i].ctypeid,data.insertId],(error3,result3)=>{
                
              //  count1++;
                
           // connection.query('insert into usercontact set? ',contactone,(error3,result3)=>{
                if(result3){
                    console.log("contact details updated successfully");
                     count++;
                  //  if(count == count1 )  {resolve(data);} ;
                   // if(count== Object.keys(contactone).length){resolve(data);} ;
                  /*  if(count >0) {//resolve(data);
                             dashboard.getUserInfo(req,res,pool);    }else{
                        console.log(error3);
                    }   */
                }
                
            });
                
            }
            //console.log(count+"   count");
                   
        }
           resolve(1); 
               
           /*    if(count== 13){
                   console.log("something "+ ret.length + "count" + count);
           resolve(1);    
               }
               
               
                if(count== 12){
                    console.log("hi");
                   console.log("something "+ ret.length + "count" + count);
           resolve(1);    
               }   */
             //  dashboard.getUserInfo(req,res,pool); 
        
    }               
              
              
              
              
        })
        
        }).then(function(){
              console.log("in then func");
              dashboard.getUserInfo(req,res,pool); 
    
          })
        
        })
        
    }
    
                           
}

module.exports = new UpdateUser();