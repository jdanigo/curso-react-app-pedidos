import { createSlice } from '@reduxjs/toolkit';


const userDataSlice = createSlice({
 name: 'userData',
 initialState: {
    token: null,
    isAuth: false,
    email: null,
    name: null
 },
 reducers: {
    setSignIn:(state, action)=>{
        localStorage.setItem("token", action.payload.token);
        return{
            ...state,
            token: action.payload.token,
            isAuth: true,
            email: action.payload.email,
            name:  action.payload.name
        }
    },
    setLogout:(state, action)=>{
        localStorage.clear();
        return{
            ...state,
            isAuth: false
        }
    }
 }
});

export const { setSignIn, setLogout} = userDataSlice.actions;

export default userDataSlice.reducer;