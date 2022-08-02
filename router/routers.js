const express = require('express');
const depapis = require("../apis/department");
const catapis = require("../apis/category");
const atribute = require("../apis/atributes");
const product = require("../apis/product");
const Customer = require("../apis/customers");
const order = require("../apis/orders");
const shopping = require("../apis/shopping_Cart");
const tax = require("../apis/tax");
const shipping = require("../apis/shipping");
const router = new express.Router();
const auth = require("../authorise/auth_token");

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get Department.
 *     description: Return a department by ID.I.
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
router.get('/department',depapis.department);

/**
 * @swagger
 * /departments/{department_id}:
 *   get:
 *     summary: Get Department by Id.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/departments/:department_id',depapis.departments_id);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get departments
 *     description: Return a list of department..
 *     parameters:
 *       - in: query
 *         name: order
 *         required: false
 *         description: Sorting a field. Allowed fields 'category_id', 'name'.
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Inform the page. Starting with 1. Default 1.
 *         schema:
 *           type: integer 
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit per page, Default 20.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
*/
router.get('/categories',catapis.categories);

/**
 * @swagger
 * /categories/{category_id}:
 *   get:
 *     summary: Get categorie bu Id.
 *     description: Return a categorie by ID.I.
 *     parameters:
 *       - in: path
 *         name: category_id
 *         required: true
 *         description: ID of categorie.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
 router.get('/categories/:category_id',catapis.categories_id);

/**
 * @swagger
 * /categories/inProduct/{product_id}:
 *   get:
 *     summary: Get product by Id.
 *     description: Return a product by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of Product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/categories/inProduct/:product_id',catapis.categories_Prod_id);

/**
 * @swagger
 * /categories/inDepartment/{department_id}:
 *   get:
 *     summary: Get Categories of a Department.
 *     description: Return a list of categories from a Department ID.
 *     parameters:
 *       - in: path
 *         name: department_id
 *         required: true
 *         description: ID of Product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
 router.get('/categories/inDepartment/:department_id',catapis.categories_depart_id);

/**
 * @swagger
 * /atributes:
 *   get:
 *     summary: Get Attribute list.
 *     description: Return a department by ID.I.
 *     responses:
 *       200:
 *         ...
 */
router.get('/atributes',atribute.atributes);

/**
 * @swagger
 * /atributes/{attribute_id}:
 *   get:
 *     summary: Get Department by Id.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: attribute_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
 router.get('/atributes/:attribute_id',atribute.atributes_id);

/**
 * @swagger
 * /atributes/values/{attribute_id}:
 *   get:
 *     summary: Get Department by Id.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: attribute_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/atributes/values/:attribute_id',atribute.atributes_value_id);

/**
 * @swagger
 * /atributes/inProduct/{product_id}:
 *   get:
 *     summary: Get Department by Id.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/atributes/inProduct/:product_id',atribute.atribute_prod_id);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get All Products
 *     description: Return a list of products.
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Inform the page. Starting with 1. Default 1.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit per page, Default 20..
 *         schema:
 *           type: integer 
 *       - in: query
 *         name: description_length
 *         required: false
 *         description: limit of description, Default 200.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         ...
*/
router.get('/products',product.products);

/**
 * @swagger
 * /products/search:
 *   get:
 *     summary: Search products
 *     description: Return a list of products.
 *     parameters:
 *       - in: query
 *         name: query_string
 *         required: false
 *         description: Query to search.
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: Inform the page. Starting with 1. Default 1
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit per page, Default 20..
 *         schema:
 *           type: integer 
 *       - in: query
 *         name: description_length
 *         required: false
 *         description: limit of description, Default 200.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         ...
*/
router.get('/products/search',product.product_search);

/**
 * @swagger
 * /products/{product_id}:
 *   get:
 *     summary: Product by ID.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/products/:product_id',product.product_id);

/**
 * @swagger
 * /products/inCategory/{category_id}:
 *   get:
 *     summary: Get All Products
 *     description: Return a list of products.
 *     parameters:
 *       - in: query
 *         name: category_id
 *         required: false
 *         description: category_id - Category ID.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: Inform the page. Starting with 1.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit per page
 *         schema:
 *           type: integer 
 *       - in: query
 *         name: description_length
 *         required: false
 *         description: limit of description.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         ...
*/
router.get('/products/inCategory/:department_id',product.Product_cat_id);

