import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit"
import axios from "axios";
import { BASC_URL } from "../../utilse/bascURL";


const initialState = {
    isLoading: false,
    auth: null,
    error: null
}


export const addRegistration = createAsyncThunk(
    'auth/addRegistration',
    async (data) => {
        try {
            const response = await axios.post(BASC_URL + 'auth', data)

            alert('Registration Successful')
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
)



export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (data) => {
        try {

            const response = await axios.get(BASC_URL + 'auth')

            const fData = response.data;

            const user = fData.find((v) => v.email === data.values.email && v.password === data.values.password);

            if (user) {

                data.navigate('/#')
                alert('Login Successful')
                return user;


            } else {
                return alert('Email or password does not match');
            }
        } catch (error) {
            console.log(error);

        }



    }
)
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',

    async () => {
        return null
    }

)

export const updatePassword = createAsyncThunk(
    'auth/updatePassword',

    async (data) => {
        try {
            console.log(data);

            const response = await axios.get(BASC_URL + 'auth')
            const fData = response.data;
            const userIndex = fData.findIndex((v) => v.email === data.forgotEmail);

            if (userIndex !== -1) {

                const updatedUser = {
                    ...fData[userIndex],
                    password: data.password,
                    confPassword: data.confPassword
                }

                await axios.put(`${BASC_URL}auth/${updatedUser.id}`, updatedUser);
                alert('Password updated successfully');

                return updatedUser;
            } else {
                alert('User not found');
                return null;
            }


        } catch (error) {
            console.log(error);

        }



    }

)

const AuthSlice = createSlice({

    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addRegistration.fulfilled, (state, action) => {
            state.auth = state?.auth?.concat(action.payload)
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.auth = action.payload
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.auth = action.payload
        })
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.auth = state?.auth?.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export default AuthSlice.reducer;