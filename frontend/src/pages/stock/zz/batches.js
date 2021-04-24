import React, { useState, useEffect } from "react";
import { Container, Table, Button } from 'reactstrap';
import { Link} from 'react-router-dom';
import axios from "axios";
import NavbarPage from "../../navigation/navAdmin";
import moment from 'moment';

const LeasableBatches = () => {
    const [leasableBatchData, setLeasableBatchData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/leasablebatches`)
        .then(res => {
            const leasableBatches = res.data
            setLeasableBatchData(leasableBatches)
        });
    }, [])

    return (
        <>
        <div>
            <NavbarPage />
        </div>
        <Container fluid>
            <div className="page-header">
                <div className="row">
                    <div className="col">
                        <h2>Leasables | Categories</h2>
                    </div>
                    <div className="col add-new-btn">
                    <Button variant="secondary">Add New</Button>
                    </div>                
                </div>
            </div>
            <div className="page-body">
            <Table striped>
                <thead>
                    <tr className="suzo-admin-thead">
                        <th>Name</th>
                        <th>Description</th>                        
                        <th>Date</th>
                        <th>Administrator</th>
                        <th>Supplier</th>
                        <th>No of Items</th>
                        <th>Identifiable Status</th>                        
                        <th>Leasable Type</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {leasableBatchData.map(leasableBatch => (
                    <tr key={leasableBatch._id}>               
                        <td>{leasableBatch.name}</td>
                        <td>{leasableBatch.description}</td>
                        <td>{moment(leasableBatch.date).format('DD/MM/YY')}</td>
                        <td>{leasableBatch.user.firstName}&nbsp;{leasableBatch.user.lastName}</td>
                        <td>{leasableBatch.supplier}</td>
                        <td>{leasableBatch.noOfItemsinBatch}</td>
                        <td>{leasableBatch.identityStatus}</td>
                        <td></td>
                        <td><Link to={{
                            pathname: '/leasable/batch/:id' + leasableBatch._id,
                                state: {leasableBatchId: leasableBatch}        
                        }} 
                        ><Button color="danger">Edit</Button></Link>&nbsp;<Button variant="secondary">Details</Button></td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>             
        </Container>
        </> 
    )
}

export default LeasableBatches;