/**
 * @swagger
 * /products/inDepartment/{department_id}:
 *   get:
 *     summary: Get All Products
 *     description: Return a list of products.
 *     parameters:
 *       - in: query
 *         name: department_id
 *         required: false
 *         description: department_id - Department ID.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: Inform the page. Starting with 1.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Limit per page
 *         schema:
 *           type: integer 
 *       - in: query
 *         name: description_length
 *         required: false
 *         description: limit of description.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         ...
*/
router.get('/products/inDepartment/:department_id',product.product_depar_Id);

/**
 * @swagger
 * /products/{product_id}/details:
 *   get:
 *     summary: Product by ID.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
router.get('/products/:product_id/details',product.product_id_details);

/**
 * @swagger
 * /products/{product_id}/location:
 *   get:
 *     summary: Get locations of a Product.
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of department.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         ...
 */
 router.get('/products/:product_id/location',product.product_location);

/**
 * @swagger
 * /products/{product_id}/reviews:
 *   get:
 *     summary: Get reviews of a Product.
 *     description: Return a product by ID.I.
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         description: ID of product.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */            
 router.get('/products/:product_id/reviews',product.product_get_review);

/**
 * @swagger
 * /products/{product_id}/reviews:
 *   post:
 *     summary: .
 *     description: Return a department by ID.I.
 *     parameters:
 *       - in: query
 *         name: product_id
 *         required: true
 *         description: Product ID.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: review
 *         required: true
 *         description: Review Text of Product.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: rating
 *         required: true
 *         description: Rating of Product.
 *         schema:
 *           type: integer
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
 router.post('/products/:product_id/review',auth,product.product_review);



/**
 * @swagger
 * /customer:
 *   put:
 *     summary: Get customer .
 *     description: putting data a customers.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: name-Customer name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: email-Customer email.
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: false
 *         description: password-Customer password.
 *         schema:
 *           type: string
 *       - in: query
 *         name: day_phone
 *         required: false
 *         description: day_phone-Customer day phone.
 *         schema:
 *           type: string
 *       - in: query
 *         name: eve_phone
 *         required: false
 *         description: eve_phone-Customer eve phone.
 *         schema:
 *           type: string
 *       - in: query
 *         name: mob_phone
 *         required: false
 *         description: mob_phone-Customer mob phone.
 *         schema:
 *           type: string
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
 router.put('/customer',auth,Customer.customers_put);

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Get customer .
 *     description: Return a customer by ID.I.
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
router.get('/customer',auth,Customer.customers_get);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Register a Customer
 *     description: Record a customer.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: name- user name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: email- user email.
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: false
 *         description: password- user password.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */
router.post('/customers',Customer.customers_signup);

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Sign in in the Shopping.
 *     description: Customer Login.
 *     parameters:
 *       - in: query
 *         name: email
 *         required: false
 *         description: email- Email of user.
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         required: false
 *         description: password- Password of user .
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */
router.post('/customers/login',Customer.customer_login);

/**
 * @swagger
 * /customers/facebook:
 *   post:
 *     summary: Sign in with a facebook login token.
 *     description: Customer Login with Facebook.
 *     parameters:
 *       - in: query
 *         name: access_token 
 *         required: false
 *         description: Token generated from your facebook login.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */
router.post('/customers/facebook',Customer.facebook_login);

