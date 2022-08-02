const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.GetShippingData = (req,res)=>{
    knexcon.select("*").from("shipping_region").
    then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.ShippingRegionId = (req,res)=>{
    
    knexcon.select("*").from("shipping").where({shipping_region_id:req.params.shipping_region_id}).
    then((result)=>{
        // console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};