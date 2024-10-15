import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASC_URL } from "../../utilse/bascURL"


const initialState = {
    isLoading: false,
    checkOut: [],
    error: null
}

export const getBilling = createAsyncThunk(
    'checkout/getBilling',
    async () => {
        try {
            // const response = await fetch("http://localhost:8080/checkout")
            // const data = await response.json();

            const response = await axios.get(BASC_URL + "checkout")

            const fData = response.data.filter((v) => {
                if (v.user_id === 'vaibhav') {
                    return v;
                }
            })
            return fData
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const addBilling = createAsyncThunk(
    'checkout/addBilling',
    async (data) => {
        try {
            // const response = await fetch("http://localhost:8080/checkout", {
            //     method: "POST",
            //     headers: {
            //         'Content-type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // const pdata = await response.json();

            const response = await axios.post(BASC_URL + "checkout", data)

            return response.data
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const updateBilling = createAsyncThunk (
    'checkout/updateBilling',
    async (val) => {        
        try {
          const response = await axios.put(BASC_URL + "checkout/"+`${val.id}`, val);

          console.log(response);
          
          return response.data;
        } catch (error) {
          console.log(error);
          
        }
      }
)

const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBilling.fulfilled, (state, action) => {
            state.checkOut = action.payload;
        })
        builder.addCase(addBilling.fulfilled, (state, action) => {
            state.checkOut = state.checkOut.concat(action.payload);
        })
        builder.addCase(updateBilling.fulfilled, (state, action) => {
            
            state.checkOut = state.checkOut.map((v) => {
                if (action.payload.id === v.id){
                    return action.payload
                } else {
                    return v;
                }
            })
          })
    }
})

export default CheckoutSlice.reducer;