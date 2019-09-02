'use strict';

const express = require('express');
const methodOverride = require('method-override') ;

const app = express() ;

app.use(express.json()) ;
app.use(methodOverride())

const router = require("./routes/routes.js")(express) ;
app.use("/api/v1",router) ;

app.use(logErrors) ;
app.use(errorHandler) ;

app.listen(80, () => {
    console.log("App Running");
});

function logErrors(err, req, res, next) {
    console.error(err);
    next(err);
}
  
  function errorHandler(err, req, res, next) {
    res.status(err.statusCode || 500);
    res.send({ error: err.message });
}