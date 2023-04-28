import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    notification: [],
};
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => ({ ...state, user: action.payload }),
        setNotification: (state, action) => ({ ...state, notification: action.payload }),
    },
});
export const { logout, setUser, setNotification } = userSlice.actions;
export default userSlice.reducer;
