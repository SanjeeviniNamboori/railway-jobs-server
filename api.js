'use strict';
let express = require('express');
let router = express.Router();
let promise = require('promise');
let register = require('./controllers/registration');
let setpass = require('./controllers/setpassword');
let sendLink = require('./controllers/sendlink');
let login = require('./controllers/login');
let imageUpload = require('./controllers/profileimage');
let uniqeUsername = require('./controllers/uniqueusername');
let uniqueEmail = require('./controllers/uniqueemail');
let uniquePhone = require('./controllers/uniquephone');
let verifyotp = require('./controllers/verifyotp');
let changePassword = require('./controllers/changepassword');
let profileImage = require('./controllers/profileimageform');
let updateUser = require('./controllers/updateuser');
let a = require('./controllers/authentication');

class Api {

   constructor(pool){
     this.router = router;
     this.init(pool);
   }


  init(pool,session){
     
      
this.router.post('/reg',(req,res)=>{
//console.log(req.body);
    var data={};
    if(req.body.user == 'job Seeker'){
        //console.log("Biscuit Coming")
        data.fullName = req.body.info.fullName;
        data.userName = req.body.info.userName;
        data.mobile = req.body.info.mobile;
        data.email = req.body.info.email;
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
        //added fields
        data.gender = req.body.info.gender;
        data.fathersName= req.body.info.fathersName;
        data.dateOfBirth = req.body.info.dataOfBirth;
        data.presentAddress = req.body.info.presentAddress;
        data.permanentAddress = req.body.info.permanentAddress;
        data.qualification = req.body.info.qualification;  
        
        register.registerUser(req,res,pool,data);}
    else if(req.body.user=='recruiter'){
        
        data.fullName = req.body.info.fullName;
        data.userName = req.body.info.userName;
        data.mobile = req.body.info.mobile;
        data.email = req.body.info.email;
        data.type= 2;
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
        
        register.registerUser(req,res,pool,data);
        
    }
});      

      
this.router.post('/setpassword/:id',(req,res)=>{
     var raw_url = req.url.toString().split("/");
    var lastparamid  = raw_url[2];
 
  setpass.userPass(req,res,pool,lastparamid);  
    
})        
 

this.router.post('/sendlink/:id',(req,res)=>{
    console.log("in send link ");
          var raw_url = req.url.toString().split("/");
          var token = raw_url[2];
 if(req.body.optradio == 1){
sendLink.sendVerificationLink(req,res,pool,raw_url[2]);     
 } else if(req.body.optradio == 0){
     sendLink.sendOtp(req,res,pool,raw_url[2]);
 }
    
    
      })


this.router.post('/login' ,(req,res) =>{
    login.userAuthentication(req,res,pool);
})

this.router.post('/profilepic' , (req,res) => {
   imageUpload.setProfileImage(req,res,pool) ;
    
    
    
})


  this.router.post('/checkusername',(req,res)=>{
          uniqeUsername.checkUsername(req,res,pool);
      })
      
      this.router.post('/checkemail',(req,res)=>{
         uniqueEmail.checkEmail(req,res,pool); 
      })

this.router.post('/checkphone',(req,res)=>{
    uniquePhone.checkPhone(req,res,pool);
})

this.router.post('/verifyotp/:id',(req,res)=>{

    console.log(" in verifyotp" + req.params.id);
    let id = req.params.id;
 
    verifyotp.verifyUserOtp(req,res,pool,id);
})


this.router.post('/changepassword',(req,res)=>{
    changePassword.changePassword(req,res,pool);
})

this.router.post('/profileimage',(req,res)=>{
    profileImage.setProfileImage(req,res,pool);
})



this.router.post('/updateprofile',a.isAuthenticated,(req,res)=>{
    updateUser.updateUser(req,res,pool);
})
      
  }
    
    
}

module.exports =  Api;
