import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/authSlice.js';
import { apiSlice } from "./slices/apiSlice.js";
const store = configureStore({
    reducer: {
        user : userReducer,
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true,
});

export default store;