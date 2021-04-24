import React, { useState, useEffect } from "react";
//import { Link} from 'react-router-dom';
import {Button, Table, Container} from 'react-bootstrap';
import axios from "axios";
import {Layout} from "../navigation";

const Consumers = () => {

        const [consumerData, setConsumerData] = useState([]);
        useEffect(() => {
            axios.get(`http://localhost:4000/consumers`)
            .then(res => {
                const consumer = res.data 
                setConsumerData(consumer)
            });
        }, [])
 
    return (
        <>
        <div>
        <Layout>Consumers</Layout>
        <Container>
            <Table striped>
                <thead>
                    <tr className="suzo-admin-thead">
                        <th>Name</th>
                        <th>City</th>
                        <th>Is Active</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {consumerData.map(consumer => (
                    <tr key={consumer._id}>
                        <td>{consumer.consumerFirstName + " " + consumer.consumerSurname}</td>
                        <td>{consumer.consumerCity}</td>
                        <td>{consumer.isActive ? "Yes": "No"}</td>
                        <td><Button variant="secondary">Edit</Button></td>
                    </tr>
                    ))} 
                </tbody>
            </Table> 
   </Container>
        </div>  
       </>   
   )
}

export default Consumers;     

/*
    consumerFirstName: {type: String},
    consumerSurname: {type: String},
    consumerAddressLine1: {type: String},
    consumerAddressLine2: {type: String},
    consumerAddressLine3: {type: String},
    consumerCity: {type: String},
    consumerCounty: {type: String},
    consumerPostcode: {type: String},
    consumerIsActive:  {type: Boolean}
*/