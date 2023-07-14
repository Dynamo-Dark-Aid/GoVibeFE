import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Alert } from 'react-native';

export const login = createAsyncThunk('auth/login', async (userData) => {
    try {
        const response = await axios.post("https://govibeapi.onrender.com/login", userData)
        const { authorization } = response.headers;
        const { name } = response.data.status.data.user;
        return { authorization, name }
    } catch (err) {
        console.log("We had an issue with your request", err)
        Alert.alert("Try again");
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userToken: null,
        isLoggedIn: false,
        userName: "",
    },
    reducers: {
        logout(state, action) {
          state.userToken = null;
          state.isLoggedIn = false;
          state.userName = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            // console.log("action.payload", action.payload.data.status)
            state.userToken = action.payload.authorization;
            state.isLoggedIn = true;
            state.userName = action.payload.name;
        })
    },
    
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;