import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { BASE_URL } from '../../../config'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectTableAction } from '../../../redux/slices/pedidosSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Step3Pedidos = ({setStep}) => {
    
    const [tableData, setTableData] = React.useState(null);
    const navigate = useNavigate();
    const token = useSelector((state)=>state.userData.token);
    const dispatch = useDispatch();

    const getTableData = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/tables',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': token
                }
            })
            setTableData(data);
        } catch (error) {
            console.log("se ha presentado un error", error)
        }
    }

    const handleSelectTable = (data) => {
        dispatch(setSelectTableAction(data.id))
    }

    React.useEffect(()=>{
        getTableData()
    },[])

    return(
        <>
        <Row className="mt-5">
            <Col lg={6} className="offset-3">
                <Row>
                <Card>
                <Card.Body>
                    <Card.Title>Seleccionar Mesa</Card.Title>
                    {tableData &&
                    <Row>
                    {tableData.map((data, index)=>{
                            return(
                                <Col lg={3} key={index}>
                                    <Card>
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Footer>
                                    <button type="button" className="btn btn-success" onClick={()=>handleSelectTable(data)}>Seleccionar</button>
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
                    <button type="button" className="btn btn-warning" onClick={()=>setStep(2)}>Atras</button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                    <button type="button" className="btn btn-info" onClick={()=>setStep(4)}>Siguiente</button>
                    </Col>
                </Row>
                
            
            </Col>
        </Row>
        
        </>
    )
}

export default Step3Pedidos;