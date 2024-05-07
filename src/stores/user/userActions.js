import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../constants/api";

export const login = createAsyncThunk(
    'user/login',
    async (user) => {
        const response = await axios.post(`${API_URL}/login`, user)
        return response.data
    }
)

export const register = createAsyncThunk(
    'user/register',
    async (user) => {
        const response = await axios.post(`${API_URL}/register`, user)
        return response.data
    }
)

export const getUser = createAsyncThunk(
    'user/getUser',
    async (id) => {
        const response = await axios.get(`${API_URL}/user/${id}`)
        return response.data
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    async () => {
        const response = await axios.post(`${API_URL}/logout`)
        return response.data
    }
)