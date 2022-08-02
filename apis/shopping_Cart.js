const express = require("express");
const bodyParser = require("body-parser");
const knex = require('knex')
const connection = require("../knexfile")
const knexcon = knex(connection["development"])
const crypto = require('crypto');
var app = express();
app.use(express.json());
app.use(bodyParser.json());

exports.shpping_uniqueId = (req,res)=>{    
    const generateUuid = () => {
        return [4, 2, 2, 2, 6] 
            .map(group => crypto.randomBytes(group).toString('hex'))
            .join('-');
    };
    cart_id = generateUuid();
    res.send({cart_id:cart_id});
};

exports.shoppingcart_add = (req,res)=>{
    // console.log(req)
    let date = new Date()
    knexcon.select("customer_id").from("customer").
    then((result)=>{
        knexcon.select("*").from("product").where({product_id:req.query.product_id}).
        then((data)=>{
            knexcon.select("cart_id","quantity","item_id","product_id").from("shopping_cart").
            where({
                product_id:req.query.product_id,
                attributes:req.query.attributes,
                cart_id:result[0]["customer_id"]
            })
            .then((update)=>{
                if(update.length==0){
                    knexcon("shopping_cart").insert([ 
                        {
                            cart_id:result[0]["customer_id"],
                            product_id:req.query.product_id,
                            attributes:req.query.attributes,
                            quantity:1,
                            added_on:date
                        }
                    ])
                    .then(()=>{
                        res.send("inerted")
                    })
                    .catch((err)=>{
                        res.send(err)
                    });
                }
                else{
                    knexcon("shopping_cart").where({item_id:update[0]["item_id"]}).
                    update({
                        quantity:update[0]["quantity"]+1
                    })
                    .then(()=>{
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
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err);
    });
}; 

exports.shoppingcart_cartId = (req,res)=>{
    knexcon.select("*").from("shopping_cart").where({cart_id:req.params.cart_id}).
    then((result)=>{
        shoppingList = []
        for(i in result){
            delete result[i]["cart_id"] 
            delete result[i]["buy_now"]
            delete result[i]["added_on"]
            shoppingList.push(result[i])
            knexcon.select("*").from("product").
            then((data)=>{
                shoppingList[i]["product_id"] = data[0]["product_id"]
                shoppingList[i]["name"] = data[0]["name"]
                shoppingList[i]["price"]=data[0]["price"]
                shoppingList[i]["image"]=data[0]["image"]
            res.send(shoppingList)
            })
            .catch((err)=>{
                res.send(err);
            });
        }
    })
    .catch((err)=>{
        res.send(err)
    })
};

exports.shoppingcart_itemId = (req,res)=>{
    // console.log(req)
    quantity = req.query.quantity
    knexcon.select("*").from("shopping_cart").where({item_id:req.params.item_id}).
    update({quantity:quantity}).
    then((result)=>{
        elementList = []
        knexcon.select("*").from("shopping_cart").
        then((result2)=>{
            for(i in result2){
                delete result2[i]["cart_id"]
                delete result2[i]["buy_now"]
                delete result2[i]["added_on"]
                elementList.push(result2[i])
                knexcon.select("*").from("product").
                then((data)=>{
                    elementList[i]["product_id"] = data[0]["product_id"]
                    elementList[i]["name"] = data[0]["name"]
                    elementList[i]["price"]=data[0]["price"]
                    // res.send(elementList)
                    res.send(elementList)
                })
                .catch((err)=>{
                    res.send(err)
                })
            }
        })
    })
    .catch((err)=>{
        res.send(err)
    })
}

exports.shoppingcart_empty=(req,res)=>{
    knexcon.select("*").from("shopping_cart").where({cart_id:req.params.cart_id}).
    del(). 
    then(()=>{
        res.send("deleted");
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.shoppingcart_move = (req,res)=>{
    // console.log(req)
    knexcon.select("*").from("shopping_cart").where({item_id:req.params.item_id}).
    then((result)=>{
        result[0].added_on = new Date();
        knexcon("movedData").insert([
            {item_id:result[0]["item_id"],cart_id:result[0]["cart_id"],product_id:result[0]["product_id"],
            attributes:result[0]["attributes"],quantity:result[0]["quantity"],buy_now:result[0]["buy_now"]
            }
        ])
        .then(()=>{
            knexcon.select("*").from("shopping_cart").where({item_id:req.params.item_id}).
            del().
            then((data)=>{
                res.send("no data");
            });
        })
        .catch((err)=>{
            res.send(err);
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.shoppingcart_totalAmount =(req,res)=>{
    knexcon.select("*").from("shopping_cart").
    join("product","product.product_id","=","shopping_cart.product_id")
    .where({cart_id:req.params.cart_id}).
    then((result)=>{
        var amount = 0
        for(i in result){
            amount += result[i]["price"]*result[i]["quantity"]
        }
        res.send({
            totalAmount:amount
        })
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.shoppingcart_saveForLater = (req,res)=>{
    knexcon.select("item_id","cart_id","product_id","attributes","quantity").from("movedData").
    where({"movedData.item_id":req.params.item_id}).
    then((result)=>{
        result[0].added_on = new Date();
        knexcon("shopping_cart").insert([
            {item_id:result[0]["item_id"],cart_id:result[0]["cart_id"],product_id:parseInt(result[0]["product_id"]),
            attributes:result[0]["attributes"],quantity:result[0]["quantity"],buy_now:result[0]["buy_now"],
            added_on:result[0]["added_on"] = new Date()}
        ])
        .then(()=>{
            knexcon.select("*").from("movedData").where({item_id:req.params.item_id}).
            del().
            then(()=>{
                res.send("no data");
            }); 
        })
        .catch((err)=>{
            res.send(err); 
        });
    })
    .catch((err)=>{
        res.send(err);
    });
};

exports.Shopping_get_saved= (req,res)=>{
    knexcon.select("product.name","item_id","attributes","product.price").from("movedData").
    join("product","movedData.cart_id","=","product.product_id").
    where({cart_id:req.params.cart_id}).
    then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        res.send(err);
    });
};


exports.shoppingcart_removeProduct=(req,res)=>{
    knexcon.select("*").from("movedData").where({cart_id:req.params.cart_id}).
    join("product", "product.product_id","=","movedData.cart_id").
    then(()=>{
        res.send("product removed");
    })
    .catch((err)=>{
        res.send(err);
    });
};

