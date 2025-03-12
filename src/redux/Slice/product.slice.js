import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASC_URL } from "../../utilse/bascURL";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async () => {
        try {
            const productresponse = await fetch(BASC_URL+ 'product');
            const Pdata = await productresponse.json();

            return Pdata;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addProduct = createAsyncThunk(
    'product/addProduct',
    async (data) => {
        try {
            const response = await fetch(BASC_URL + 'product', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const Pdata = await response.json();

            return Pdata;

        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (id) => {
        try {
            await fetch(BASC_URL + 'product/'+ id, {
                method: "DELETE"
            })

            return id;

        } catch (error) {
            console.log(error);
        }
    }

)

export const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async (data) => {
        try {
            const response = await fetch(BASC_URL + 'product/' + data.id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const Pdata = await response.json();

            return Pdata;

        } catch (error) {
            console.log(error);
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.products = action.payload;
        })
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload)
        })
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((v) => v.id != action.payload)
        })
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.products = state.products.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })

    }
})

export default productSlice.reducer