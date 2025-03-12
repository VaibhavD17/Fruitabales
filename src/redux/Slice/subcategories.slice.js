import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASC_URL } from "../../utilse/bascURL";


const initialState = {
    isLoading: false,
    subcategorie: [],
    error: null
}

export const getSubcategories = createAsyncThunk(
    'subcategorie/getSubcategories',
    async () => {
        try {
            const subResponse = await fetch(BASC_URL + 'subcategory');
            const sData = await subResponse.json();

            return sData;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addSubcategories = createAsyncThunk(
    'subcategorie/addSubcategories',
    async (data) => {
        try {
            const response = await fetch(BASC_URL + 'subcategory', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const Fdata = await response.json();
            return Fdata;

        } catch (error) {
            console.log(error);
        }

    }
)

export const deleteSubcategory = createAsyncThunk(
    'subcategorie/deleteSubcategory',
    async (id) => {
        try {
            await fetch(BASC_URL + 'subcategory/' + id, {
                method: "DELETE"
            })
            return id;
        } catch (error) {
            console.log(error);
        }
    }
)

export const updateSubcategory = createAsyncThunk(
    'subcategorie/updateSubcategory',
    async (data) => {
        try {
            const response = await fetch(BASC_URL + 'subcategory/' + data.id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const Fdata = await response.json();

            return Fdata;

        } catch (error) {
            console.log(error);
        }
    }
)


const subcategorieSlice = createSlice({
    name: 'subcategorie',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getSubcategories.fulfilled, (state, action) => {
            state.subcategorie = action.payload
        })
        builder.addCase(addSubcategories.fulfilled, (state, action) => {
            state.subcategorie = state.subcategorie.concat(action.payload)
        })
        builder.addCase(deleteSubcategory.fulfilled, (state, action) => {
            state.subcategorie = state.subcategorie.filter((v) => v.id != action.payload)
        })
        builder.addCase(updateSubcategory.fulfilled, (state, action) => {
            state.subcategorie = state.subcategorie.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload;
                } else {
                    return v;
                }
            })
        })
    }
})

export default subcategorieSlice.reducer;