/**
 * @swagger
 * /customer/address:
 *   put:
 *     summary: Update the address from customer.
 *     description: putting data a customers.
 *     parameters:
 *       - in: query
 *         name: address_1
 *         required: false
 *         description: address_1-Address 1.
 *         schema:
 *           type: string
 *       - in: query
 *         name: address_2
 *         required: false
 *         description: address_2-Address 2.
 *         schema:
 *           type: string
 *       - in: query
 *         name: city
 *         required: false
 *         description: city-City.
 *         schema:
 *           type: string
 *       - in: query
 *         name: region
 *         required: false
 *         description: region-Region.
 *         schema:
 *           type: string
 *       - in: query
 *         name: postal_code
 *         required: false
 *         description: postal_code-Postal Code.
 *         schema:
 *           type: string
 *       - in: query
 *         name: country
 *         required: false
 *         description: country-Country.
 *         schema:
 *           type: string
 *       - in: query
 *         name: shipping_region_id
 *         required: false
 *         description: shipping_region_id-Shipping Region ID.
 *         schema:
 *           type: integer
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */ 
 router.put('/customer/address',auth,Customer.customer_address);

/**
 * @swagger
 * /customer/creditCard:
 *   put:
 *     summary: Update the address from customer.
 *     description: putting data a customers..
 *     parameters:
 *       - in: query
 *         name: credit_card
 *         required: false
 *         description: address_1-Address 1.
 *         schema:
 *           type: string
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */
router.put('/customer/creditCard',auth,Customer.customer_creditCard);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a Order.
 *     description: 
 *     parameters:
 *       - in: query
 *         name: cart_id
 *         required: false
 *         description: Cart ID.. 
 *         schema:
 *           type: string
 *       - in: query
 *         name: shipping_id
 *         required: false
 *         description: Shipping Id. 
 *         schema:
 *           type: integer
 *       - in: query
 *         name: tax_id
 *         required: false
 *         description: Tax Id. 
 *         schema:
 *           type: integer
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */ 
 router.post('/orders',auth,order.orders)

/**
 * @swagger
 * /orders/{order_id}:
 *   get:
 *     summary: Create a Order.
 *     description: 
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: false
 *         description: Order ID.
 *         schema:
 *           type: string
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */ 
 router.get('/orders/:order_id',auth,order.ordersById)

// /**
//  * @swagger
//  * /orders/inCustomer:
//  *   get:
//  *     summary: order in customer.
//  *     description: 
//  *     security:
//  *       - authentication: []
//  *     responses:
//  *       200:
//  *         description: Success
//  *         schema:
//  *           # a pointer to a definition
//  *           $ref: "#/definitions/HelloWorldResponse"
//  *         # responses may fall through to errors
//  *       400:
//  *         description: Access token is missing or invalid
//  *         schema:
//  *            $ref: "#/definitions/ErrorResponse"
//  * securityDefinitions:
//  *   authentication:
//  *     type: apiKey
//  *     name: Authorization
//  *     in: header
//  */ 
//  router.get('/orders/inCustomer',auth,order.orderInCustomer);


/**
 * @swagger
 * /orders/shortDetail/{order_id}:
 *   get:
 *     summary: Get Info about Order.
 *     description: 
 *     parameters:
 *       - in: query
 *         name: order_id
 *         required: false
 *         description: Order ID.. 
 *         schema:
 *           type: string
 *     security:
 *       - authentication: []
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Access token is missing or invalid
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 * securityDefinitions:
 *   authentication:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 */ 
 router.get('/orders/shortDetail/:order_id',auth,order.ordersByID);


/**
 * @swagger
 * /shppingcart/genrateUniqueId:
 *   get:
 *     summary: Generete the unique CART ID.
 *     description: .
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/shppingcart/genrateUniqueId',shopping.shpping_uniqueId);

/**
 * @swagger
 * /shoppingcart/add:
 *   post:
 *     summary: Add a Product in the cart
 *     description: put a product in the cart
 *     parameters:
 *       - in: query
 *         name: cart_id
 *         required: false
 *         description: Cart ID.
 *         schema:
 *           type: string
 *       - in: query
 *         name: product_id
 *         required: false
 *         description: Product ID.
 *         schema:
 *           type: string
 *       - in: query
 *         name: attributes
 *         required: false
 *         description: Attributes of Product.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 */
 router.post('/shoppingcart/add',shopping.shoppingcart_add);

