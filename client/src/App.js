import React, { Component, useEffect, useState } from "react";
// react router dom
import {BrowserRouter as Router, Switch ,useLocation ,Route, Routes} from 'react-router-dom';
// producer component 
import Producer from "./components/pages/Producer";
// Navbar
import Navbar from "./components/layout/Navbar";
//All products page
import Products from "./components/pages/Products";
// reactstrap container 
import {Container,Row} from 'reactstrap'
//statex
import SupplyChainState from "./context/SupplyChainState";
// Get provenance 
import Provenance from "./components/pages/Provenance";
// Roles
import Roles from "./components/pages/Roles";
// Admin 
import Admin from "./components/pages/Admin"



const App = ()=>{
  return (
    <SupplyChainState>

    <Router>
      <Navbar/>
        <Container>
        <Routes>
          <Route exact path="/" element={<Roles/>}/>
          <Route exact path="/producer" element={<Producer/>}/>
          <Route exact path="/allProducts" element={<Products/>}/>
          <Route exact path="/getProvenance/:id" element={<Provenance/>}/>
          <Route exact path="/admin/:id" element={<Admin/>}/>

        </Routes>
      </Container>
      </Router>
    </SupplyChainState>
  )
}



export default App;
