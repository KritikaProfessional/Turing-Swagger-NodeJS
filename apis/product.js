const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile");
const { query } = require("express");
const knexcon = knex(connection["development"])
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.products = (req,res)=>{
    knexcon.select("*").from("product").
    then((result)=>{
        if(req.query.page==undefined){
            req.query.page = 1
        }
        if(req.query.limit==undefined){
            req.query.page=20
        }
        knexcon("product").count("product_id").
        then((count)=>{
            knexcon.select("*").from("product").offset(req.query.page).limit(req.query.limit).
        then((data)=>{
            for(i in data){
                if(req.query.description_length!=undefined){
                    data[i]["description"] = data[i]["description"].slice(0,data[i]["description"].length-(data[i]["description"].length-req.query.description_length))
                }else{
                    data[i]["description"] = data[i]["description"]
                }
            }
            res.send({
                count:count[0]['count(`product_id`)'],
                raw:data
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
}

exports.product_search = (req,res)=>{
    var query = []
    var result2 = []
    knexcon.select("*").from("product").
    then((result)=>{
        
        if(req.query.page==undefined){
            req.query.page=1
        }
        if(req.query.limit==undefined){
            req.query.limit = 20
        }
        knexcon.select("*").from("product").offset(req.query.page).limit(req.query.limit).
        then((data)=>{
            if(req.query.query_string!=undefined){
                for(i in data){
                    if(req.query.query_string.includes(data[i]["description"])==true){
                        query.push(data[i])
                    }
                    else{
                        query.push(data[i])
                    }
                }
                for(j in query){
                    if(req.query.description_length!=undefined){
                        query[j]["description"] = query[j]["description"].slice(0,query[j]["description"].length-(query[j]["description"].length-req.query.description_length))+".."
                        result2.push(query[j])
                    }
                    else{
                        query[j]["description"] = query[j]["description"]
                        result2.push(query[j])
                    }
                    
                }
                res.send(result2)
            }
            else{
                res.send("query is not there")
            }
        })
        .catch((err)=>{
            res.send(err)
        })
    })
    .catch((err)=>{
        res.send(err)
    })
}


exports.product_id = (req,res)=>{
    knexcon.select("*").from("product").where({product_id:req.params.product_id}).
    then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.Product_cat_id = (req,res)=>{
        if(req.query.page==undefined){
            req.query.page = 1
        }
        if(req.query.limit==undefined){
            req.query.limit=20
        }
        knexcon("product").count("product_id").
        then((count)=>{
            console.log(req.query.page)
            knexcon.select("*").from("product_category").where({category_id:req.query.category_id}).
            
            then((result)=>{
                knexcon.select("*").from("product").offset(req.query.page).limit(req.query.limit).
                then((data)=>{
                    for(i in data){
                        if(req.query.description_length!=undefined){
                            data[i]["description"] = data[i]["description"].slice(0,data[i]["description"].length-(data[i]["description"].length-req.query.description_length))+"..."
                        }
                        else{
                            data[i]["description"] = data[i]["description"]
                        }
                    }
                    res.send({
                        count:count["count('product_id')"],
                        raw:data
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
    
}

exports.product_depar_Id = (req,res)=>{
    if(req.query.page==undefined){
        req.query.page = 1
    }
    if(req.query.limit==undefined){
        req.query.page=20
    }
    knexcon.select("*").from("product").join("product_category","product_category.product_id","=","product.product_id").
    join("category","category.category_id","=","product_category.category_id")
    .where({"department_id":req.query.department_id}).offset(req.query.page).limit(req.query.limit).
    then((result)=>{
        for(i in result){
            if(req.query.description_length!=undefined){
                result[i]["description"] = result[i]["description"].slice(0,result[i]["description"].length-(result[i]["description"].length-req.query.description_length))+"..."
            }
            else{
                result[i]["description"] = result[i]["description"]
            }
        }
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.product_id_details = (req,res)=>{
    knexcon.select("*").from("product").where({product_id:req.params.product_id}).
    then((result)=>{
        for(i in result){
            delete result[i]["thumbnail"]
            delete result[i]["display"]
        }
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.product_location = (req,res)=>{
    knexcon.select("*").from("product_category").where({product_id:req.params.product_id}).
    then((result)=>{
        knexcon.select("*").from("category").where({category_id:result[0]["category_id"]}).
        then((data)=>{
            knexcon.select("*").from("department").where({department_id:data[0]["department_id"]}).
            then((data2)=>{
                data[0]["department_name"]=data2[0]["name"]
                data[0]["department_id"]=data2[0]["department_id"]
                delete data[0]["description"]
                res.send(data)
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
};

exports.product_get_review = (req,res)=>{
    knexcon("review").select('rating', 'review', 'created_on', 'name').
    join("customer","customer.customer_id","=","review.customer_id").
    where({product_id:req.params.product_id}).
    then((result)=>{
        console.log(result)
        res.send(result);
    })
    .catch((err)=>{ 
        res.send(err);
    }); 
} 
exports.product_review = (req,res)=>{
    rev_token = req.user
    date = new Date()
    knexcon.select("customer_id").from("customer").where({email:rev_token.email}).
    then((result)=>{
        knexcon.select("*").from("review").where({"customer_id":result[0]["customer_id"],
        "product_id":req.params.product_id}).
        then((data)=>{
            if(data.length==0){
                knexcon("review").insert([
                    {   created_on:date,
                        review:req.query.review,
                        rating:req.query.rating,
                        product_id:req.query.product_id,
                        customer_id:result[0]["customer_id"]}
                ])
                .then(()=>{
                    res.send("thanks for your rating!");
                })
                .catch((err)=>{
                    res.send(err)  
                });
            }
            else{
                knexcon("review").where({"customer_id":result[0]["customer_id"],
                "product_id":req.params.product_id}).
                update({
                    "review":req.query.review,
                    "rating":req.query.rating
                }).
                then(()=>{
                    res.send("updated")
                })
                .catch((err)=>{
                    res.send(err);
                });
            };
        })
        .catch((err)=>{
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err)
    });
};

