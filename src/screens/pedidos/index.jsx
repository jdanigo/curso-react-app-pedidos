import React from 'react';
import Step1Pedidos from './step1';
import Step2Pedidos from './step2';
import Step3Pedidos from './step3';
import { Container, Row, Col } from 'react-bootstrap';
import ResumeScreen from './resume';

const PedidosScreen = () => {

    const [step, setStep] = React.useState(1);

    return(
        <Container>
            <Row>
                <Col>
                    {step == 1 && <Step1Pedidos setStep={setStep} />}
                    {step == 2 && <Step2Pedidos setStep={setStep} />}
                    {step == 3 && <Step3Pedidos setStep={setStep} />}
                    {step == 4 && <ResumeScreen />}
                </Col>
            </Row>        
        </Container>
    )
}

export default PedidosScreen;