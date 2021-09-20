// import useContext (or we could write React.useContext)
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { FormContainer, Input, SubmitButton } from "../common/common";
import { Marginer } from "../marginer";
import "../common/common.css";
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import Session from 'react-session-api';
// import { View } from 'react-view';
// import Modal from 'react-modal';
// import Text from 'react-text';
// import { ActivityIndicator } from 'react-activity-indicator';

export function LoginForm(props) {
  const [table_number, settableNumber] = useState([]);
  const [password, setPassword] = useState("");
  const [selectedTable, setSelectedTable] = useState("Select a Table");
  const [buttonText, setButtonText] = useState("Signin");
  // introduce history for session control
  const history = useHistory();

  // run the progress bar
  const isLoading = () => {
      setButtonText("Loading...")
    }
  const isNotLoading = () => {
      setButtonText("Signin");
    }
// //customer progress bar
//   const CustomProgressBar = ({ visible }) => (
//     <Modal onRequestClose={() => null} visible={visible}>
//       <View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
//         <View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
//           <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
//           <ActivityIndicator size="large" />
//         </View>
//       </View>
//     </Modal>
//   );
  //use effect to call methods when component is created
  useEffect(() => {
      showTables();
  }, []);
  // login method
  const loginTable = () => {
    isLoading();
    Axios.post("http://localhost:3001/tables/login", {
      table_number: selectedTable,
      password: password,
    }).then((response) => {
      if (response.data.message === "Logged in successfully") {
          isNotLoading();
          toast.success(response.data.message);
          Session.set('loggedIn', true);
          Session.set('table_number',selectedTable);
          history.push('/dashboard');
      } else {
          isNotLoading();
          toast.error(response.data.message);
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
//   inProgress ? <CustomProgressBar/> :
  return (
    <div className="CommonBoxContainer">
      <FormContainer>
        <select onChange={handleTableChange} className="SelectBox">
            <option value="" disabled={true} selected>Select a Table</option>
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
        {buttonText}
      </SubmitButton>
      <Toaster className="toast"/>
    </div>
  );
}
