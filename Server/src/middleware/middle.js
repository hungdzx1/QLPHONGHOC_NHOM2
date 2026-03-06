const session = require("express-session")

const CheckLogin = (req, res, next) =>{
    // console.log("SESSION USER MD:", req.session.user);
    if(!req.session.user){
        return res.status(401).json(
            {
                message: "CHUA ĐĂNG NHẬP HOẶC HẾT PHIÊN ĐĂNG NHẬP, VUI LÒNG ĐĂNG NHẬP LẠI",
                stt: "0"
            })
    }
    next();
}





module.exports = {
    CheckLogin,
    
}