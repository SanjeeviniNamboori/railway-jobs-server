'use strict';
let app = require('./app.js');



class Server {
    //  let server;

    constructor() {
        this.app = app;
        this.port = process.env.PORT || 9000;
        this.init();
        //this.server = server;
        //this.dbConnect();


    }


    init() {

        this.app.listen(this.port, () => {

            console.log("App running at", this.port);
        });
    }


    //  closeServer(){
    //      this.server.close();
    //  }  


}


module.exports = new Server();
