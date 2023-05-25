import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../../config'
import { useDispatch, useSelector } from 'react-redux';
import { setClientDataAction } from '../../../redux/slices/pedidosSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Step1Pedidos = ({setStep}) => {
    
    const [clientData, setClientData] = React.useState(null);
    
    const navigate = useNavigate();
    const token = useSelector((state)=>state.userData.token);
    const selectedClient = useSelector((state)=>state.orderData.client);
    const dispatch = useDispatch();

    const getClientData = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/customers',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            setClientData(data);
        } catch (error) {
            console.log("se ha presentado un error", error)
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        dispatch(setClientDataAction(value))
    }

    React.useEffect(()=>{
        getClientData()
    },[setStep])

    return(
        <>
        <Row className="mt-5">
            <Col lg={6} className="offset-3">
                <Row>
                <Card>
                <Card.Body>
                    <Card.Title>Elegir Cliente</Card.Title>
                    {clientData &&
                    <>
                    <select className='form-control' name="cliente" value={selectedClient} onChange={(e)=>handleChange(e)}>
                        <option>Elegir cliente</option>
                        {clientData.map((data, index)=>{
                            return(
                                <option key={index} value={data.id}>{data.name} {data.lastName}</option>
                            )
                        })}
                    </select>
                    </>
                    }
                </Card.Body>
            </Card>
                </Row>
                <Row className="d-flex mt-2">
                    <Col className="d-flex justify-content-start">
                    <button type="button" className="btn btn-warning" onClick={()=>navigate("/dashboard")}>Atras</button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <button type="button" className="btn btn-info" onClick={()=>setStep(2)}>Siguiente</button>
                    </Col>
                </Row>
                
            
            </Col>
        </Row>
        
        </>
    )
}

export default Step1Pedidos;