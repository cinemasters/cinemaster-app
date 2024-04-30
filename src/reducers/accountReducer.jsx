import {createReducer} from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    userData: null
};

const accountReducer = createReducer(initialState, (builder) => {
    builder.addCase("LOGIN", (state, action) => {
        state['isAuthenticated'] = true;
        state['userData'] = action.payload;
    })
        .addCase("LOGOUT", () => {
            return initialState;
        })
});

export default accountReducer;