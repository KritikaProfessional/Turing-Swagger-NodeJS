const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());


exports.categories = (req,res)=>{
    // console.log(req)
    knexcon.select("*").from("category").
    then((result)=>{
        if (req.query.order == undefined) {
            req.query.order = "asc"
        }
        if (req.query.page == undefined) {
            req.query.page = 1
        }
        if (req.query.limit == undefined) {
            req.query.limit = 20
        }
        knexcon.select("*").from("category").orderBy("category_id",req.query.order).offset(req.query.page).limit(req.query.limit).
        then((data)=>{
            // console.log(data)
            res.send(data)
        })
        .catch((err)=>{
            res.status(404).send(err)
        })
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.categories_id = (req,res)=>{
    // console.log(req)
    knexcon.select("*").from("category").where({category_id:req.params.category_id}).
    then((result)=>{
        // console.log(result)
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.categories_Prod_id = (req,res)=>{
    // console.log(req)
    knexcon.select("*").from("product_category").where({product_id:req.params.product_id}).
    then((result)=>{
        // console.log(result)
        knexcon.select("category_id","department_id","name").from("category").where({category_id:result[0]["category_id"]}).
        then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.categories_depart_id = (req,res)=>{
    knexcon.select("*").from("category").where({department_id:req.params.department_id}).
    then((result)=>{
        // console.log(result)
        knexcon.select("*").from("category").where({department_id:result[0]["department_id"]}).
        then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            res.send(err)
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};
