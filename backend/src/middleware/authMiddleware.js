const jwt = require('jsonwebtoken');

module.exports = {
    gnerateToken: (_id)=> {
        return jwt.sign({_id}, process.env.JWTSECRETKEY)
    },
    authentication: (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            if(bearerToken && bearerToken.startsWith('Bearer')){
                const token = bearerToken.split(' ')[1];
                jwt.verify(token,process.env.JWTSECRETKEY,(error, user)=>{
                    if(error) return res.status(400).json(error);
                    req.user = user;
                    next();
                })
            } else{
                return res.status(400).json({
                    message:"Authentication token not provided"
                })
            }
        } catch(error){
            return res.status(400).json(error);
        }
       
    }
}