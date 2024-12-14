const Category = require('../models/category');

module.exports = {
    addCatgory: async (req, res) =>{
        try
        {
            req.body.createdBy = req.user._id;
            req.body.updatedBy = req.user._id;
            const categoryData = await Category.create(req.body);
                return res.status(201).json({
                    message: 'Category added',
                    data: categoryData
                });
        }catch(error){
            return res.status(400).json(error);
        }
    },
    updateCatgory: async (req, res) =>{
        try
        {
            const updatedCategory = await Category.findByIdAndUpdate(req.body._id,{
                name: req.body.name,
                updatedBy: req.user._id
            },{new: true});
            return res.status(201).json({
                message: 'Category updated',
                data: updatedCategory
            });
        }catch(error){
            return res.status(400).json(error);
        }
    },
    deleteCatgory: async (req, res) =>{
        try
        {
            const delCategory = await Category.findByIdAndUpdate(req.params.id,{
                isDeleted: true,
                deletedAt: Date.now() 
            });
            if(delCategory){
                return res.status(201).json({
                    message: 'Category is deleted'
                });
            } else{
                return res.status(201).json({
                    message: 'Category not deleted'
                });
            }
        }catch(error){
            return res.status(400).json(error);
        }
    },
    getCatgoryList: async (req, res) =>{
        try
        {
            const whereCluase = {isDeleted:false};
            if(req.body.name) whereCluase.name = {$regex: req.body.name, $options: "i"};
            const page = req.body.page || 1;
            const pageSize = req.body.pageSize || 5;
            const recordSkip = (page - 1) *  pageSize;
            const totalRecord = await Category.countDocuments();
            const pages = Math.ceil(totalRecord / pageSize)
            

            const categoryList = await Category.find(whereCluase).populate({
                path: 'createdBy',
                select: 'userName',
                transform: (doc) => (doc ? doc.userName : null)
            }).populate({
                path: 'updatedBy',
                select: 'userName',
                transform: doc => doc ? doc.userName : null
            }).lean().skip(recordSkip).limit(pageSize);
            if(categoryList){
                return res.status(200).json({
                    totalRecord: totalRecord,
                    count: categoryList.length,
                    pages,
                    data: categoryList
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
    getCatgoryById: async (req, res) =>{
            try
            {
                const category = await Category.findById({isDeleted:false, _id: req.params.id});
                if(category){
                    return res.status(200).json({
                        data: category
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