/**
 * @swagger
 * /shppingcart/{cart_id}:
 *   get:
 *     summary: Get List of Products in Shopping Cart.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: false
 *         description: Cart ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/shppingcart/:cart_id',shopping.shoppingcart_cartId);

 /**
 * @swagger
 * /shppingcart/{item_id}:
 *   put:
 *     summary: Update the cart by item.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: false
 *         description: Item ID.. 
 *         schema:
 *           type: string
 *       - in: query
 *         name: quantity
 *         required: false
 *         description: Item Quantity. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
  router.put('/shppingcart/:item_id',shopping.shoppingcart_itemId);

/**
 * @swagger
 * /shppingcart/empty/{cart_id}:
 *   delete:
 *     summary: Empty cart.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: false
 *         description: Cart ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.delete('/shppingcart/empty/:cart_id',shopping.shoppingcart_empty);

/**
 * @swagger
 * /shoppingcart/moveToCart/{item_id}:
 *   get:
 *     summary: Move a product to cart.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: false
 *         description: Item ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/shoppingcart/moveToCart/:item_id',shopping.shoppingcart_move);

/**
 * @swagger
 * /shoppingcart/totalAmount/{cart_id}:
 *   get:
 *     summary: Return a total Amount from Car.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: false
 *         description: Cart ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/shoppingcart/totalAmount/:cart_id',shopping.shoppingcart_totalAmount);

/**
 * @swagger
 * /shoppingcart/saveForLater/{item_id}:
 *   get:
 *     summary: Save a Product for latter.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: false
 *         description: Item ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition 
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *          
 */
 router.get('/shoppingcart/saveForLater/:item_id',shopping.shoppingcart_saveForLater);

/**
 * @swagger
 * /shoppingcart/getSaved/{cart_id}:
 *   get:
 *     summary: Get Products saved for latter.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: cart_id
 *         required: false
 *         description: Cart ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/shoppingcart/getSaved/:cart_id',shopping.Shopping_get_saved);

/**
 * @swagger
 * /shoppingcart/removeProduct/{item_id}:
 *   delete:
 *     summary: Remove a product in the cart.
 *     description: 
 *     parameters:
 *       - in: path
 *         name: item_id
 *         required: false
 *         description: item ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.delete('/shoppingcart/removeProduct/:item_id',shopping.shoppingcart_removeProduct);

 /**
 * @swagger
 * /tax:
 *   get:
 *     summary: Get all tax.
 *     description: Return a list of tax.
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
router.get('/tax',tax.Get_tax);

/**
 * @swagger
 * /tax/{tax_id}:
 *   get:
 *     summary: Get all tax.
 *     description: Return a list of tax.
 *     parameters:
 *       - in: path
 *         name: tax_id
 *         required: false
 *         description: tax ID. 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
 router.get('/tax/:tax_id',tax.Get_tax_byID);

 /**
 * @swagger
 * /shipping/regions:
 *   get:
 *     summary: Return shippings regions.
 *     description: 
 *     responses:
 *       200:
 *        description: Success
 *        schema:
 *           # a pointer to a definition
 *           $ref: "#/definitions/HelloWorldResponse"
 *         # responses may fall through to errors
 *       400:
 *         description: Error
 *         schema:
 *            $ref: "#/definitions/ErrorResponse"
 *         
 */
  router.get('/shipping/regions',shipping.GetShippingData);

  /**
   * @swagger
   * /shipping/regions/{shipping_region_id}:
   *   get:
   *     summary: Return shippings regions.
   *     description:
   *     parameters:
   *       - in: path
   *         name: shipping_region_id
   *         required: false
   *         description: Shipping_Region_ID. 
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *        description: Success
   *        schema:
   *           # a pointer to a definition
   *           $ref: "#/definitions/HelloWorldResponse"
   *         # responses may fall through to errors
   *       400:
   *         description: Error
   *         schema:
   *            $ref: "#/definitions/ErrorResponse"
   *         
   */
   router.get('/shipping/regions/:shipping_region_id',shipping.ShippingRegionId);

module.exports = router;

