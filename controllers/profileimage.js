'use strict';

let fs = require('fs');
let path = require('path');

class ProfileImage {
    
setProfileImage (req,res,pool){
   console.log("helloworld");
  //  console.log(req.files.profileimage);
    let uid = req.body.uid;
        console.log("helo"+ req.body.uid);

    let profileimage = req.body.profileimage;
    console.log("hello " +  req.body.profileimage);
  //  console.log(req.session.userid);
   // let uid = req.params.uid;
    //console.log("uid" + uid);
    //let profileimage = req.params.profileimage;
    //console.log("profileimage " + profileimage);
  // let binary =  req.body.binary;
    //let session_id = req.session.userid;
/* fs.readFile(req.files.profileimage, (err,data)=>{        if(err){console.log(err);}
        else{
            console.log(data);
            console.log(req.files.profileimage.name);
    }
    
    });  */
    
    pool.getConnection((error,connection)=>{
        if(connection){
            connection.query("select profileimage.uid from profileimage  WHERE uid=?",[uid],(err1,res1)=>{
                if(res1>0){
                    connection.query("update profileimage set profileimage=? WHERE uid=?",[profileimage,uid],(err2,res2)=>{
                        if(res2>0) {
                            console.log("userprofile image updated successfully ");
                 // let insertid = res2.insertId;
                   //         console.log("insert id " +  insertid);
                     res.status(200).send("success");       
                            
                            
                        }else{
                            console.log(err2);
                            res.status(400).send("success"); 
                        }
                    })
                }   else{
                    connection.query("insert into profileimage set ?",{uid:uid,profileimage:profileimage},(err3,res3)=>{
                        if(res3>0){
                            console.log("user profile image inserted successfully");
                    res.status(200).send("success");       

                        }else{
                            console.log(err3);
                    res.status(400).send("success");       

                        }
                    })
                }
            })
        }
    })
    
    

}
    
    
    
    
}



module.exports = new ProfileImage();
