import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        try {
            const response = await fetch("http://localhost:8080/category")
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    })


export const addCategories = createAsyncThunk(
    'categories/addCategories',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/category", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const cdata = await response.json();

            return cdata;

        } catch (error) {
            console.log(error);
        }
    }
)

export const deleteCategories = createAsyncThunk(
    'categories/deleteCategories ',
    async (id) => {
        try {
            await fetch("http://localhost:8080/category/" + id, {
                method: "DELETE"
            });

            return id;

        } catch (error) {
            console.log(error);
        }
    }
)

export const updateCategories = createAsyncThunk(
    'categories/updateCategories ',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/category/" + data.id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const Fdata = await response.json();
            return Fdata;

        } catch (error) {
            console.log(error);
        }
    }
)

const categorieSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload
        })
        builder.addCase(addCategories.fulfilled, (state, action) => {
            state.categories = state.categories.concat(action.payload)
        })
        builder.addCase(deleteCategories.fulfilled, (state, action) => {
            state.categories = state.categories.filter((v) => v.id != action.payload)
        })
        builder.addCase(updateCategories.fulfilled, (state, action) => {
            state.categories = state.categories.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export default categorieSlice.reducer;