const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.atributes = (req,res)=>{
    knexcon.select("*").from("attribute").
    then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(404).send(err)
    });
};

exports.atributes_id = (req,res)=>{
    knexcon.select("*").from("attribute").where({attribute_id:req.params.attribute_id}).
    then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.status(404).send(err)
    });
};

exports.atributes_value_id = (req,res)=>{
    knexcon.select("*").from("attribute").where({attribute_id:req.params.attribute_id}).
    then((result)=>{
        knexcon.select("attribute_value_id","value").from("attribute_value").where({attribute_id:result[0]["attribute_id"]}).
            then((result)=>{
                res.send(result)
            })
            .catch((err)=>{
                res.send(err);
            });
    })
    .catch((err)=>{
        res.status(404).send(err);
    });
};


exports.atribute_prod_id = (req,res)=>{
    
    knexcon.select("*").from("product_attribute").where({product_id:req.params.product_id}).
    then(async(result)=>{
        var data = []
        var data2 = []
        if(result.length!=0){
            for (i in result) {
                await knexcon("attribute_value").select("*").where({attribute_value_id: result[i]["attribute_value_id"]}).
                then(async(Mydata)=>{
                    data.push(Mydata)
                    for(i in data){
                        for(j in data[i]){
                           await knexcon.select("name").from("attribute").where({attribute_id:data[i][j]["attribute_id"]}).
                            then((result2)=>{
                                for(k in result2){
                                data[i][j]["attribute_name"]=result2[k]["name"]
                                }
                            })
                            .catch((err)=>{
                                res.send(err)
                            })
                        }
                    }
                })
                .catch((err)=>{
                    res.send(err)
                })
                
            }
            console.log(data)
            for(i in data){
                for(j in data[i]){
                    delete data[i][j]["attribute_id"]
                    data2.push(data[i][j])
                }
            }
            res.send(data2)
        

        }
        else{
            res.status(400).json({
        
                "code": "USR_02",
                "message": "The field example is empty.",
                "field": "example",
                "status": "500"
                    
            })
        }
    })
    .catch((err)=>{
        res.send(err)
    })
};
