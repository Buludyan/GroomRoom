import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { authService } from "../axios/service/authService";

const initialState = {
    user: {},
    isAuth: false,
    isLoading: false,
}

export const login = createAsyncThunk(
    'authentication/login',
    async function (data, { dispatch }) {
        try {
            const response = await authService.login(data);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const registration = createAsyncThunk(
    'authentication/registration',
    async function (data, { dispatch }) {
        try {
            const response = await authService.registration(data);
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const logout = createAsyncThunk(
    'authentication/logout',
    async function (_, { dispatch }) {
        try {
            const response = await authService.logout();
            console.log(response)
            localStorage.removeItem('token');
            dispatch(setAuth(false));
            dispatch(setUser({}));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    'authentication/check',
    async function (_, { dispatch }) {
        try {
            const response = await axios.get(`http://68.183.7.78:6060/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', response.data.accessToken);
            dispatch(setAuth(true));
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.isAuth = action.payload;
        },
    }
})



export const { setUser, setAuth } = authSlice.actions;

export const authState = (state) => state.authentication;