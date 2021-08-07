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
        // Array.prototype.push.apply(mainMeal,mainSides,mainDrinks); 
          console.log("THIS IS THE ALL: ", mainMeal);
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
              <Total />
            </div>
          </Provider>
          </div>
        )
}
