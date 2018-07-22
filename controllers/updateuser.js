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
        data.gender = req.body.info.gender;
        data.fathersName = req.body.info.fathersName;
      //  data.dateOfBirth = req.body.info.dateOfBirth;
        data.presentAddress = req.body.info.presentAddress;
        data.permanentAddress = req.body.info.permanentAddress;
        data.qualification = req.body.info.qualification; 
        
      //  var insertId = req.session.userid;
        var insertId = req.uid;
     //   data.insertId = 1;
      //  console.log(" update " + JSON.stringify(req.session.userid))
        console.log("data in update user" + JSON.stringify(data));
        
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
        console.log("length ----" + Object.keys(data).length);
                  
        for(var i=0;i<ret.length;i++){
            if(key == ret[i].contacttypeinfo){             
               // var contactone={ctypeid:ret[i].ctypeid,uid:data.insertId,contactinfo: data[key]}
                
                connection.query("update usercontact SET contactinfo=? WHERE ctypeid =? and uid=?",[data[key],ret[i].ctypeid,insertId],(error3,result3)=>{
                
              //  count1++;
                
           // connection.query('insert into usercontact set? ',contactone,(error3,result3)=>{
                if(result3){
                    console.log("contact details updated successfully");
                      count++;
            if(count==Object.keys(data).length-2){
                console.log("biscuit")
               dashboard.getUserInfo(req,res,pool);
                
            }
            console.log(count+"   count");
           
                 
                }
                
            });
                
            }
                   
        }(i);
               console.log(count+"   count   2nd");
           resolve(1); 
        
        
    }               
              
              
              
              
        })
        
        })
        
        })
        
    }
    
                           
}

module.exports = new UpdateUser();