import { mealService } from "../../_services/meals";
import { orderConstants } from "../constants/orders.constants";

export const orderActions = {
    makeorder
}

function makeorder(order){
 return(dispatch) => {
    dispatch(request());
    mealService.postOrder(order).then(res =>{
      dispatch(success(res));
    })
    .catch(err => {
        dispatch(failure(err.toString()));
    });
 }

  function request(){
      return { type: orderConstants.MAKE_ORDER_REQUEST }
  }

  function success(res){
    return { type: orderConstants.MAKE_ORDER_SUCCESS, res }
    
  }

  function failure(err){
    return { type: orderConstants.MAKE_ORDER_FAILURE, err }
  }

}