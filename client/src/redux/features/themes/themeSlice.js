import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme:
        localStorage.getItem('theme') ||
        (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'),
};

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            // eslint-disable-next-line no-param-reassign
            state.theme = action.payload;
            localStorage.setItem('theme', action.payload);
        },
    },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
