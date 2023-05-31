import React from 'react';
import './login.css'
import axios from 'axios';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { setSignIn } from '../../redux/slices/userData';
import { setLoading } from '../../redux/slices/loadingSlice';

const LoginScreen = () => {

    //para leer informacion del store
    const loading = useSelector((state)=>state.loading.isLoading);

    //para disparar acciones
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [error, setError] = React.useState(null)
    const [type, setType] = React.useState('password')
    const [form, setForm] = React.useState({})
    
    const handleChange = (e) => {
        const {value, name} = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async () => {
        dispatch(setLoading(true))
        if(form && typeof(form) == 'object' && Object.keys(form).length > 0){
            
            try {
                const payload = {
                    email: form.correo,
                    password: form.clave 
                }
                const result = await axios.post(`${BASE_URL}/auth/signin`, payload)
                console.log(result.data)
                const {token, name, email} = result.data
                dispatch(setLoading(false))
                //Guardamos el token en el local storage
                dispatch(setSignIn({token, name, email}))
                navigate("/dashboard");
                
            } catch (error) {
                dispatch(setLoading(false))
                console.log("mostrando error al login", error)
                setError(error.response.data.message);
            }
        }else{
            dispatch(setLoading(false))
            setError("Campos obligatorios")
        }
        
    }

    
    
    React.useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            dispatch(setSignIn({token:token}))
            navigate("/dashboard");
        }
    },[])

return(
    <div className="login-page d-flex justify-content-center align-items-center">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <div className="mb-3">
                                <label>Correo</label>
                                <input type="text" className="form-control" name="correo" onBlur={(e)=>handleChange(e)} />
                            </div>
                            <div className="mb-3">
                            <label>Contraseña</label>
                            <div className="input-group">
                                
                                <input type={type} className="form-control" name="clave" onBlur={(e)=>handleChange(e)}/>
                                <button className="input-group-text" onClick={()=>setType(prev => prev == 'text' ? 'password' : 'text' )}>
                                    {type == 'password' && <FaEye/>}
                                    {type == 'text' && <FaEyeSlash/>}
                                    {type == 'text' ? <FaEyeSlash/> : <FaEye/>}                                    
                                </button>
                            </div>
                            </div>
                            
                            
                            {error &&
                            <>
                            <div className="alert alert-danger">{error}</div>
                            </>
                            }
                            <div className="d-grid gap-2">
                                <button type="button" className="btn btn-success" disabled={loading} onClick={()=>handleSubmit()}>{loading ? 'Cargando...' : 'Iniciar Sesión'}</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    </div>    
)
}

export default LoginScreen