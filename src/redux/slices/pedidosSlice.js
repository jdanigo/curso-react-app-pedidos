import { createSlice } from '@reduxjs/toolkit';


const pedidosSlice = createSlice({
 name: 'pedidos',
 initialState: {
    client: null,
    products: [],
    table: null,
    subtotal: 0,
    total: 0
 },
 reducers: {
    
    setClientDataAction:(state, action)=>{
        return{
            ...state,
            client: action.payload
        }
    },
    setSelectTableAction:(state, action)=>{
        return{
            ...state,
            table: action.payload
        }
    },
    setAddProductAction:(state, action)=>{
        return{
            ...state,
            products: [...state.products, action.payload.id],
            subtotal: state.subtotal + parseFloat(action.payload.price),
            total: state.total + parseFloat(action.payload.price)
        }
    }
 }
});

export const { setClientDataAction, setAddProductAction, setSelectTableAction } = pedidosSlice.actions;

export default pedidosSlice.reducer;