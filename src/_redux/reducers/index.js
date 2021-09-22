import { order } from './orders.reducers';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const reducers = combineReducers({
    order,

})
const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });


var store;
export default store = createStore(reducers, 
    composeEnhancers(
        applyMiddleware(),
    ))