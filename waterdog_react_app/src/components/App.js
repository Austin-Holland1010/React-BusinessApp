import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";

function App() {
  const [customers, setCustomers] = React.useState([])

  React.useEffect(() => {
    const fetchCustomers = async () => {
      //console.log("Before API Call")
      const response = await fetch('http://localhost:55250/Service.svc/getCustomers');
      //console.log(response)
      const jsonString = await response.json()
      const toArray = JSON.parse(jsonString)
      console.log(toArray)
      for(let x = 0; x < toArray.length; x++)
      {
        setCustomers(prevArray => [...prevArray, toArray[x]])
      }
    }
    fetchCustomers()
    .catch(console.error)
  }, [])

  return (
    <div>
        <Navbar customers={customers}/>
    </div>
  );
}

export default App;
