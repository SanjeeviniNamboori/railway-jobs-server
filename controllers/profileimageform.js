'use strict';

let fs = require('fs');
let path = require('path');

class ProfileImage {
    
setProfileImage (req,res,pool){
   console.log("helloworld");
    let uid = req.body.uid;
        console.log("helo"+ req.body.uid);
fs.readFile(req.files.profileimage,(err,data)=>{
    if(data){
        console.log(data);
        
    }else{
        console.log(err);
    }
})
    
    
    
}

}

module.exports = new ProfileImage();
