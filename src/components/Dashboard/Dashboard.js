import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import getTableNumber from "../../helperFunctions/helperFunctionTables";
import "./dashboard.css";
import toast, { Toaster } from "react-hot-toast";
import Session from 'react-session-api';


function Dashboard() {
    const [tableNumber, setTableNumber] = useState('');
    const history = useHistory();

  //useEffect method
  useEffect(() => {
    setTableNumber(getTableNumber);
    setTimeout( function() {logoutTable(); }, 30000 );
  }, []);

  //logout table
  const logoutTable = () => {
    Session.set("loggedIn", false);
    console.log(Session.get("loggedIn"));
  };
  //activate table function
  const activateTable = () => {
    Axios.patch("http://localhost:3001/tables/updateTable", {
      table_number: tableNumber,
      status: "online",
    }).then((response) => {
      if (response.data.message === "update successful") {
        Session.set("status", true);  
        toast.success( Session.get("status"));
        setTimeout(() => {
          toast.success(
            "Welcome to Cinta Foods, Your satisfaction is our priority"
          );
        }, 400);
        history.push('/menu');
      }
    });
  };
  return (
    <div className="container">
      <button
        class="submit"
        type="submit"
        name="status"
        onClick={activateTable}
      >
        <span>Activate Table </span>
      </button>
      <Toaster/>
    </div>
  );
}

export default Dashboard;
