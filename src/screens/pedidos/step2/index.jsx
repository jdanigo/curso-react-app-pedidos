import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../../config'
import { useDispatch, useSelector } from 'react-redux';
import { setClientDataAction, setAddProductAction } from '../../../redux/slices/pedidosSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Step2Pedidos = ({setStep}) => {
    
    const [productData, setProductData] = React.useState(null);
    const navigate = useNavigate();
    const token = useSelector((state)=>state.userData.token);
    const dispatch = useDispatch();

    const getProductsData = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/products',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            setProductData(data);
        } catch (error) {
            console.log("se ha presentado un error", error)
        }
    }

    const handleAddProduct = (data) => {
        dispatch(setAddProductAction(data))
    }

    React.useEffect(()=>{
        getProductsData()
    },[])

    return(
        <>
        <Row className="mt-5">
            <Col lg={6} className="offset-3">
                <Row>
                <Card>
                <Card.Body>
                    <Card.Title>Seleccionar Productos</Card.Title>
                    {productData &&
                    <Row>
                    {productData.map((data, index)=>{
                            return(
                                <Col lg={3} key={index}>
                                    <Card>
                                    <Card.Title>{data.name}</Card.Title>
                                    <b>Precio: </b><p>{data.price}</p>
                                    <Card.Footer>
                                    <button type="button" className="btn btn-success" onClick={()=>handleAddProduct(data)}>+</button>
                                    </Card.Footer>
                                </Card>
                                </Col>
                            )
                        })}
                    </Row>
                    }
                </Card.Body>
            </Card>
                </Row>
                <Row className="d-flex mt-2">
                    <Col className="d-flex justify-content-start">
                    <button type="button" className="btn btn-warning" onClick={()=>setStep(1)}>Atras</button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <button type="button" className="btn btn-info" onClick={()=>setStep(3)}>Siguiente</button>
                    </Col>
                </Row>
                
            
            </Col>
        </Row>
        
        </>
    )
}

export default Step2Pedidos;