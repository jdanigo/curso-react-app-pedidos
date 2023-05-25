import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../../config';
import axios from 'axios';
const ResumeScreen = () => {

    const orderData = useSelector((state)=>state.orderData);
    const [productData, setProductData] = React.useState(null);
    const [tableData, setTableData] = React.useState(null);
    const token = useSelector((state)=>state.userData.token);
    

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
            const tmpProductData = data.filter((items)=> orderData.products.includes(items.id));
            setProductData(tmpProductData);
        } catch (error) {
            console.log("se ha presentado un error", error)
        }
    }

    const getTableDataById = async () => {
        try {
            const {data} = await axios({
                method: 'GET',
                url: BASE_URL+'/tables/'+orderData.table,
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

    React.useEffect(()=>{
        getProductsData();
        getTableDataById();
    },[])

return(
    <Container>
        <Row>
            <Col lg={10}>
                <Card>
                    <Card.Body>
                        <Card.Title>Resumen del pedido - Cantidad de items: {orderData && orderData.products.length}</Card.Title>
                        
                        <h3>Productos</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Precio</th>
                                </tr>
                            </thead>
                            <tbody>
                            {productData &&  productData.map((data, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.price}</td>
                                </tr>
                            )
                        })}
                            </tbody>
                        </table>
                        <br/>
                        <hr/>
                        <h3>Mesa seleccionada: {tableData && tableData.name}</h3>
                        <br/>
                        <hr/>
                        <p>Subtotal: {orderData && orderData.subtotal}</p>
                        <p>Total: {orderData && orderData.total}</p>


                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </Container>
)
}

export default ResumeScreen;