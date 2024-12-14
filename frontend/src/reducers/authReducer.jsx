import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axiosApi from '../helpers/axios';
import Toaster from '../components/Toaster';
const initialState = {
    token: "",
    loading: false,
    error: ""
};

export const signUp = createAsyncThunk(
    "signup",
    async (body, {rejectWithValue}) => {
        try {
            const res = await axiosApi.post("/user/signup", body);
            return res.data;
        } catch(error) {
            return rejectWithValue(error)
        }
    }
); 

export const signIn = createAsyncThunk(
    "signin",
    async (body,{rejectWithValue}) =>{
        try{
            const res = await axiosApi.post("/user/signin", body);
            return res.data
        }catch(error){
            return rejectWithValue(error);
        }
    }
);



const authReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        addAuthToken: (state) =>{
           state.authToken = localStorage.getItem('authToken');
        },
        removeAuthToken: (state) =>{
            state.authToken = "";
            localStorage.removeItem('authToken');
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(signUp.pending, (state)=>{
            state.loading = true;
        })
        .addCase(signUp.fulfilled, (state, action)=>{
            const {payload} = action;
            state.loading = false;
            localStorage.setItem('authToken', payload.token);
            state.token = payload.token;
            Toaster({message: payload.message, type:'success'});
        })
        .addCase(signUp.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.error = payload.message;
            state.token = "";
            Toaster({message: payload.response?.data?.message, type:'error'});
            
        }).addCase(signIn.pending,(state)=>{
            state.loading = true;
        }).addCase(signIn.fulfilled, (state, action)=>{
            const {payload} = action;
            state.loading = false;
            localStorage.setItem('authToken', payload.token);
            state.token = payload.token;
            Toaster({message: payload.message, type:'success'});
        }).addCase(signIn.rejected, (state, action)=>{
            const {payload} = action;
            state.loading = false; 
            state.token = "";
            Toaster({message: payload.response?.data?.message, type:'error'});
        })
    }
});
export const { addAuthToken, removeAuthToken} = authReducer.actions
export default authReducer.reducer;