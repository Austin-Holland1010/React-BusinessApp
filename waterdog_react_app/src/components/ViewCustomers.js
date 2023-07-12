import React from "react";
import Table from 'react-bootstrap/Table'

function ViewCustomers(props) {
    return (
        <div>
            <Table striped bordered hover variant="dark" size="sm">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Address</th>
                    <th>Route</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>
                
                {props.customers.map((customer, index) =>
                    <tr data-index={index}>
                        <td>{customer.firstname}</td>
                        <td>{customer.lastname}</td>
                        <td>{customer.address}</td>
                        <td>{customer.route}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                    </tr>
                )}
            </Table>
        </div>
    )
}

export default ViewCustomers