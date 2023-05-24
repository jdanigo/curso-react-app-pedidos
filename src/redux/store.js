import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from './slices/userData';
import loadingSlice from "./slices/loadingSlice";

export default configureStore({
    reducer: {
        userData: userDataSlice,
        loading: loadingSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})