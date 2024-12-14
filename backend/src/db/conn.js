const mongoose = require('mongoose');
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE


mongoose.connect(`mongodb://localhost:27017/${DATABASE}`).then(()=>{
    console.log('DataBase Connected');
}).catch((err)=>{
    console.log(err);
})



