require('dotenv').config();
require('./db/conn');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');



app.use(cors())
app.use(express.json());
// routes
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);



app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);  
});