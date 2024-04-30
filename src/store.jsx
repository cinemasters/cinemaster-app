import {configureStore} from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer.jsx";

const store = configureStore({
    reducer: {
        account: accountReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export default store;