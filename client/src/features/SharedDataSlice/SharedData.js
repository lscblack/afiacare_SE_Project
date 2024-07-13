import { createSlice } from "@reduxjs/toolkit";
import langs from '../../languages/langauges';


// Default values for shared host
const initialState = {
    langs: langs[0]['eng'],
    usersLogin: [],
    selectedLangKey:'eng',
};

const sharedDataSlice = createSlice({
    name: 'afiaCare',
    initialState,
    reducers: {
        addUserLogin: (state, action) => {
            const users = action.payload;
            state.usersLogin = users;
        },
        changeLangSate: (state, action) => {
            const selectedLang = action.payload;
            if (selectedLang !== "") {
                state.langs = langs[0][selectedLang];
                state.selectedLangKey = selectedLang;
            }
        },
        resetStateToDefault: (state, action) => {
            // Reset state to initial values
            // Object.assign(state, initialState);
            state.usersLogin = []
        }


    }
});

export const { addUserLogin, resetStateToDefault, changeLangSate } = sharedDataSlice.actions;

export default sharedDataSlice.reducer;
