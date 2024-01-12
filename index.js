const express = require("express");
const path = require('path')

const connectMongoDb = require("./connection");
const urlRouter = require("./routers/url");
const pageRouter = require("./routers/pageRoutes");

const app = express();
const port = 8000;

//connect database
connectMongoDb('mongodb://127.0.0.1:27017/urlShoter')

//middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

//view engine 
app.set('view engine','ejs')
app.set('views', path.resolve('./views'))

//routes
app.use('/',pageRouter)
app.use('/url',urlRouter)

app.listen(port, () => {
  console.log("server is running at port", port, `http://localhost:${port}`);
});
