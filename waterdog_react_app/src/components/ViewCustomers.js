import React from "react";
import Table from 'react-bootstrap/Table'

function ViewCustomers(props) {
    return (
        <div>
            <Table table-bordered bordered hover variant="dark" size="sm">
                <tbody>
                <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Address</th>
                    <th>Route</th>
                    <th>Phone</th>
                    <th>Email</th>
                </tr>

                {props.customers.map((customer, index) =>
                    <tr data-index={index} >
                        <td>{customer.lastname}</td>
                        <td>{customer.firstname}</td>
                        <td>{customer.address}</td>
                        <td>{customer.route}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.email}</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </div>
    )
}

export default ViewCustomers