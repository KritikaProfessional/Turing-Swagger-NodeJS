const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
const jwt = require("jsonwebtoken");
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.customers_put = (req,res)=>{
    token = req.user
    // console.log(token_created)
    try{
        knexcon("customer").where({email:token.email}).update(
            {
            "name":req.query.name, "email":req.query.email, "password":req.query.password, "day_phone":req.query.day_phone,         
            "eve_phone":req.query.eve_phone, "mob_phone":req.query.mob_phone
            }
        )
        .then((result)=>{
            res.send("data updated");
        })
        .catch((err)=>{
            res.send(err);
        });
    }
    catch(error){
        res.status("404").send(`invalid update ${error}`);
    };
};


exports.customers_get = (req,res)=>{
    get_token = req.user
    try{
        knexcon.select("*").from("customer").where({email:get_token.email})
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            res.send(err);
        });
    }
    catch(error){
        res.status("404").send(`invalid get ${error}`);
    };
};

exports.customers_signup = (req,res)=>{
    try{
        knexcon("customer").insert([
            {name:req.query.name,email:req.query.email,password:req.query.password}
        ])
        .then((result)=>{
            if (result.length !== 0) {
                var email = req.query.email;
                var password = req.query.password;
                var reg_token = jwt.sign({email}, "customer", {
                    expiresIn: "2h"
                });
                res.send({
                    result,
                    access_token:reg_token
                });
            } else {
                res.status(400).json({
                    message: "failed"
                });
            };
        })
        .catch((err)=>{
            res.send(err);
        });
    }
    catch(error){
        res.status("404").send(`invalid signup ${error}`);
    };
};

exports.customer_login = (req, res) => {
    knexcon.select('*').
    from('customer').where({email:req.query.email,password:req.query.password})
    .then(data => {
        console.log(data)
        if (data.length !== 0) {
            var email = req.query.email;
            var password = req.query.password;
            var log_token = jwt.sign({ email, password }, "customer", {
                expiresIn: "2h"
            });
            res.send({
                data,
                access_token:log_token
            });
        } else {
            res.status(400).json({
                message: "failed"
            });
        };
    })
    .catch((err)=>{
        res.send(err);
    });
    
};

exports.facebook_login = (req,res)=>{
    const authHeader = req.query.access_token;
    
    if(authHeader){
        const token = authHeader.split(' ')[0];
        token_created = token.slice(1, token.length - 1)
        jwt.verify(token_created,"customer",(err,user)=>{
            if(err){
                res.send("not valid")
            }
            else {
                req.user = user;
                console.log(user)
                console.log("ok")
                knexcon.select("*").from("customer").where("email",user.email).
                then((data)=>{
                    res.send({
                        data,
                        access_token:token_created,
                        expireTime:user.exp
                    });
                })
            };
        })
    }
    else{
        res.send(401)
    }
    
}

exports.customer_address = (req,res)=>{
    add_token = req.user
    console.log(add_token)
    try{
        knexcon("customer").where({email:add_token.email}).update({
            address_1:req.query.address_1,address_2:req.query.address_2,city:req.query.city,
            region:req.query.region,postal_code:req.query.postal_code,country:req.query.country,
            shipping_region_id:req.query.shipping_region_id
        })
        .then((result)=>{
           res.send("updated")
        })
        .catch((err)=>{
            res.send(err)
        });
    }
    catch(error){
        res.status("404").send(`invalid signup ${error}`);
    };
}

exports.customer_creditCard = (req,res)=>{
    cred_token = req.user
    knexcon.select("*").from("customer").where({email:cred_token.email}).update(
        {credit_card:req.query.credit_card}
    )
    .then((result)=>{ 
        res.send("updated")
    })
    .catch((err)=>{
        res.send(err) 
    })
}