const express = require("express");
const mongoose = require('mongoose');
const connectMongoDb = require("./connection");

const app = express();
const port = 3000;

//connect database
connectMongoDb('mongodb://127.0.0.1:27017/urlShoter')

app.get('/',(req,res)=>{
    res.send('home page')
})

app.listen(port, () => {
  console.log("server is running at port", port, `http://localhost:${port}`);
});
