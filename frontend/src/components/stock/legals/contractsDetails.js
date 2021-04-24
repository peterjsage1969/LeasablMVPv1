import React, {useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import ContractAdd from "./contractAdd"

const ContractDetails = (props) => {


// HISTORY
    const history = useHistory();    



// TABS
const [activeTab, setActiveTab] = useState('1');
const toggle = tab => { if(activeTab !== tab) setActiveTab(tab); }


    return (
    <>
       <div>
        <Container fluid>  
            <div className=" row margin-0">
                <div className="col-12">
                    <div>
                        <h4>Contracts</h4>
                    </div>               
                </div>
            </div>
            <div className="row margin-0">
                <div className="col-12 card-frame-inner">
                    <div className="padding-top-20">
                        <ContractAdd/>                                
                    </div>
                </div>                              
            </div>
        </Container>
        </div>
    </>
    )
}

  export default ContractDetails
