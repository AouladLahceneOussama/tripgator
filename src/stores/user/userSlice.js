import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    users: [
        {
            id: 1,
            username: 'admin',
            email: 'admin@gmail.com',
            password: 'admin',
            profileImage: 'https://i.pravatar.cc/300?img=12',
            job: 'Admin',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis.',
            isAdmin: true
        },
        {
            id: 2,
            username: 'user',
            email: 'user@gmail.com',
            password: 'user',
            profileImage: 'https://i.pravatar.cc/300?img=0',
            job: 'User',
            bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis. Sed ac purus sit amet nisl tincidunt tincidunt vel vitae odio. Sed id metus felis.',
            isAdmin: false
        }
    ],
    user: null,
    isLoading: false,
    isLoggedIn: false,
    loginError: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            let userExists = state.users.find(user => (user.email === action.payload.login || user.username === action.payload.login) && user.password === action.payload.password)
            if (!userExists) {
                state.loginError = 'Invalid email or password'
                return
            }

            state.user = userExists
            state.isLoggedIn = true
            state.loginError = null
        },
        registerUser: (state, action) => {
            state.user = action.payload
            state.users.push(action.payload)
            state.isLoggedIn = true
            state.loginError = null
        },
        getUser: (state, action) => {
            state.user = state.users.find(user => user.id === action.payload)
        },
        logoutUser: (state) => {
            state.user = null
            state.isLoggedIn = false
            state.loginError = null
        },
    }
})


export const { getUser, loginUser, registerUser, logoutUser } = userSlice.actions
export default userSlice.reducer