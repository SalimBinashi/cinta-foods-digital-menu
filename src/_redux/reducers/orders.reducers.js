const { orderConstants } = require("../constants/orders.constants");

const initialState = {
    loading: false
}

export const order = (state = initialState, action) => {
    switch(action.type){
        case orderConstants.MAKE_ORDER_REQUEST: {
            return {
                loading: true
            }
        }
        case orderConstants.MAKE_ORDER_SUCCESS: {
            return {
                loading: false,
                data: action.res
            }
        }
        case orderConstants.MAKE_ORDER_FAILURE: {
            return {
                loading: false,
                error: action.err
            }
        }
        default: {
            return state;
        }
    }
}