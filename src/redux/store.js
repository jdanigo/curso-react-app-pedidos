import { configureStore } from "@reduxjs/toolkit";
import userDataSlice from './slices/userData';
import loadingSlice from "./slices/loadingSlice";
import pedidosSlice from "./slices/pedidosSlice";

export default configureStore({
    reducer: {
        userData: userDataSlice,
        loading: loadingSlice,
        orderData: pedidosSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
})