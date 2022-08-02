const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());


exports.department = (req,res)=>{
    knexcon.select("*").from("department").
    then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};


exports.departments_id = (req,res)=>{
    knexcon.select("*").from("department").where({department_id:req.params.department_id}).
    then((result)=>{
        // console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};