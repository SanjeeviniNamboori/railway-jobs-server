'use strict';






class DropDown{
    
    getDropDowns(request,response,pool){
        var elements = [];
      
        pool.getConnection((err,connection)=>{
            if(err) {connection.release();}else{
connection.query('select * from usertype', function(error, object){
    
    if(object) {

        for(var i=0; i<object.length;i++){
     
            
            elements.push({typeid:object[i].typeid, type: object[i].type});
        }
        //console.log(elements);
      // response.render('home',{elements: elements}); 
       // response.json(elements);
        response.status(200).send({elements});
        
    }else{
        console.log(error);
    }
    
    
})  ;      
        
            }
            
        });
        
        
    }
    
    
    
}


module.exports = new DropDown();