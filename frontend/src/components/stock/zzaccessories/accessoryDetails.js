import React, {useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { AccessoriesContext } from "../accessories/accessoriesContext";
import AccessoriesEdit from "./accessoriesEditAdd";


const AccessoryDetails = (props) => {


// HISTORY
    const history = useHistory();    



// CONTEXT
    const {accessoriesListObj,
        showAccessoriesListObj,
        pageStateViewObj, 
        accessoryDataObj,
        clickHistoryObj,
        accessoryIdObj
        } = React.useContext(AccessoriesContext);
    const [accessoriesList, setAccessoriesList] = accessoriesListObj;
    const [showAccessoriesList, setShowAccessoriesList] = showAccessoriesListObj;
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [accessoryId, setAccessoryId] = accessoryIdObj;
    const [accessoryData, setAccessoryData] = accessoryDataObj;



// CONTEXT GET
    // data
    const [name, setName] = useState('');  
    const [thumbnail_url, setThumbnail_url] = useState(null);
    useEffect(() => { 
        if(accessoryData){
            setName(accessoryData.name);
            setThumbnail_url(accessoryData.thumbnail_url);
        };
    }, [accessoryData]) 



// TABS
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => { if(activeTab !== tab) setActiveTab(tab); }


    

    return (
    <>
       <div>
        <Container fluid>  
        <div className=" row padding-0 margin-0">
            <div className="col-12">
                <div>
                    <h4>{name}</h4>
                </div>               
            </div>
        </div>
        <div className=" row margin-0">
            <div className="col-4">
                <div  className="padding-top-100 center">
                    <img src={thumbnail_url} alt={name} className="width-300"/>
                </div>                
            </div>
            <div className="col-8">  
                <Nav tabs  className="tabs-holder">
                    <NavItem className="tab-last">
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >Details</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >Stock</NavLink>
                    </NavItem>                                  
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="card-frame-inner vvy-lt-grey-panel height-500">
                        <AccessoriesEdit/>
                    </TabPane>
                    <TabPane tabId="2" className="lt-grey-panel height-500">
                        stock
                    </TabPane>
                </TabContent>
            </div>                               
                </div>
        </Container>
        </div>
    </>
    )
}

  export default AccessoryDetails