import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Container } from 'reactstrap';
import NavbarPage from "../../navigation/navAdmin";
import ContactsLanding from "../../components/contacts/contactsLanding"

const ContactsHome = () => {

 
    return (
        <>
        <div><NavbarPage /></div>
        <Container fluid>
        <div className="page-body-core">
            {/* top sub menu */}
            <div className="row card-frame-outer">
                <div className="col-1"></div>
                <div className="col-10 card-frame-inner">
                    <div className="row">
                        <div className="col-1"></div>
                        <div className="col-3"></div> 
                        <div className="col-5 top-menu">
                            <div><Link to={`/stock/stockTypes`}>Your Details</Link></div>
                            <div><Link to={`/stock/liveStock`}>Your Team</Link></div> 
                            <div><Link to={`/stock/liveStock`}>Your Customers</Link></div>                                                                                                          
                        </div>
                        <div className="col-3"></div>             
                    </div>
                </div>
                <div className="col-1"></div>
            </div> 
            <div><ContactsLanding/></div>
        </div>
        </Container>
        </> 
    )
}


export default ContactsHome;            