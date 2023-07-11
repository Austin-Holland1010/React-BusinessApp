import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const NavbarLinks = () => {
    return (
        <div>
            <Nav>
                <NavMenu>
                    <NavLink to="/ViewCustomers" activeStyle>
                        View Customers
                    </NavLink>
                    <NavLink to="/AddCustomers" activeStyle>
                        Add Customer
                    </NavLink>
                    <NavLink to="/RemoveCustomers" activeStyle>
                        Remove Customer
                    </NavLink>
                    <NavLink to="/EditCustomers" activeStyle>
                        Edit Customer
                    </NavLink>
                </NavMenu>
            </Nav>
        </div>
    );
};
 
export default NavbarLinks;