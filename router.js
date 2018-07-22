'use strict';
let express = require('express');
let router = express.Router();
let u1 = require('./models/user');
let d = require('./controllers/dropdowns');
let v = require('./controllers/verify');
let a = require('./controllers/authentication');
let dashboard = require('./controllers/dashboard');

class Router {

   constructor(pool){
     this.router = router;
     this.init(pool);
   }


  init(pool){
     


   
      this.router.get('/',(req,res)=>{
          d.getDropDowns(req,res,pool);
      })
      
      this.router.get('/activation/:uid', (req,res)=>{
          console.log("verufy");
         let raw_url = req.url.toString().split("/");
         let mailid= raw_url[2];
         v.verifyUser(req,res,pool,mailid);
      })

      this.router.get('/login',(req,res) => {
          res.render('login');
      })
      
      this.router.get('/reg' ,(req,res)=>{
          res.render('home');
      })
      
//      this.router.get('/sample', a.isAuthenticated, (req, res) => {
//                      res.send('done')
//                      })
      
      this.router.get('/profile' ,a.isAuthenticated,(req,res) => {
          
          
         // console.log(req.params.userId);
        //  console.log("in route " +  req.params.authenticationtoken);
       //   var user_session_id = req.session.userid;
      //   console.log("u"+req.session.userid);
         // dashboard.getUserInfo(req,res,pool,user_session_id);
          dashboard.getUserInfo(req,res,pool);
      })
      
    this.router.get('/sampleone',a.isAuthenticated,(req,res)=>{
       //   console.log("in sampleone route" +  req.session.userid);
  //res.send(req.session.userid);
        
        console.log("token" +  req.token);
        
        
      })
//      
     
    this.router.get('/logout',(req,res)=>{
        req.session.destroy((err)=>{
            if(err)
            console.log("In /logout route error" + err);
            else res.redirect('/login');
        });
        
    })
      
      
      
      
  }
  
  
}

module.exports = Router;
