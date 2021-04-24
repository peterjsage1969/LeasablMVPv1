import React, {useState, useEffect} from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Form, Input } from 'reactstrap';
import api from '../services/api';
import { useLocation} from "react-router-dom";
import classnames from 'classnames';


const LeasableItemSpecificationsEdit = () => {
    const [activeTab, setActiveTab] = useState('1');   
    const {state} = useLocation();
    const [nameEdit, setNameEdit] = useState('');
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [depositPriceEdit, setDepositPriceEdit] = useState();
    const [salesPriceEdit, setSalesPriceEdit] = useState();
    const [isSuzoEcosystemEdit, setIsSuzoEcosystemEdit] = useState(false);
    const [thumbnail_urlEdit, setThumbnail_urlEdit] = useState('');  
        
    // Triggers after render
    useEffect(() => {
        setNameEdit(state.leasableItemId.name); 
        if (!descriptionEdit) {setDescriptionEdit('')} else {setDescriptionEdit(state.leasableItemId.description)};
        if (!depositPriceEdit) {setDepositPriceEdit()} else {setDepositPriceEdit(state.leasableItemId.depositPrice)};        
        if (!salesPriceEdit) {setSalesPriceEdit()} else {setSalesPriceEdit(state.leasableItemId.salesPrice)}; 
        if (!isSuzoEcosystemEdit) {setIsSuzoEcosystemEdit(false)} else {setIsSuzoEcosystemEdit(state.leasableItemId.isSuzoEcosystem)};

        setThumbnail_urlEdit(state.leasableItemId.thumbnail_url);
    },[state.leasableItemId.name,
       state.leasableItemId.description,
       state.leasableItemId.identifierCode,
       state.leasableItemId.depositPrice,
       state.leasableItemId.salesPrice,
       state.leasableItemId.isSuzoEcosystem,
       state.leasableItemId.stockLevels,
       state.leasableItemId.batchId,
       state.leasableItemId.leaseItemsPropsId,
       state.leasableItemId.thumbnail_url,
       descriptionEdit,
       depositPriceEdit,
       salesPriceEdit,
       isSuzoEcosystemEdit
    ])

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const setSubmitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');
        const leasableData = new FormData();

        // getting item id
        const leasableItemId = state.leasableItemId._id
    
        // checking and appending items
        if(nameEdit) {leasableData.append("name", nameEdit)}
        if (descriptionEdit) {leasableData.append("description", descriptionEdit)}
        if (depositPriceEdit) {leasableData.append("depositPrice", depositPriceEdit)}
        if (salesPriceEdit) {leasableData.append("salesPrice", salesPriceEdit)}
        if (isSuzoEcosystemEdit) {leasableData.append("isSuzoEcosystem", isSuzoEcosystemEdit)}           
        
        // test for values being appended
        for (var key of leasableData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
    
        // sending values to backend
        try {
            await api.post(`/leasables/${leasableItemId}`,leasableData, {headers: {user_id}})          
        } catch (error) {
            console.log("heysoso")
            Promise.reject(error);
            console.log(error);
        }
    }


    return (
    <>
    <div>
        <div className="page-body"> 

        <Form>
            <div className="details">
                <div className="details-image">
                    <img src={thumbnail_urlEdit} alt="container"/>
                </div>
                <div className="details-info">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                Specifications
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                Circulation
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <Table>
                                    <thead>
                                        <tr className="suzo-admin-thead">
                                            <th colSpan='3'>Specifications (Edit)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td colSpan='3' className="specifications-sub-bar">Core System Properties</td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td colSpan='2'>
                                                <Input type="text" value={nameEdit} id="nameEdit"  onChange={event => setNameEdit(event.target.value)}/>
                                            </td>
                                        </tr>                            
                                        <tr>
                                            <td>Description</td>
                                            <td colSpan='2'>
                                                <Input type="text" value={descriptionEdit} id="companyEdit"  onChange={event => setDescriptionEdit(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Deposit Price</td>
                                            <td colSpan='2'>
                                                <Input type="number" value={depositPriceEdit} id="depositPriceEdit"  onChange={event => setDepositPriceEdit(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sales Price</td>
                                            <td colSpan='2'>
                                                <Input type="number" value={salesPriceEdit} id="depositPriceEdit"  onChange={event => setSalesPriceEdit(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Suzo Ecosytem Ready</td>
                                            <td colSpan='2'>
                                                <Input type="select" value={isSuzoEcosystemEdit} name="isSuzo" id="exampleSelect" onChange={event => setIsSuzoEcosystemEdit(event.target.value)}>
                                                    <option value="true">Yes</option>
                                                    <option value="false">No</option>
                                                </Input> 
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td colSpan='3' className="specifications-sub-bar">Your Bespoke Properties</td>
                                        </tr>                                        
                                    </tbody>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                    </Table> 
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>
                </div>
            </div>                   
        <div className="base-button-holder">
            <Button variant="secondary">Cancel</Button>&nbsp;
            <Button variant="secondary" onClick={(evt) => setSubmitHandler(false)}>Submit</Button>
        </div>
        </Form>
        </div>         
    </div>
    </>
    )
}

  export default LeasableItemSpecificationsEdit
    
