import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


function AddCustomers(props) {
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

    const [addedNotification, setAddedNotification] = React.useState("")

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

        if(formData.firstName === "" || formData.lastName === "")
        {
            setAddedNotification("Customers must have a first and last name")
        }
        else
        {
            console.log(formData)
            let url = "http://localhost:55250/Service.svc/addCustomer?firstname="
            url = url + formData.firstName
            url = url + "&lastname=" + formData.lastName
            url = url + "&phone=" + formData.phone
            url = url + "&address=" + formData.address
            url = url + "&email=" + formData.email
            url = url + "&route=" + formData.route
            sendToApi(url)
        }
    }

    async function sendToApi(url){
        try{
            const result = await fetch(url);
            const jsonString = await result.json()
            if(jsonString === true)
            {
                setAddedNotification("Customer Added!")
            }
            props.refreshTable()
        }
        catch {
            setAddedNotification("Add customer service failed")
        }
        
    }

    return (
        <div>
            <h2 className="add-customer-header">Add Customer</h2>
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
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Email:</Form.Label> 
                    <Col sm={10} >
                        <Form.Control 
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            className="w-25"
                        />      
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Phone:</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            onChange={handleChange}
                            value={formData.phone}
                            className="w-25"
                        /> 
                    </Col>      
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Address:</Form.Label>
                    <Col sm={10}> 
                        <Form.Control 
                            type="text"
                            placeholder="Address"
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                            className="w-25"
                        />      
                    </Col> 
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Route:</Form.Label> 
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            placeholder="Route"
                            name="route"
                            onChange={handleChange}
                            value={formData.route}
                            className="w-25"
                        />     
                    </Col>  
                </Form.Group>
                <Button variant="primary" type="submit">
                    Add Customer
                </Button>
                <Form.Label className="added-customer-note">{addedNotification}</Form.Label>
            </Form>
        </div>
    )
}

export default AddCustomers