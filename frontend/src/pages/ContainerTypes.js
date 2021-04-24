import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import {Button, Table, Container} from 'react-bootstrap';
import axios from "axios";
import {Layout} from "../navigation";

const ContainerTypes = () => {
    console.log("Container types in??")
    const [containerTypeData, setContainerTypeData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/containerTypes`)
        .then(res => {
            const containerType = res.data 
            setContainerTypeData(containerType)
        });
    }, [])
 
    return (
        <>
        <div>
        <Layout>Container Types</Layout>
        <Container>
            <Table striped>
                <thead>
                    <tr className="suzo-admin-thead">
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Lid</th>
                        <th>Tracker</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {containerTypeData.map(containerType => (
                    <tr key={containerType._id}>
                        <td className="thumbnail-image"><img src={"../images/containerTypes/" + containerType.containerTypeImage} alt="container"/></td>
                        <td>{containerType.containerTypeName}</td>
                        <td>{containerType.containerTypeCategory}</td>
                        <td>{containerType.containerTypeLidType}</td>                        
                        <td>{containerType.containerTypeTracker}</td>
                        <td><Link to={{
                            pathname: '/container/' + containerType._id,
                                state: {containerType: containerType}
                        }}><Button variant="secondary">Edit</Button></Link></td>
                    </tr>
                    ))} 
                </tbody>
            </Table> 
   </Container>
   </div>  
       </>   
   )
}

export default ContainerTypes;


/*























    containerTypeBarrier: {type: String},
    containerTypeAdditives: {type: String},
    containerTypeLidType: {type: String},
    containerTypeImage: {type: String},
    containerTypePrice: {type: Number},
    containerTypeInStock: {type: Boolean}

*/