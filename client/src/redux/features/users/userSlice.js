import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};
export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        logout: () => initialState,
        setUser: (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.user = action.payload;
        },
    },
});
export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
