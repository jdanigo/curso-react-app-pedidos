import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setSignIn } from '../../redux/slices/userData';

const PrivateRoute = ({children}) => {
    const dispatch = useDispatch();
    
    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            dispatch(setSignIn({token:token}))
        }
    },[children])
    
    const auth = useSelector((state)=>state.userData.isAuth);
    const location = useLocation();
        return(
            auth ? children : <Navigate to="/login" state={{from: location}}/>
    )
}
export default PrivateRoute;