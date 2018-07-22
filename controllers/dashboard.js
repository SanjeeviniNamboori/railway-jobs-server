'use strict';

let promise = require('promise');


class Dashboard {

    //getUserInfo(req,res,pool,sess_id,authentication_token){
    getUserInfo(req,res,pool){
      var data ={};
      //  var sess_id= req.session.userid;
    //    var authentication_token = req.session.authenticationtoken;
        
        var sess_id =  req.uid;
        var authentication_token = req.token;
        
        
      //  console.log("authentication token" + authentication_token);
          pool.getConnection((error,connection)=>{
                     return new promise((resolve,reject)=>{

    if(connection){
          connection.query('select * from contacttype ',(error,result)=>{
             //console.log(JSON.stringify(result));
                     connection.query('select * from user inner join usercontact on user.uid =? and usercontact.uid=?',[sess_id,sess_id],(err1,res1)=>{

                          if(res1.length>0){
                                //console.log(res1);
                                 for(let i=0; i<res1.length;i++){

                                        data.userId= res1[i].uid;
                                        data.userName = res1[i].username;
                                        data.typeid = res1[i].typeid;
                                      //  data.authentication_token = authentication_token;
                                            for(let k=0; k<result.length;k++){
//  console.log("in second for loop"+ result[k].ctypeid);
//  console.log("in second for loop" +  res1[i].contactinfo);
                                                if(result[k].ctypeid == res1[i].ctypeid){
  //data.contactinfoname = result[k].contacttypeinfo;
  //data.contactinfonamevalue = res1[i].contactinfo;
                                                data[result[k].contacttypeinfo] = res1[i].contactinfo;

  }
}

//res.render('dashboard',{data:data});
}
   
                              resolve(data);
                              
//console.log("data" + JSON.stringify(data));
//                              res.status(200).send({data:data,state:"dashboard"});


    }else{
                console.log(err1);
              // res.render('login',{error:"wrong username/password"}) ;
              //  res.redirect('/login');
        res.status(200).send({error:"wrong username/password"});
            }
        })

})

    }
              
              
          }).then(function(data){
                      //   console.log("in then function");
                     console.log("datadasboard" + JSON.stringify(data));
                              res.status(200).send({userDetails:data});

    
                     })

})

    }
}


module.exports = new Dashboard();
