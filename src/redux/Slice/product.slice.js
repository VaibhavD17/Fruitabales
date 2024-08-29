import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async () => {
        try {
            const productresponse = await fetch("http://localhost:8080/product");
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
            const response = await fetch("http://localhost:8080/product", {
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
            await fetch("http://localhost:8080/product/" + id, {
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
            const response = await fetch("http://localhost:8080/product/" + data.id, {
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