var mongoose = require("mongoose");


module.exports =() => {
    
    mongoose.connect(process.env.DB_Dev);
    mongoose.connection.on('connected', ()=>{
        console.log("database started running on ", process.env.DB_Dev);
    });
    
    mongoose.connection.on('closed', ()=>{
        
       console.log("connection closed"); 
    });
    
};