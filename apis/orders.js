const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.orders = (req,res)=>{
    token = req.user;
    knexcon("customer").where({email:token.email}).
    then((customerData)=>{
        knexcon.select("*").from("shopping_cart").where({cart_id:customerData[0]["customer_id"]}).
        join("product","product.product_id","shopping_cart.product_id").
        then((productData)=>{
            for(i in productData){
                productAmount = 0
                productAmount+=productData[i]["price"]*productData[i]["quantity"]
            }
            knexcon.select("shipping_cost").from("shipping").where({shipping_id:req.query.shipping_id}).
            then((shippingData)=>{
                productAmount+=shippingData[0]["shipping_cost"]
                
                knexcon.select("*").from("tax").where({tax_id:req.query.tax_id}).
                then((taxData)=>{
                    let taxPercentage =taxData[0]["tax_percentage"]
                    let totalTax = (taxPercentage * productAmount)/100
                    // console.log(totalTax)
                    productAmount+=totalTax
                    // console.log(productAmount)
                    knexcon("orders").insert([
                        {   total_amount:productAmount,
                            created_on: new Date(),
                            shipping_id:req.query.shipping_id,
                            status:1,
                            customer_id:customerData[0]["customer_id"],
                            tax_id:req.query.tax_id
                        }
                    ])
                    .then(()=>{
                        knexcon.select("*").from("orders").where({customer_id:customerData[0]["customer_id"]}).
                        then((data)=>{
                            knexcon("order_detail").insert([
                                {   order_id:data[0]["order_id"],
                                    product_id: productData[0]["product_id"],
                                    attributes:productData[0]["attributes"],
                                    product_name:productData[0]["name"],
                                    quantity:  productData[0]["quantity"],
                                    unit_cost:productData[0]["price"]
        
                                }
                            ])
                            .then(()=>{ 
                                knexcon("shopping_cart").where({cart_id:customerData[0]["customer_id"]}).
                                del().
                                then(()=>{
                                    res.send({
                                        order_id:data[0]["order_id"]
                                    })
                                })
                                .catch((err)=>{
                                    res.send(err)
                                })
                            })
                             
                        })
                        .catch((err)=>{
                            res.send(err)
                        })
                        
                    })
                    .catch((err)=>{
                        res.send(err)
                    })
                }) 
                .catch((err)=>{
                    res.send(err)
                })
            })
            .catch((err)=>{
                res.send(err)
            })
        })
        .catch((err)=>{
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.ordersById = (req,res)=>{
    token = req.user
    knexcon.select("*").from("customer").where({email:token.email}).
    then((data)=>{
        knexcon.select("*").from("order_detail").where({order_id:req.query.order_id}).
        then((data)=>{
            res.send(data);
        })
        .catch((err)=>{
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};


exports.ordersByID = (req,res)=>{
    token = req.user
    knexcon.select("*").from("customer").where({email:token.email}).
    then(()=>{
        orderData = []
        knexcon.select("*").from("orders").where({order_id:req.query.order_id}).
        then((result)=>{
            for(i in result){
                delete result[i]["comments"]
                delete result[i]["auth_code"]
                delete result[i]["reference"]
                delete result[i]["shipping_id"]
                delete result[i]["tax_id"]
                result.push(result[i])
                knexcon.select("name").from("customer").where({customer_id:result[i]["customer_id"]}).
                then((data)=>{
                    result[i]["name"]=data[0]["name"]
                    res.send(result)
                
                })
                .catch((err)=>{
                    res.send(err);
                });
            }
        })
        .catch((err)=>{
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err)
    });
};



