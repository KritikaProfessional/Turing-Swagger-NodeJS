const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const knexFile = require("./knexfile");
const routes = require("./router/routers");



var app = express();
app.use(express.json());



const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title:"Turing ECommerce API",
            version:"1.0.0",
            description:"Official documentation about  Turing Ecommerce API."
        },
        servers: [
            {
              url:'http://localhost:3000', 
              description:'Development server',
            },
          ],
    },
    authAction :{ JWT: {name: "JWT", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} },

    apis:["./router/*.js"],
};


const swaggerDocument = swaggerJsdoc(swaggerOptions);
app.use('/meraki-api-data',swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.listen(8080,function(){
    console.log("running.....");
});