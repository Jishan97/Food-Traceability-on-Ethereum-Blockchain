import {
    GET_PRODUCTS,
    GET_SINGLE_PRODUCT,
    ADD_PRODUCTS,
    LAUNCH_WEB3,
    SET_LOADING,
    ROLE

} from './Types'


export default (state, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading:false
            }

        case GET_SINGLE_PRODUCT:
            return {
                ...state,
                product: action.payload
            }

        case LAUNCH_WEB3:
            return {
                ...state,
                contract: action.payload,
                accounts: action.payload1,
                web3: action.payload2
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        
        case ROLE:
            console.log(state);
            return {
                ...state,
                role:action.payload
            }
        case GET_SINGLE_PRODUCT:

            return {
                ...state,
                product:action.payload
            }

        default:
            return state
    }
}