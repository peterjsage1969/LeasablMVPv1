import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { Container } from 'reactstrap';
import NavbarPage from "../../navigation/navAdmin";
import FinancesLanding from "../../components/finances/financesLanding"

const FinancesHome = () => {

 
    return (
        <>
        <div><NavbarPage /></div>
        <Container fluid>
            <div className="page-body-core">
                {/* top menu */} 
                <div className="row card-frame-outer">
                        <div className="col-1"></div>                      
                        <div className="col-10 card-frame-inner">
                            <div className="row">
                                <div className="col-1"></div>
                                <div className="col-3"></div> 
                                <div className="col-5 top-menu">
                                    <div><Link to={`/stock/stockTypes`} className="link-body-black">Ledger</Link></div>
                                    <div><Link to={`/stock/liveStock`} className="link-body-black">Your Account</Link></div> 
                                    <div><Link to={`/stock/liveStock`} className="link-body-black">Banking Requests</Link></div>                   
                                </div>
                                <div className="col-3"></div>             
                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                {/* body */} 
                <div className="row card-frame-outer">
                    <div className="col-1"></div>     
                    <div className="col-10 card-frame-inner">
                        <FinancesLanding/>
                    </div>
                    <div className="col-1"></div>
                </div>
            </div>
        </Container>
        </> 
    )
}


export default FinancesHome;            