import axios from 'axios';
require("dotenv");

export const mealService = {
    postOrder
}

function postOrder(order){
    return axios.post(`${process.env.REACT_APP_BASE_URL}/order`, order);
}