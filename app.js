let express = require('express');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let Router = require('./router.js');
let Api = require('./api.js');
let app = express();
let fs = require('fs');
let mysql = require('mysql');
let session = require('express-session');
let cookieParser = require('cookie-parser')
let fileUpload = require('express-fileupload');
let cors = require('cors');
app.use(cookieParser())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


app.use(cors());



app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});


/*let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'railways'
});


*/
let pool = mysql.createPool({
connectionLimit : 100,
    host     : '104.197.7.27',
    user     : 'root',
    password : 'root',
    database : 'railways',
    debug    :  false
});

class App {

constructor(){
this.root = '/../../';
this.app= app;
//this.config();
this.templates();
this.middlewares();
this.routes();
//this.mongoConnect();
//this.dbConnect();

   }

//config(){
//
//  this.app.use(passport.initialize());
//
// this.app.use(passport.session());
//   this.app.use(flash());
//
//}

templates(){

         this.app.engine('html', ejs.renderFile);
         this.app.set('view engine', 'html');
         this.app.use(express.static('views'));
     }


middlewares(){
  this.app.use(bodyParser.json());
  this.app.use(bodyParser.urlencoded({ extended: true }));

}


routes(){
let router;
let api;
//let userroutes;
//let contact;
//router = new Router(sequelize).router;
    router = new Router(pool).router;
api = new Api(pool,session).router;
//userroutes = new UserRoutes().router;
//contact = new ContactRoutes().router;
//this.app.use(contact);
//this.app.use(userroutes);
this.app.use(router);
this.app.use(api);
}


/*dbConnect(){

 connection.connect(function(err){
     if(!err) console.log("connected to database");
     else console.log(err);
 })   ;

    }

 */

/*modelsConfig(){
    fs.readdir('/Users/sanjeevini/Documents/sequel/models/',function(err,files){
    if(err){
        console.log(err);
    }
    files.forEach(function(name){
        if(name.substr(-3) == '.js'){
           route = require('/Users/sanjeevini/Documents/sequel/models/'+name);
            route.controller(sequelize);
        }
    });
});
}
*/






}
module.exports = new App().app;
