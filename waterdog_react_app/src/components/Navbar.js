import React from "react";
import NavbarLinks from "./Navbar/NavbarLinks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewCustomers from "./ViewCustomers";
import AddCustomers from "./AddCustomers";
import RemoveCustomers from "./RemoveCustomers";
import EditCustomers from "./EditCustomers";

function Navbar(props) {
    console.log("Navbar " + props.customers)
    return (
        <Router>
            <nav className="nav-top">
                <img src="/images/WaterDog_Logo.png" alt="Water Dog Logo" className="Img"></img>
                <h3>Water Dog Pool Care Web Access</h3>
            </nav>
            <NavbarLinks />
            <Routes>
                <Route exact path='/' element={<ViewCustomers customers={props.customers}/>} />
                <Route path='/ViewCustomers' element={<ViewCustomers customers={props.customers}/>} />
                <Route path='/AddCustomers' element={<AddCustomers />} />
                <Route path='/RemoveCustomers' element={<RemoveCustomers />} />
                <Route path='/EditCustomers' element={<EditCustomers />} />
            </Routes>
        </Router>
    )
}

export default Navbar