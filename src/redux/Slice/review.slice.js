import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASC_URL } from "../../utilse/bascURL";


const initialState = {
    isLoading: false,
    review: [],
    error: false
}

export const getReview = createAsyncThunk(
    'review/getReview',
    async () => {
        try {
            const response = await fetch(BASC_URL + 'review')
            const fData = await response.json();

            console.log("fdatttttttttttttttttttttt", fData);
            

            return fData;

        } catch (error) {
            console.log(error);
        }
    }
)

export const addReview = createAsyncThunk(
    'review/addReview',
    async (data) => {
        try {
            const response = await fetch(BASC_URL + 'review', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const fData = await response.json();

            return fData;


        } catch (error) {
            console.log(error);
        }
    }
)

export const updateReview = createAsyncThunk(
    'review/updateReview',
    async (data) => {

        if (data.status === 'panding') {
            try {
                const response = await fetch(BASC_URL + 'review/' + data.id, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, "status": "Active" })
                })

                const fData = await response.json();

                return fData;


            } catch (error) {
                console.log(error);

            }
        } else if (data.status === 'Active') {
            try {
                const response = await fetch(BASC_URL + 'review/' + data.id, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify({ ...data, "status": "panding" })
                })

                const fData = await response.json();

                return fData;


            } catch (error) {
                console.log(error);

            }
        }

    }
)

export const deleteReview = createAsyncThunk(
    'review/deleteReview',
    async (id) => {
        try {
            await fetch("http://localhost:8080/review/" + id, {
                method: "DELETE"
            })
            return id;
        } catch (error) {
            console.log(error);

        }
    }
)

export const editReview = createAsyncThunk(
    'review/editReview',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/review/" + data.id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            const fData = await response.json();

            return fData;


        } catch (error) {
            console.log(error);
        }


    }
)

const reviewSlice = createSlice({
    name: "review",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getReview.fulfilled, (state, action) => {
            state.review = action.payload
        })
        builder.addCase(addReview.fulfilled, (state, action) => {
            state.review = state.review.concat(action.payload);
        })
        builder.addCase(updateReview.fulfilled, (state, action) => {
            state.review = state.review.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            });
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.review = state.review.filter((v) => v.id != action.payload);
        })
        builder.addCase(editReview.fulfilled, (state, action) => {
            state.review = state.review.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            });
        })
    }
})

export default reviewSlice.reducer;

