const jwt = require("jsonwebtoken")
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[0];
        
        // token_created = token.slice(1,197)
        token_created = token.slice(0, token.length - 0)
        // console.log(token_created)
        jwt.verify(token_created, "customer", (err, user) => {
            if (err) {
                res.status(403).send("not verified")

            }
            else {
                req.user = user;
                console.log("ok");
                next()
            };
        });
    } else {
        res.sendStatus(401);

    }
}
