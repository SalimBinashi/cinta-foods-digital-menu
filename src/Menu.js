import React, { useState, useEffect } from "react";
import Mains from "./components/Mains";
import Extras from "./components/Extras";
import Total from "./components/Total";
import { Provider } from "./Context";
import Axios from "axios";
import getTableNumber from "./helperFunctions/helperFunctionTables";
import { Redirect, useHistory } from "react-router-dom";
import getStatus from "./helperFunctions/helperFunctionMenu";
import Session from "react-session-api";
import toast, { Toaster } from "react-hot-toast";
import "./components/Dashboard/dashboard.css";
import { mealService } from "./_services/meals";
import { connect, useDispatch, useSelector } from "react-redux";
import { orderActions } from "./_redux/actions";
require("dotenv");

function Menu({table_number}) {
  let dispatch = useDispatch();
  const state = useSelector(state => console.log(state))
  const [mainsList, setMainsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [sidesList, setSidesList] = useState([]);
  // const [allAvailable, setAllAvailable] = useState([]);
  const history = useHistory();
  const [tableNumber, setTableNumber] = useState('');
  const [order, setOrder] = useState([{
    table_number: '',
    orders: '',
    total: ''
  }])

console.log(tableNumber)
  // use effect method
  useEffect(() => {
    setTableNumber(getTableNumber);
    showMains();
    showDrinks();
    showSides();
    setTimeout(function () {
      closeMenu();
    }, 30000);
  }, []);

  // close the menu
  const closeMenu = () => {
    Session.remove("status");
    console.log(Session.get("status"));
  };
  // get mains list
  const showMains = () => {
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getMains`, {}).then((response) => {
      setMainsList(response.data);
    });
  };

  // get drinks list
  const showDrinks = () => {
    
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getDrinks`, {}).then((response) => {
      setDrinksList(response.data);
    });
  };

  // get sides list
  const showSides = () => {
    
    Axios.get(`${process.env.REACT_APP_BASE_URL}/getSides`, {}).then((response) => {
      setSidesList(response.data);
    });
  };

  const postOrder = () => {
    mealService.postOrder(order)
    .then(res => {
      setTimeout(() => {
        toast.success(
          "Your order has been made successfully"
          );
      }, 400);
      history.push('/menu');

    })
    .catch(err => {
      setTimeout(() => {
        toast.error(
          "Oops! Something went wrong. Kindly try again"
          );
      }, 400);

    })
    .finally(() => {
    })
  }

  // Json iterator
  var jsonQuery = require("json-query");
  // query through the response
  var mainMeal = jsonQuery("mains[**][**]", { data: mainsList }).value;
  var mainSides = jsonQuery("sides[**][**]", { data: sidesList }).value;
  var mainDrinks = jsonQuery("drinks[**][**]", { data: drinksList }).value;

  // concatenate all objects to one
  function merge(source, target) {
    Object.keys(source).forEach(function (key) {
      if (!source[key]) {
        return;
      }
      if (typeof source[key] === "object") {
        target[key] = target[key] || (Array.isArray(source[key]) ? [] : {});
        return merge(source[key], target[key]);
      }
      target[key] = source[key];
    });
  }
  var allAvailable = {};
  merge(mainsList, allAvailable);
  merge(sidesList, allAvailable);
  merge(drinksList, allAvailable);

  //activate table function
  const deactivateTable = () => {
    
    Axios.patch(`${process.env.REACT_APP_BASE_URL}/tables/updateTable`, {
      table_number: tableNumber,
      status: "offline",
    }).then((response) => {
      if (response.data.message === "update successful") {
        Session.set("status", true);  
        toast.success( Session.get("status"));
        setTimeout(() => {
          toast.success(
            "Thank you for business. Cinta Foods, Your satisfaction is our priority"
          );
        }, 400);
        history.push('/dashboard');
      }
    });
  };

  // const allAvailable= JSON.parse(mainsList);
  console.log("THIS IS THE ALL: ", allAvailable);
  console.log("TABLE: ", tableNumber);
  return !getStatus ? (
    <Redirect to="/dashboard" />
  ) : (
    <div>
      <Provider>
        <div className="menu">
          <img src="./cinta foods 2.png" alt="Cinta Foods Restaurant"/> <p><i>Please scroll to make order</i></p>
          <Mains setOrder={(value) => setOrder(value)} meals={mainMeal} />
          <aside className="aside">
            <Extras setOrder={(value) => setOrder(value)} type="Sides" items={mainSides} />
            <Extras setOrder={(value) => setOrder(value)} type="Drinks" items={mainDrinks} />
          </aside>
          <Total data={allAvailable} />
          <button
              className="submit"
              type="submit"
              name="status"
              onClick={deactivateTable}>
              <span>Deactivate Table </span>
            </button>
            <button
              className="submit"
              type="submit"
              name="status"
              onClick={() => postOrder()}>
              <span>Make Order </span>
            </button>
            <Toaster/>
        </div>
      </Provider>
    </div>
  );
}

function mapStateToProps(state){

  return {
    state
  }

}

function actionCreators(dispatch, props){
  return {
    postOrder: (order) => {
      dispatch(
        orderActions.makeorder(order)
      )
    }
  }
}

export default connect(mapStateToProps, actionCreators)(Menu)
