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

export default function Menu({table_number}) {
  const [mainsList, setMainsList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [sidesList, setSidesList] = useState([]);
  // const [allAvailable, setAllAvailable] = useState([]);
  const history = useHistory();
  const [tableNumber, setTableNumber] = useState('');



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
    Axios.get("http://localhost:3001/getMains", {}).then((response) => {
      setMainsList(response.data);
    });
  };

  // get drinks list
  const showDrinks = () => {
    Axios.get("http://localhost:3001/getDrinks", {}).then((response) => {
      setDrinksList(response.data);
    });
  };

  // get sides list
  const showSides = () => {
    Axios.get("http://localhost:3001/getSides", {}).then((response) => {
      setSidesList(response.data);
    });
  };

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
    Axios.patch("http://localhost:3001/tables/updateTable", {
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
          <Mains meals={mainMeal} />
          <aside className="aside">
            <Extras type="Sides" items={mainSides} />
            <Extras type="Drinks" items={mainDrinks} />
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
              onClick={deactivateTable}>
              <span>Make Order </span>
            </button>
            <Toaster/>
        </div>
      </Provider>
    </div>
  );
}
