import axiosApi from "../helpers/axios"



export const getProductList = async (body) =>{
   const res = await axiosApi.post('/product/getProductList');
   return res.data;
}
export const addProduct = async (body) =>{
   const res = await axiosApi.post('/product/addProduct',body);
   return res.data;
}
export const deleteProduct = async (_id) =>{
   const res = await axiosApi.delete(`/product/deleteProduct/${_id}`);
   return res.data;
}
export const getProductById = async (_id) =>{
   const res = await axiosApi.get(`/product/getProductById/${_id}`);
   return res.data;
}
export const updateProduct = async (body) =>{
   const res = await axiosApi.post('/product/updateProduct',body);
   return res.data;
}