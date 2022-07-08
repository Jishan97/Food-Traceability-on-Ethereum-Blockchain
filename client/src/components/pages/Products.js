import React, { useContext, useEffect } from 'react';
import { Card, CardTitle, CardBody, Button, CardText, Row, Col, Spinner } from 'reactstrap';
import {Link} from 'react-router-dom'
import SupplyChainContext from '../../context/SupplyChainContext';

const Products = () => {

    const supplyChainContext = useContext(SupplyChainContext);

    const { getAllProducts, products, loading, role } = supplyChainContext;

    useEffect(() => {
        getAllProducts();

    }, [])

    if(loading){
        return (
            <div>
            <Spinner
              color="primary"
              type="grow"
            >
              Loading...
            </Spinner>
            </div>
        )
    }

    return (
        <Row style={{ padding: '12px' }}>
            {
                products.map((one) => {
                    return (
                        <Col className='col-sm-auto offset-sm-1' style={{margin:'auto', marginBottom:'10px'}}>
                            <Card
                                body
                                inverse
                                style={{
                                    backgroundColor: '#1abc9c'
                                }}
                            >
                                <CardTitle tag="h5">
                                    UPC -  {one.upc}
                                </CardTitle>
                                <CardText>
                                    Name -  {one.name}
                                </CardText>
                                <Button style={{backgroundColor:'#34495e', margin:'10px'}}>
                                <Link to={`/getProvenance/${one.upc}`} style={{ textDecoration: 'none', color: 'white' }}>Check Provenance</Link>
                                </Button>

                                        { role=='Admin' ? (            
                                      <Button style={{backgroundColor:'#34495e', margin:'10px'}}>
                                    <Link to={`/admin/${one.upc}`} style={{ textDecoration: 'none', color: 'white' }}>Trigger</Link>
                                    </Button>) : ("") }
                                        
                                    
                                
                      
                            </Card>
                        </Col>
                    )
                })
            }


        </Row>
    )
}

export default Products;