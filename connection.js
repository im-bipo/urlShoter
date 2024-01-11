const mongoose = require("mongoose");

const connectMongoDb = (dbUrl) => {
  mongoose.connect(dbUrl).then(()=>{
    console.log('database connected');
    
  });
};

module.exports = connectMongoDb