import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteSuccess: (state) => {
            state.currentUser = null;
        },
    },
});

export const { signInSuccess, updateSuccess, deleteSuccess } = userSlice.actions;

export default userSlice.reducer;
