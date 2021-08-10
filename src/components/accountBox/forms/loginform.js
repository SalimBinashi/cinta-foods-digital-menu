// import useContext (or we could write React.useContext)
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FormContainer, Input, SubmitButton } from "../common/common";
import { Marginer } from "../marginer";
import "../common/common.css";
export function LoginForm(props) {
  const [table_number, settableNumber] = useState([]);
  const [password, setPassword] = useState("");
  const [selectedTable, setSelectedTable] = useState("Select a Table");


  //use effect to call methods when component is created
  useEffect(() => {
      showTables();
  }, []);

  // login method
  const loginTable = () => {
    Axios.post("http://localhost:3001/tables/login", {
      table_number: selectedTable,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }
    });
  };

  //show available tables
  const showTables = () => {
    Axios.get("http://localhost:3001/tables/getTables", {}).then((response) => {
        settableNumber(response.data);
    });
  };

  // handle table change
  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
}

  //iterate through the json data
  var jsonQuery = require('json-query');
  //obtain an array of the data
  var tablesList = jsonQuery('tables[**][**]', {data: table_number}).value
  console.log(selectedTable);
  return (
    <div className="CommonBoxContainer">
      <FormContainer>
        <select onChange={handleTableChange} className="SelectBox">
            <option value="" disabled="true" selected>Select a Table</option>
            {tablesList.map((selectedTable) => 
            <option value={selectedTable.table_number} key={selectedTable.label}>{selectedTable.table_number}</option>)}
        </select>
        <Input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
      </FormContainer>
      <Marginer direction="vertical" margin={5} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={loginTable}>
        Signin
      </SubmitButton>
    </div>
  );
}
