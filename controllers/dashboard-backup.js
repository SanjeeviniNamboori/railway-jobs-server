'use strict';



class Dashboard {
    
    getUserInfo(req,res,pool,sess_id){
pool.getConnection((error,connection)=>{
    if(connection){
        connection.query('select * from user where uid=?',[sess_id],(err1,res1)=>{
            if(res1.length ==1) {
              //  console.log("result" + res1[0].username);
              // res.redirect('/dashboard')
               res.render('dashboard',{username:res1[0].username});
              // res.send(res1[0].username);
                
            }else{
                console.log(err1);
              // res.render('login',{error:"wrong username/password"}) ;
                res.redirect('/login');
            }
        })
    }
    
})
        
    }
}


module.exports = new Dashboard();