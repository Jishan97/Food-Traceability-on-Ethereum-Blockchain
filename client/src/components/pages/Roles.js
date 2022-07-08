import React, { useContext } from 'react';
import { Card, CardTitle, CardBody, Button, CardText, Row, Col, Spinner } from 'reactstrap';
import { Link } from 'react-router-dom'
import SupplyChainContext from '../../context/SupplyChainContext';



const Roles = () => {

    const supplyChainContext = useContext(SupplyChainContext);

    const {setRole, role} = supplyChainContext;

    const changeRole = (r)=>{
            setRole(r)
    }
    return (
        <Row style={{ padding: '8px', marginTop:'10%' }}>

            <Col className='col-sm-12 col-md-6 .offset-md-3' style={{ margin: 'auto', marginBottom: '10px' }}>
                <Card
                    body
                    inverse
                    style={{
                        backgroundColor: '#1abc9c'}}>
                    <CardText>
                        <h2> Role -  Admin </h2>
                    </CardText>
                        <Link to="/allProducts" style={{ textDecoration: 'none', color: 'white' }}>
                    <Button onClick={()=>changeRole('Admin')} style={{ backgroundColor: '#34495e' }}>
                        Login
                    </Button>
                        </Link>
                </Card>
            </Col>


            <Col className='col-sm-12 col-md-6 .offset-md-3' style={{ margin: 'auto', marginBottom: '10px' }}>
                <Card
                    body
                    inverse
                    style={{
                        backgroundColor: '#1abc9c'}}>
                    <CardText>
                    <h2> Role -  Producer/Farmer </h2>
                    </CardText>
                 
                        <Link to="/producer" style={{ textDecoration: 'none', color: 'white' }}>
                        <Button onClick={()=>changeRole('Producer/Farmer')} style={{ backgroundColor: '#34495e' }}>
                            Login
                    </Button>
                        </Link>
                </Card>
            </Col>
        </Row>
    )
}

export default Roles;