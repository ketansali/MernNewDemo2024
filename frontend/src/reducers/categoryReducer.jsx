import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosApi from "../helpers/axios";
import Toaster from "../components/Toaster";


const initialState = {
    loading: false,
    data: [],
    error: ''
}

export const addCatgory = createAsyncThunk(
    "addCatgory",
    async (body ,{rejectWithValue}) => {
        try{
            const res = await axiosApi.post("/category/addCategory",body);
            return res.data;
        }catch(error){
            return rejectWithValue(error)
        }
    }
);

export const getCatgoryList = createAsyncThunk(
    "getCatgoryList",
    async (body,  {rejectWithValue}) => {
        try{
            const res = await axiosApi.post("/category/getCatgoryList", body);
            return res.data;
        }catch(error){
            return rejectWithValue(error) 
        }
    }
);
export const deleteCatgory = createAsyncThunk(
    "deleteCatgory",
    async (_id,  {rejectWithValue}) => {
        try{
            const res = await axiosApi.delete(`/category/deleteCatgory/${_id}`);
            return res.data;
        }catch(error){
            return rejectWithValue(error) 
        }
    }
);
export const updateCatgory = createAsyncThunk(
    "updateCatgory",
    async (body,  {rejectWithValue}) => {
        try{
            const res = await axiosApi.post(`/category/updateCatgory`, body);
            return res.data;
        }catch(error){
            return rejectWithValue(error) 
        }
    }
);

const categoryReducer = createSlice({
    name: 'category',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addCatgory.pending, (state)=>{
            state.loading = true;
        }).addCase(addCatgory.fulfilled, (state, action)=>{
            const {payload} = action;
            state.loading = false;
            Toaster({message: payload.message, type: 'success'});
        }).addCase(addCatgory.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.error = payload.message;
            Toaster({message: payload.response?.data?.message, type:'error'});
        }).addCase(getCatgoryList.pending, (state)=>{
            state.loading = true;
        }).addCase(getCatgoryList.fulfilled, (state, action)=>{
            const {payload} = action;
            state.data = payload.data;
            state.loading = false;
        }).addCase(getCatgoryList.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.error = payload.message;
            Toaster({message: payload.response?.data?.message, type:'error'});
        }).addCase(deleteCatgory.pending, (state)=>{
            state.loading = true;
        }).addCase(deleteCatgory.fulfilled, (state, action)=>{
            const {payload} = action;
            state.loading = false;
            Toaster({message: payload.message, type: 'success'});
        }).addCase(deleteCatgory.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.error = payload.message;
            Toaster({message: payload.response?.data?.message, type:'error'});
        }).addCase(updateCatgory.pending, (state)=>{
            state.loading = true;
        }).addCase(updateCatgory.fulfilled, (state, action)=>{
            const {payload} = action;
            state.loading = false;
            Toaster({message: payload.message, type: 'success'});
        }).addCase(updateCatgory.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.error = payload.message;
            Toaster({message: payload.response?.data?.message, type:'error'});
        })
    }
});

export default categoryReducer.reducer;
