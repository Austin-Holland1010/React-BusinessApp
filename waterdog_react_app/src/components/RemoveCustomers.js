import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function RemoveCustomers(props) {
    const [formData, setFormData] = React.useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            route: ""
        }
    )

    const [deleteNotification, setDeleteNotification] = React.useState("")

    function handleChange(event) {
        const {name, value, type} = event.target
        setFormData(prevData => {
            return (
                {
                    ...prevData,
                    [name]: value
                }
            )
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        if(formData.firstName === "" || formData.lastName ==="")
        {
            setDeleteNotification("You must enter the first and last name to delete the customer.")
        }
        else
        {
            let url = "http://localhost:55250/Service.svc/deleteCustomer?firstname="
            url = url + formData.firstName
            url = url + "&lastname=" + formData.lastName
            sendToApi(url)  
        } 
    }

    async function sendToApi(url){
        try{
            const result = await fetch(url);
            const jsonString = await result.json()
            console.log(jsonString)
            if(jsonString === true)
            {
                //console.log("Got in here")
                setDeleteNotification("Customer Deleted!")
            }
            props.refreshTable()
        } catch {
            setDeleteNotification("Delete Customer Service Failed")
        }
    }

    return (
        <div>
            <h2 className="add-customer-header">Remove Customer</h2>
            <Form onSubmit={handleSubmit} className="add-customer-form">
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column={3}>First Name:</Form.Label>
                    <Col sm={10} class="col-sm-4">
                        <Form.Control 
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onChange={handleChange}
                            value={formData.firstName}
                            className="w-25"
                        />   
                    </Col>   
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Last Name:</Form.Label> 
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onChange={handleChange}
                            value={formData.lastName}
                            className="w-25"
                        />   
                    </Col>    
                </Form.Group>
                <Button variant="danger" type="submit">
                    Remove Customer
                </Button>
                <Form.Label className="removed-customer-note">{deleteNotification}</Form.Label>
            </Form>
        </div>
    )
}

export default RemoveCustomers