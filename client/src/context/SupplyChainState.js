import React, {Children, useReducer} from 'react';
import axios from 'axios'
//get web3
import MainFoodSupplyChain from '../contracts/MainFoodSupplyChain.json'
import getWeb3 from '../getWeb3';

// Supply chain context 

import SupplyChainContext from './SupplyChainContext';
import SupplyChainReducer from './SupplyChainReducer';

import {
    GET_PRODUCTS,
    GET_SINGLE_PRODUCT,
    ADD_PRODUCTS,
    LAUNCH_WEB3,
    SET_LOADING,
    ROLE
} from './Types'

const SupplyChainState = props =>{
    const initialState = {
        loading:false,
        products:[],
        product:{},
        role:'',
        web3:undefined,
        accounts:undefined,
        contract:undefined
    }


    const [state, dispatch] = useReducer(SupplyChainReducer, initialState);


    // Launch WEB3

    const launchWeb3 = async()=>{
        try {
            const web3 = await getWeb3();

            const accounts = await web3.eth.getAccounts();
            const networkId = await web3.eth.net.getId()

            const mainFoodSupplyChain = new web3.eth.Contract(
                MainFoodSupplyChain.abi,
                MainFoodSupplyChain.networks[networkId] && MainFoodSupplyChain.networks[networkId].address,
            );

            // setWeb3(web3);
            // setContract(mainFoodSupplyChain);
            // setAccounts(accounts);

            dispatch({
                type:LAUNCH_WEB3,
                payload:mainFoodSupplyChain,
                payload1:accounts,
                payload2:web3
            })

        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Did you migrate the contract or install MetaMask? Check console for details.`,
            );
            console.error(error);
        }
    }


    // get all products

    const getAllProducts = async()=>{
        setLoading();
        const res = await axios.get("http://localhost:4000/getAllProducts");
        console.log(res.data)
    
            dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
    }

    // get single product 

    const getSingleProduct = async(id)=>{
        setLoading();

        const res = await axios.get(`http://localhost:4000/product/${id}`);
        console.log(res.data)
    
        dispatch({
            type:GET_SINGLE_PRODUCT,
            payload:res.data
        })
    }

    const setLoading = ()=>{
        dispatch({type:SET_LOADING})
    }


    const setRole = (r)=>{

        console.log('Set Role')
        dispatch({
            type:ROLE,
            payload:r})
    }

    // add product 

    const addProduct = async(upc,name)=>{
        const res = await axios.post("http://localhost:4000/addProductDetails", {upc,name});
        console.log(res.data)
    
        // dispatch({
        //     type:ADD_PRODUCTS,
        //     // payload:res.data
        // })
    }

    return <SupplyChainContext.Provider
    value={{
        products:state.products,
        product:state.product,
        contract:state.contract,
        accounts:state.accounts,
        web3:state.web3,
        loading:state.loading,
        role:state.role,

        getAllProducts,
        // getProduct,
        addProduct,
        launchWeb3,
        setRole,
        getSingleProduct
    }}
    >
        {props.children}
        </SupplyChainContext.Provider>


}

export default SupplyChainState;