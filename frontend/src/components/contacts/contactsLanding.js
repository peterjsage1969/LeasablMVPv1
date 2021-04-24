











import React from "react";
import { Container } from 'reactstrap';
import NavbarPage from "../../navigation/navAdmin";
import SideContactLanding from "../../navigation/submenuComponents/side_contactLanding";

const ContactsLanding = () => {

 
    return (
        <>
        <Container fluid>  
            <div className="row page-body-container-no-title">
                <div className="col-1"></div>
                <div className="col-3">
                    <SideContactLanding/>  
                </div> 
                <div className="col-7"></div>
                <div className="col-1"></div>   
            </div>
        </Container>
        </> 
    )
}


export default ContactsLanding;            