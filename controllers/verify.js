'use strict';


let mysql = require('mysql');
let promise = require('promise');



class Verify{
    
    verifyUser(req,res,pool,mailid){
      console.log("In verify");
        
    /*    pool.getConnection((err,connection)=>{
        
        if(connection){
        
connection.query("update login SET isactive=? WHERE actoken=?", [true,mailid],function(error,object){
    if(object) {
        console.log("isactive field succesfully updated");
       // res.render('setpassword',{id:mailid});
        res.status(200).send({id:mailid});
    }else{
        console.log(error);
        res.status(400).send("error");
    }
    
})
   
        }else{
            
            
            connection.release();
            console.log("db error" +  err);
        }


        });   */
         res.status(200).send({id:mailid});  
        
        
    }
    
    
    
    
    
}


module.exports = new Verify();