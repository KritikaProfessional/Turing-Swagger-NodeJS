const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.Get_tax = (req,res)=>{
    knexcon.select("*").from("tax").
    then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.Get_tax_byID = (req,res)=>{
    knexcon.select("*").from("tax").where({tax_id:req.params.tax_id}).
    then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};