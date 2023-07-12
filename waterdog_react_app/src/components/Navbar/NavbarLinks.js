import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const NavbarLinks = () => {
    return (
        <div>
            <Nav>
                <NavMenu>
                    <NavLink to="/ViewCustomers">
                        View Customers
                    </NavLink>
                    <NavLink to="/AddCustomers">
                        Add Customer
                    </NavLink>
                    <NavLink to="/RemoveCustomers">
                        Remove Customer
                    </NavLink>
                    <NavLink to="/EditCustomers">
                        Edit Customer
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};
 
export default NavbarLinks;