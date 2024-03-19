const express = require("express");
const bodyParser = require("body-parser");

const feerRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded())  // x-mm-form-urlencoded <form>
app.use(bodyParser.json())  // application/json

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authentication');
    next();
});

app.use("/feed", feerRoutes);

app.listen(8080);