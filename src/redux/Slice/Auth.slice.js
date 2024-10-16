import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/bascURL";

const initialState = {
    isLoading:false,
    auth:[],
    error:null
}

export const getRegistration = createAsyncThunk (
    'auth/getRegistration',
    async() =>{
        try {
            const response = await axios.get(BASC_URL + 'auth')
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addRegistration = createAsyncThunk (
    'auth/addRegistration',
    async (data) =>{
        try {
            const response = await axios.post(BASC_URL + 'auth', data)
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)

export const loginUser = createAsyncThunk (
    'auth/loginUser',
    async (data) => {
        const response = await axios.get(BASC_URL + 'auth')
        
        const fData = response.data;

        const user = fData.find((v) => v.email === data.email && v.password === data.password);

        if (user) {
            
            return user;
            
        } else {
            return alert('Email or password does not match');
        }
        
    }
)

const AuthSlice = createSlice({
    name:'auth',
    initialState,
    extraReducers:(builder) =>{
        builder.addCase(getRegistration.fulfilled, (state, action) =>{
            state.auth = action.payload
        })
        builder.addCase(addRegistration.fulfilled, (state, action) =>{
            state.auth = state.auth.concat(action.payload)
        })
    }
})

export default AuthSlice.reducer;