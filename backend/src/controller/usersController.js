const { gnerateToken } = require('../middleware/authMiddleware');
const Users = require('../models/users');

module.exports = {
    signUp: (req, res) => {
        Users.findOne({email: {$regex: req.body.email, $options: 'i'}})
        .then((user) => {
                if(user){
                    return res.status(409).json({
                        message: 'User already existed'
                    });
                }

                Users.create(req.body).then((userInfo)=>{
                    const {userName, email, _id} = userInfo;
                    return res.status(201).json({
                        message: 'User signup successfully',
                        userName,
                        email,
                        token: gnerateToken(_id)
                    })
                }).catch((error)=>{
                    return res.status(400).json({
                        message: error.message
                    });
                });
            }
        ).catch((error)=>{
            return res.status(400).json({
                message: error.message
            });
        })
    },
    signIn: (req, res) => { 
        Users.findOne({email: {$regex: req.body.email, $options: 'i'}}).select('+password')
        .then(async(user) => {
            if(user) {
                const isMatch = await user.authenticated(req.body.password);
                if(isMatch){
                    const {userName, email, _id} = user;
                    return res.status(200).json({
                        message: 'log in successfully',
                        userName,
                        email,
                        token: gnerateToken(_id)
                    });
                } else{
                  return res.status(404).json({
                        message: 'Invalid credential!'
                    });
                }
            } else{
                return res.status(404).json({
                    message: 'User not found'
                })
            }
        }).catch((error)=>{
            return res.status(400).json({
                message: error.message
            });
        });
    }
};