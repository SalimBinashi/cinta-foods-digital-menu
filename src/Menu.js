import React , { useState, useEffect } from 'react'
import Logo from "./components/Logo";
import Mains from "./components/Mains";
import Extras from "./components/Extras";
import Total from "./components/Total";
import { Provider } from "./Context";
import Axios from 'axios';


export default function Menu() {
        const [mainsList, setMainsList] = useState([]);
        const [drinksList, setDrinksList] = useState([]);
        const [sidesList, setSidesList] = useState([]);
       // const [allAvailable, setAllAvailable] = useState([]);
        
        // use effect method
        useEffect(() => {
          showMains();
          showDrinks();
          showSides();
        }, []);
        // get mains list
        const showMains = () => {
          Axios.get('http://localhost:3001/getMains', {
        }).then((response) => {
          setMainsList(response.data);
          
        });
        };

        // get drinks list
        const showDrinks = () => {
          Axios.get('http://localhost:3001/getDrinks', {
        }).then((response) => {
          setDrinksList(response.data);

        });
        };

        // get sides list
        const showSides = () => {
          Axios.get('http://localhost:3001/getSides', {
        }).then((response) => {
          setSidesList(response.data);

        });
        };

        // Json iterator
        var jsonQuery = require('json-query');
        // query through the response
        var mainMeal = jsonQuery('mains[**][**]', {data: mainsList}).value
        var mainSides = jsonQuery('sides[**][**]', {data: sidesList}).value
        var mainDrinks = jsonQuery('drinks[**][**]', {data: drinksList}).value

        // concatenate all objects to one
        function merge(source, target) {
          Object.keys(source).forEach(function (key) {
                if (!source[key]) {
                    return;
                }
                if (typeof source[key] === 'object') {
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
        
        // const allAvailable= JSON.parse(mainsList);
          console.log("THIS IS THE ALL: ", allAvailable);
        return (
          <div>
            <Provider>
            <div className="menu">
              <Logo/>
              <Mains meals={mainMeal} />
              <aside className="aside">
                <Extras type="Sides" items={mainSides} />
                <Extras type="Drinks" items={mainDrinks} />
              </aside>
              <Total data = {allAvailable}/>
            </div>
          </Provider>
          </div>
        )
}
