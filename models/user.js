var Sequelize = require('sequelize');
var sequelize = new Sequelize('railways', 'root', 'root', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//exports.controller = function(sequelize){
    
  var  User= sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
   // field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
}, {
  tableName: 'user'
    // Model tableName will be the same as the model name
});
      
sequelize.sync();  
   
    
   // return User;
//}


module.exports = User;