import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Button, Col, Row, ListGroup, ListGroupItem, Container } from 'reactstrap';
import SupplyChainContext from '../../context/SupplyChainContext';


const Provenance = (props) => {

    const supplyChainContext = useContext(SupplyChainContext);

    const { launchWeb3, contract, accounts, web3 } = supplyChainContext;

    const { id } = useParams();

    useEffect(()=>{
        launchWeb3();

    },[])

    const [productHistory, setProductHistory] = useState({
        upc: null,
        sku: null,
        name: null,
        price: null,
        location: null,

        date: null,
        owner: null,
        parentProduct: null,
        supplyState: null,

        processingCompany: null,
        packingCompany: null,
        logisticCompany: null,
        retail: null,

        blocknumberPro:null,
        blocknumberPack:null,
        blocknumberL:null,
        blockchainR:null

    })



    let getHistory1 = async (id) => {
        launchWeb3();
        let result = await contract.methods.getProvenanceOne(id).send({ from: accounts[0] });
        console.log(result.events.History1.returnValues.upc, result.events.History1.returnValues.name,
            result.events.History1.returnValues.price, result.events.History1.returnValues.location)

        setProductHistory({
            ...productHistory, upc: result.events.History1.returnValues.upc,
            sku: result.events.History1.returnValues.sku, name: result.events.History1.returnValues.name,
            price: result.events.History1.returnValues.price, location: result.events.History1.returnValues.location
        })
    }

    let getHistory2 = async () => {
        launchWeb3();
        let result = await contract.methods.getProvenanceTwo(id).send({ from: accounts[0] });
        console.log(result.events.History2.returnValues)
        setProductHistory({
            ...productHistory, date: result.events.History2.returnValues.date,
            owner: result.events.History2.returnValues.owner, parentProduct: result.events.History2.returnValues.parent_product,
            supplyState: result.events.History2.returnValues.state
        })
    }

    let getHistory3 = async () => {
        launchWeb3();
        let result = await contract.methods.getProvenanceThree(id).send({ from: accounts[0] });
        console.log(result)
        setProductHistory({
            ...productHistory, processingCompany: result.events.History3.returnValues.processing_company,
            packingCompany: result.events.History3.returnValues.packing_company, logisticCompany: result.events.History3.returnValues.logistic_comapny,
            retail: result.events.History3.returnValues.retail
        })
    }

    let getBlock = async ()=>{
        launchWeb3();
        let result = await contract.methods.getBlockHistory(id).send({ from: accounts[0] });
        console.log(result)

        setProductHistory({
            ...productHistory,
             blocknumberPro: result.events.BlockNumber.returnValues.processingCompany,
            blocknumberPack: result.events.BlockNumber.returnValues.packingCompany, 
            blocknumberL: result.events.BlockNumber.returnValues.logisticCompany,
            blockchainR: result.events.BlockNumber.returnValues.retailCompany
        })
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
        <>
            <Row>
                <Col>
                    <h2>Product UPC : {id}</h2>
                </Col>
            </Row>

            <Row style={{ padding: '12px' }}>
                <Button  style={{backgroundColor:'#1abc9c', width:'50%', margin:'auto', marginBottom:'10px'}}  onClick={() => getHistory1(id)}>Get Provenance 1</Button>
                <Col className='col-sm-12 .col-md-6 .offset-md-3'>
                    <ListGroup>
                        <ListGroupItem>
                            UPC : {productHistory.upc}
                        </ListGroupItem>
                        <ListGroupItem>
                            SKU :{productHistory.sku}
                        </ListGroupItem>
                        <ListGroupItem>
                            Name :{productHistory.name}
                        </ListGroupItem>
                        <ListGroupItem>
                            Price : {productHistory.price}
                        </ListGroupItem>

                        <ListGroupItem>
                            Location :{productHistory.location}
                        </ListGroupItem>
                    </ListGroup>

                </Col>
            </Row>

            <Row style={{ padding: '12px' }}>

                <Button  style={{backgroundColor:'#1abc9c', width:'50%', margin:'auto', marginBottom:'10px'}} onClick={() => getHistory2(id)}>Get Provenance 2</Button>

                <Col className='col-sm-12 .col-md-6 .offset-md-3'>
                    <ListGroup>
                        <ListGroupItem>
                            Date : {productHistory.date}
                        </ListGroupItem>
                        <ListGroupItem>
                            Owner :{productHistory.owner}
                        </ListGroupItem>
                        <ListGroupItem>
                            Parent Product :{productHistory.parentProduct}
                        </ListGroupItem>
                        <ListGroupItem>
                            Supply Chain State : {productHistory.supplyState}
                        </ListGroupItem>

                    </ListGroup>
                </Col>
            </Row>


            <Row style={{ padding: '12px' }}>

                <Button  style={{backgroundColor:'#1abc9c', width:'50%', margin:'auto', marginBottom:'10px'}} 
                onClick={() => getHistory3(id)}>Get Provenance 3</Button>

                <Col className='col-sm-12 .col-md-6 .offset-md-3'>
                    <ListGroup>
                        <ListGroupItem>
                            Processing Company Address : {productHistory.processingCompany}
                        </ListGroupItem>
                        <ListGroupItem>
                            Packing Company Address :{productHistory.packingCompany}
                        </ListGroupItem>
                        <ListGroupItem>
                            Logistic Comapny Address :{productHistory.logisticCompany}
                        </ListGroupItem>
                        <ListGroupItem>
                            Retail Address : {productHistory.retail}
                        </ListGroupItem>

                    </ListGroup>
                </Col>
            </Row>



            <Row style={{ padding: '12px' }}>

<Button  style={{backgroundColor:'#1abc9c', width:'50%', margin:'auto', marginBottom:'10px'}}
 onClick={() => getBlock(id)}>Get block history</Button>

<Col className='col-sm-12 .col-md-6 .offset-md-3'>
    <ListGroup>
        <ListGroupItem>
            Processing Company block : {productHistory.blocknumberPro}
        </ListGroupItem>
        <ListGroupItem>
            Packing Company block :{productHistory.blocknumberPack}
        </ListGroupItem>
        <ListGroupItem>
            Logistic Comapny block :{productHistory.blocknumberL}
        </ListGroupItem>
        <ListGroupItem>
            Retail Address : {productHistory.blockchainR}
        </ListGroupItem>

    </ListGroup>
</Col>
</Row>






        </>



    )
}

export default Provenance;
