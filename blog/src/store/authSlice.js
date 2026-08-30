import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    initialized: false, // becomes true after App.jsx finishes the session check
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload; // store userData directly
            state.initialized = true;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
            state.initialized = true;
        },
        setInitialized: (state) => {
            state.initialized = true;
        }
    }
})

export const { login, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;