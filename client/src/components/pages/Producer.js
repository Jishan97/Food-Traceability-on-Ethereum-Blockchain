import React, { Component, useContext, useEffect, useState } from "react";
import { Col, FormGroup, Row, Form, Label, Input, Button, Container } from "reactstrap";
import MainFoodSupplyChain from "../../contracts/MainFoodSupplyChain.json";
import getWeb3 from "../../getWeb3";
// context 

import DatePicker from "reactstrap-date-picker";
import SupplyChainContext from "../../context/SupplyChainContext";


const Producer = () => {

    const supplyChainContext = useContext(SupplyChainContext);

    const { addProduct, launchWeb3,contract,accounts,web3, role } = supplyChainContext;

    const [loaded, setLoading] = useState(false);
    const [pAdded, setpAdded] = useState(false);

    const [product, setProduct] = useState({
        UPC: null,
        SKU: null,
        name: "",
        price: null,
        location: "",
        date: "",
        owner: "",
        parent: "",
        supplyChainStep: ""
    })


    // const [web3, setWeb3] = useState(undefined);
    // const [accounts, setAccounts] = useState(undefined);
    // const [contract, setContract] = useState(undefined);


    useEffect(() => {
        setpAdded(false);
        launchWeb3();

    }, [pAdded]);

    const handleSubmit = async (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        console.log(product);

        let result = await contract.methods.produceItem(product.UPC, product.name, product.price, product.location,
            product.date, product.parent).send({ from: accounts[0] });



        console.log(result);
        if (result.events.ItemProduced.event == 'ItemProduced') {
            addProduct(product.UPC, product.name);
            // setProduct("")
            setpAdded(true)
        }

        alert(`Supply Chain Step ${result.events.ItemProduced.event}`)
    };

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const handleChange1 = (formattedValue) => {
        setProduct({ ...product, date: formattedValue })
        console.log(formattedValue);
    }


    const anotherProduct = () => {
        setProduct({ UPC: null, SKU: null, name: null, price: null, location: null, date: null, owner: null, parent: null, supplyChainStep: null })
        setpAdded(false);
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

    if (pAdded) {

        return (
            <Row>
                <Col className="col-sm-12 col-md-6 offset-md-3" >
                    <h2>Product added to the blockchain</h2>
                    <p>Product Name - {product.name}</p>
                </Col>

                <Col className="col-sm-12 col-md-6 offset-md-3" >
                    <h2>Add another product</h2>
                    <Button onClick={anotherProduct} color="success"> Add </Button>
                </Col>

            </Row>


        )

    } else {
        return (
            <Row>

                {/* <h1>Food Supply Chain</h1> */}
                <Col className="col-sm-12 col-md-6 offset-md-3" >
                    <h4>Add products to blockchain <span style={{fontSize:'18px', color:'#be2edd'}}>(Role - {role})</span> </h4>
                    <Form>
                        <FormGroup>
                            <Label for="exampleEmail">
                                Product UPC
                            </Label>
                            <Input type="text" name="UPC" value={product.UPC} onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="name">
                                Product Name
                            </Label>
                            <Input type="text" name="name" value={product.name} onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="price">
                                Product Price
                            </Label>
                            <Input type="text" name="price" value={product.price} onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="location">
                                Product Location
                            </Label>
                            <Input type="text" name="location" value={product.location} onChange={handleChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="date">
                                Product Date
                            </Label>
                            <DatePicker id="example-datepicker"
                                value={product.date}
                                onChange={(f) => handleChange1(f)} />
                        </FormGroup>

                        <FormGroup>
                            <Label for="parent">
                                Parent Product
                            </Label>
                            <Input type="text" name="parent" value={product.parent} onChange={handleChange} />
                        </FormGroup>


                        {/* product Owner <input type="text" name="owner" value={product.owner} onChange={handleChange} /> */}
                        <Button color="success" type="button" onClick={handleSubmit}>Add Product</Button>
                    </Form>
                </Col>
            </Row>

        )
    }


}

export default Producer;