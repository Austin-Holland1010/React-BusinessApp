import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function EditCustomers(props) {
    const [formData, setFormData] = React.useState(
        {
            currentFirstName: "",
            currentLastName: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            route: ""
        }
    )

    const [updateNotification, setUpdateNotification] = React.useState("")

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
            setUpdateNotification("You must enter the current first and last name of the customer.")
        }
        else
        {
            let url = "http://localhost:55250/Service.svc/updateCustomer?currentFirstName="
            url = url + formData.currentFirstName
            url = url + "&currentLastName=" + formData.currentLastName
            url = url + "&firstname=" + formData.firstName
            url = url + "&lastname=" + formData.lastName
            url = url + "&phone=" + formData.phone
            url = url + "&address=" + formData.address
            url = url + "&email=" + formData.email
            url = url + "&route=" + formData.route
            sendToApi(url) 
        } 
    }

    async function handleGetInformation(event) {
        event.preventDefault()
        if(formData.currentFirstName === "" || formData.currentLastName === "")
        {
            setUpdateNotification("You must enter the current first and last name of the customer.")
        }
        else
        {
            let url = "http://localhost:55250/Service.svc/getSpecificCustomer?firstname="
            url = url + formData.currentFirstName
            url = url + "&lastname=" + formData.currentLastName

            try {
                const result = await fetch(url);
                const jsonString = await result.json()
                const toArray = JSON.parse(jsonString)

                setFormData(prevData => {
                    return (
                        {
                            ...prevData,
                            firstName: toArray[0].firstname,
                            lastName: toArray[0].lastname,
                            email: toArray[0].email,
                            phone: toArray[0].phone,
                            address: toArray[0].address,
                            route: toArray[0].route

                        }
                    )
                })
            }
            catch {
                setUpdateNotification("Get customer data service failed")
            }
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
                setUpdateNotification("Customer Deleted!")
            }
            props.refreshTable()
        } catch {
            setUpdateNotification("Update Customer Service Failed")
        }
    }

    return (
        <div>
            <h2 className="add-customer-header">Edit Customer</h2>
            <Form onSubmit={handleSubmit} className="add-customer-form">
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column={3}>Current First Name:</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            placeholder="Current First Name"
                            name="currentFirstName"
                            onChange={handleChange}
                            value={formData.currentFirstName}
                            className="w-25"
                        />   
                    </Col>   
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column={2}>Current Last Name:</Form.Label> 
                    <Col sm={10}>
                        <Form.Control 
                            type="text"
                            placeholder="Current Last Name"
                            name="currentLastName"
                            onChange={handleChange}
                            value={formData.currentLastName}
                            className="w-25"
                        />   
                    </Col>    
                </Form.Group>
                <Button variant="primary" onClick={handleGetInformation}>
                    Fill in Customer Data
                </Button>
    
                <p/>
                <p/>
                
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label column={3}>First Name:</Form.Label>
                    <Col sm={10} className="col-sm-4">
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
                    Edit Customer
                </Button>
                <Form.Label className="removed-customer-note">{updateNotification}</Form.Label>
            </Form>
        </div>
    )
}

export default EditCustomers