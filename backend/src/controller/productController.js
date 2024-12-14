const Product = require('../models/product');

module.exports = {
    addProduct: async (req, res) =>{
        try
        {
            req.body.createdBy = req.user._id;
            req.body.updatedBy = req.user._id;
            const productData = await Product.create(req.body);
                return res.status(201).json({
                    message: 'Product added',
                    data: productData
                });
        }catch(error){
            return res.status(400).json(error);
        }
    },
    updateProduct: async (req, res) =>{
        try
        {
            const {name, initialStock, price, category, colors, size, _id} = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(_id,{
                name,
                initialStock,
                price,
                category,
                colors,
                size,
                updatedBy: req.user._id
            },{new: true});
            return res.status(201).json({
                message: 'Product updated',
                data: updatedProduct
            });
        }catch(error){
            return res.status(400).json(error);
        }
    },
    deleteProduct: async (req, res) =>{
        try
        {
            const delProduct = await Product.findByIdAndUpdate(req.params.id,{
                isDeleted: true,
                deletedAt: Date.now() 
            });
            if(delProduct){
                return res.status(201).json({
                    message: 'Product is deleted'
                });
            } else{
                return res.status(201).json({
                    message: 'Product not deleted'
                });
            }
        }catch(error){
            return res.status(400).json(error);
        }
    },
    getProductList: async (req, res) =>{
        try
        {
            const whereCluase = {isDeleted:false};
            if(req.body.searchString){
                whereCluase.name = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.initialStock = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.price = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.category = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.colors = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.size = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.createdBy = {$regex: req.body.searchString, $options: 'i'};
                whereCluase.updatedBy = {$regex: req.body.searchString, $options: 'i'};
            }
            const page = req.body.page || 1;
            const pageSize = req.body.pageSize || 5;
            const recordSkip = (page - 1) * pageSize;
            const totalRecord = await Product.countDocuments();
            const pages = Math.ceil(totalRecord / pageSize);
            const productList = await Product.find(whereCluase).populate({
                path: 'createdBy',
                select: 'userName',
                transform: (doc) => (doc ? doc.userName : null)
            }).populate({
                path: 'updatedBy',
                select: 'userName',
                transform: doc => doc ? doc.userName : null
            }).populate({
                path: 'category',
                select: 'name',
                transform: doc => doc ? doc.name : null
            }).lean().skip(recordSkip).limit(pageSize);
            if(productList){
                return res.status(200).json({
                    totalRecord: totalRecord,
                    count: productList.length,
                    pages,
                    data: productList
                });
            } else {
                return res.status(404).json({
                    message: "Data Not Available"
                });
            }
        }catch(error){
            return res.status(400).json(error);
        }
    },
    getProductById: async (req, res) =>{
            try
            {
                const product = await Product.findById({isDeleted:false, _id: req.params.id});
                if(product){
                    return res.status(200).json({
                        data: product
                    });
                } else {
                    return res.status(404).json({
                        message: "Data Not Available"
                    });
                }
            }catch(error){
                return res.status(400).json(error);
            }
    }
}