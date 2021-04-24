import React, { useState, useEffect } from "react";
import { Container, Table, Button } from 'reactstrap';
import { Link} from 'react-router-dom';
import axios from "axios";
import NavbarPage from "../../navigation/navAdmin";

const LeasableDashboard = () => {
    const [leasableItemData, setLeasableItemData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/leasablecategories`)
        .then(res => {
            const leasableItems = res.data
            setLeasableItemData(leasableItems)
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
                        <h2>Leasables | Dashboard</h2>
                    </div>               
                </div>
            </div>           
        </Container>
        <Container fluid>
            <div className="dashboard-body">
                <div className="row">
                    {/*Column One*/}
                    <div className="col">
                    <div className="dashboard-header">Active Items</div>
                        <div className="dashboard-scroll">                        
                        <Table striped>
                            <tbody>
                                <tr>
                                    <td colSpan="2">No Items</td>    
                                </tr>                              
                            </tbody>
                        </Table>                      
                    </div>
                    <div className="dashboard-footer"><Link to="/leasable/items"><Button variant="secondary">Manage</Button></Link></div>
                    </div>                  
                    {/*Column Two*/}
                    <div className="col">
                        <div className="dashboard-header-hightlight">Pending Items and New Stock</div>
                        <div className="dashboard-scroll">
                        <Table striped>
                            <tbody>
                                <tr className="row-new-arrivals">               
                                    <td className="thumbnail-image dashboard-scroll-col-image">
                                        <div className="leasable-parent">
                                            <img src="http://localhost:4000/files/jar_440ml_pourlid-1602536812066.jpg" className="leasable-image1" alt="holding"/>
                                            <img src="http://localhost:4000/files/icons/QrCode.gif" className="leasable-image2" alt="holding"/>
                                        </div>
                                    </td>
                                    <td className="dashboard-scroll-col-text">440ml container<br/>2000 units</td>
                                </tr>  
                                <tr className="row-new-arrivals">               
                                    <td className="thumbnail-image dashboard-scroll-col-image">
                                        <div className="leasable-parent">
                                            <img src="http://localhost:4000/files/jar_440ml_pourlid-1602536812066.jpg" className="leasable-image1" alt="holding"/>
                                            <img src="http://localhost:4000/files/icons/RfidCode.gif" className="leasable-image2" alt="holding"/>
                                        </div>
                                    </td>
                                    <td className="dashboard-scroll-col-text">440ml container<br/>2000 units</td>
                                </tr>                                                               
                                <tr>               
                                    <td className="thumbnail-image dashboard-scroll-col-image"><img src="http://localhost:4000/files/icons/QrCode.gif" alt="holding"/></td>
                                    <td className="dashboard-scroll-col-text">QR Code Stickers<br/>2000 units</td>
                                </tr>
                                <tr>               
                                    <td className="thumbnail-image dashboard-scroll-col-image"><img src="http://localhost:4000/files/icons/RfidCode.gif" alt="holding"/></td>
                                    <td className="dashboard-scroll-col-text">RFID Stickers<br/>2000 units</td>
                                </tr>
                                <tr className="row-new-arrivals">               
                                    <td className="thumbnail-image dashboard-scroll-col-image">
                                        <div className="leasable-parent">
                                            <img src="http://localhost:4000/files/icons/object.gif" className="leasable-image1" alt="holding"/>
                                        </div>
                                    </td>
                                    <td className="dashboard-scroll-col-text">440ml container<br/>2000 units</td>
                                </tr>                                                                  
                            </tbody>                            
                        </Table>
                        </div>
                        <div className="dashboard-footer"><Link to="/leasable/pending"><Button variant="secondary">Manage</Button></Link></div>
                    </div>
                    {/*Column Three*/}
                    <div className="col">
                    <div className="dashboard-header-category">Leasable Categories</div>
                        <div className="dashboard-scroll">                        
                        <Table striped>
                            <tbody>
                            {leasableItemData.map(leasableItem => (
                                <tr key={leasableItem._id}>               
                                    <td className="thumbnail-image dashboard-scroll-col-image"><img src={leasableItem.thumbnail_url} alt="uploaded" /></td>
                                    <td className="dashboard-scroll-col-text">{leasableItem.name}</td>
                                </tr>
                                ))}                                 
                            </tbody>
                        </Table>                      
                    </div>
                    <div className="dashboard-footer"><Link to="/leasable/categories"><Button variant="secondary">Manage</Button></Link></div>
                    </div>  
                </div>
            </div>
        </Container>
        </> 
    )
}

export default LeasableDashboard;            