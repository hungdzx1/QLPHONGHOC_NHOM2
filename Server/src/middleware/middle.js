const session = require("express-session")

const CheckLogin = (req, res, next) =>{
    if(!req.session.user){
        return res.redirect("/login");
    }
    next();
}





module.exports = {
    CheckLogin,
    
}