import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Button, Card, CardBody, CardTitle, CardText, Container, Progress } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import SupplyChainContext from '../../context/SupplyChainContext';

const Admin = () => {

    const [productUPC, setProductUPC] = useState()
    const [productName, setProductName] = useState('')
    const [productStateName, setProductStateName] = useState('')
    const [productState, setProductState] = useState();


    const supplyChainContext = useContext(SupplyChainContext);

    const { launchWeb3, contract, accounts, web3, role, product, getSingleProduct } = supplyChainContext;

    const { id } = useParams();

    useEffect(() => {
        launchWeb3();
        getSingleProduct(id);

    }, [])


    const checkState = async (idUpc) => {
        launchWeb3();
        console.log(accounts)
        console.log(idUpc)
        let result = await contract.methods.getProduct(idUpc).send({ from: accounts[0] });
        setProductState(result.events.getPoductDetails.returnValues.step)
        let currentState = result.events.getPoductDetails.returnValues.step
        console.log('The current state of item', currentState);

        if(currentState == 0){
            setProductStateName('The item is produced and ready to move forward in supply chain');
        }

        if(currentState == 1){
            setProductStateName('Item in Food Processing');
        }
        if(currentState == 2){
            setProductStateName('The item is produced and ready to move forward in supply chain');
        }
        if(currentState == 3){
            setProductStateName('Item in Transit');
        }
        if(currentState == 4){
            setProductStateName('Item Reached at Retail');
        }


        console.log(productStateName)

    }


    const triggerPro = async (idUpc) => {
        launchWeb3();
        console.log(accounts)
        console.log(idUpc)
        let result = await contract.methods.triggerFoodProcessing(idUpc).send({ from: accounts[0] });
        setProductState(result.events.ItemInProcessing.returnValues._step)
        setProductStateName('Item in Food Processing')
        console.log(result)

    }

    const triggerPac = async (idUpc) => {
        launchWeb3();
        console.log(accounts)
        console.log(idUpc)
        let result = await contract.methods.triggerFoodPacking(idUpc).send({ from: accounts[0] });
        setProductState(result.events.ItemAtPackingFacility.returnValues._step)
        setProductStateName('Item in Food Packing')
        console.log(result.events)

    }

    const triggerL = async (idUpc) => {
        launchWeb3();
        console.log(accounts)
        console.log(idUpc)
        let result = await contract.methods.triggerLogistic(idUpc).send({ from: accounts[0] });
        setProductState(result.events.ItemInTransit.returnValues._step)
        setProductStateName('Item in Transit')
        console.log(result.events)

    }

    const triggerR = async (idUpc) => {
        launchWeb3();
        console.log(accounts)
        console.log(idUpc)
        let result = await contract.methods.triggerRetail(idUpc).send({ from: accounts[0] });
        setProductState(result.events.ItemReachedAtRetail.returnValues._step)
        setProductStateName('Item Reached at Retail')
        console.log(result.events)

    }

    const reloadPage = ()=>{
        window.location.reload();
    }
    if (typeof (web3) === 'undefined') {
        return (
            <Container>
                <h2>
                Loading Web3, accounts, and contract... Reload page
                </h2>
               <Button onClick={reloadPage}>
                   Click to reload
               </Button>

            </Container>

        )
        
    }

    return (
        <Container>

            <Row style={{ margin: '10px' }}>
                <Col className='col-sm-auto offset-sm-1' style={{ margin: 'auto', marginBottom: '10px' }}>
                    <Card
                        body
                        inverse
                        style={{
                            backgroundColor: '#1abc9c'
                        }} >
                        <CardTitle tag="h5">
                            UPC -  {product.upc}
                        </CardTitle>
                        <CardText>
                            Name -  {product.name}
                        </CardText>
                        <Button onClick={() => checkState(product.upc)} style={{ backgroundColor: '#34495e', margin: '10px' }}>
                            Check item state
                        </Button>
                    </Card>
                </Col>
            </Row>



            {/* Trigger buttons */}


            <Row style={{ margin: '10px' }}>

                <h6 style={{ textAlign: 'center' }}>{productStateName}</h6>

                <h4 style={{ textAlign: 'center' }}>Triggers</h4>
                <Col className='col-sm-auto offset-sm-1' style={{ margin: 'auto' }}>
                    <Button onClick={() => triggerPro(product.upc)} style={{ margin: '10px' }} color="primary" outline>Processing Company</Button>
                    <Button onClick={() => triggerPac(product.upc)} style={{ margin: '10px' }} color="primary" outline>Packing Company</Button>
                    <Button onClick={() => triggerL(product.upc)} style={{ margin: '10px' }} color="primary" outline>In Transit</Button>
                    <Button onClick={() => triggerR(product.upc)} style={{ margin: '10px' }} color="primary" outline>Reached Retail</Button>
                </Col>
            </Row>




            {/* Progess bar */}

            <Row style={{ margin: '10px' }}>
                <Progress value={productState} min='1' max='4'>
                    {productStateName}
                </Progress>
            </Row>

        </Container>

    )
}

export default Admin;