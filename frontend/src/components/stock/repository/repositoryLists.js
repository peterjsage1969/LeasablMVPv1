import React, { useState, useEffect } from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Container, Modal, ModalHeader, ModalBody, Alert} from 'reactstrap';
import axios from "axios";
import moment from 'moment';
import classnames from 'classnames';
import { Link} from 'react-router-dom';
import api from '../../../services/api';
import SmartStockBatchDetailsEdit from "./SmartStockBatchDetailsEdit";
import SmartStockBatchDetailsAdd from "./SmartStockBatchDetailsAdd";
import SmartStockBatchDetailsDelete from "./SmartStockBatchDetailsDelete";
import BlankStockEdit from "./blankStockEdit";
import BlankStockAdd from "./blankStockAdd";
import BlankStockDelete from "./blankStockDelete";
import SmartCodesEdit from "./smartCodesEdit";
import SmartCodesAdd from "./smartCodesAdd";
import SmartCodesDelete from "./smartCodesDelete";


const RepositoryComponents = (props) => {


// COLLECTING DATA
    // const
    const [smartCodeData, setSmartCodeData] = useState([]);
    const [blankStockData, setBlankStockData] = useState([]);
    const [smartStockData, setSmartStockData] = useState([]); 
    // smartcodes
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/smartcodes`,{headers: {user_id}})
        .then(res => {
            const smartCodes = res.data
            setSmartCodeData(smartCodes)
        });
    }, [])
    // blank stock
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/blankstock`,{headers: {user_id}})
        .then(res => {
            const blankStockBatches = res.data
            setBlankStockData(blankStockBatches)
        });
    }, [])
    // pre assembled
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/smartstockbatches`,{headers: {user_id}})
        .then(res => {
            const smartStockBatches = res.data
            setSmartStockData(smartStockBatches);
        });
    }, [])


// TABS
    const [activeTab, setActiveTab] = useState('1');    
    const toggleTabs = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

// ZERO STOCK
const [cardZeroBlankStock, setCardZeroBlankStock] = useState('display-none')
const [cardSomeBlankStock, setCardSomeBlankStock] = useState('')
    useEffect(() => {
        if (blankStockData.length === 0) {
            setCardZeroBlankStock('');
            setCardSomeBlankStock('display-none');
        } else {
            setCardZeroBlankStock('display-none');
            setCardSomeBlankStock('');
        }

    }, [blankStockData])


// PARENT TO MODAL CHILD
    // const
    const [modal, setModal] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupPageCategory, setPopupPageCategory] = useState('');
    const [popupHeight, setPopupHeight] = useState(0);
    const [smartCodeId, setSmartCodeId] = useState(''); 
    const [blankStockId, setBlankStockId] = useState('');
    const [leasableCategoryId, setLeasableCategoryId] = useState(''); 
    const [associatedLeasableCategoryName, setAssociatedLeasableCategoryName] = useState(''); 
    const [associatedLeasableCategoryThumbnail_url, setAssociatedLeasableCategoryThumbnail_url] = useState('');  
    const [updateStatus, setUpdateStatus] = useState('default');
    const toggle = (props) => {setModal(!modal);};
    // assignments
    function toggleFunction(props) {
        setUpdateStatus('default');
        setModal(!modal);
        switch(props.popupStatusPage) {
            case "Smart Stock":
                setPopupPageCategory("Smart Stock")
                if(props.popupStatus === "Edit") {
                    setPopupStatus("Edit");
                    setPopupHeight("height-500");
                    setSmartCodeId(props.smartStock._id);
                } else if (props.popupStatus === "Add"){
                    setPopupStatus("Add");
                    setPopupHeight("height-500");
                } else if (props.popupStatus === "Delete"){
                    setPopupStatus("Delete");
                    setSmartCodeId(props.smartStock._id);
                    setPopupHeight("height-500");
                }
            break;
            case "Blank Stock":
                setPopupPageCategory("Blank Stock")
                if(props.popupStatus === "Edit") {
                    setPopupStatus("Edit");
                    setBlankStockId(props.blankStock._id);
                    setPopupHeight("height-500");
                } else if (props.popupStatus === "Add"){
                    setPopupStatus("Add");
                    setPopupHeight("height-500");
                } else if (props.popupStatus === "Delete"){
                    setPopupStatus("Delete");
                    setBlankStockId(props.blankStock._id);
                    setAssociatedLeasableCategoryName(props.associatedLeasableCategoryName);
                    setAssociatedLeasableCategoryThumbnail_url(props.associatedLeasableCategoryThumbnail_url);
                    setPopupHeight("height-500");
                }
            break;
            case "Smart Codes":
                setPopupPageCategory("Smart Codes")
                if(props.popupStatus === "Edit") {
                    setPopupStatus("Edit");
                    setSmartCodeId(props.smartCode._id); //TODO - Smart Code Id?
                    setPopupHeight("height-530");
                } else if (props.popupStatus === "Add"){
                    setPopupStatus("Add");
                    setPopupHeight("height-530");
                } else if (props.popupStatus === "Delete"){
                    setPopupStatus("Delete");
                    setPopupHeight("height-500");
                    setSmartCodeId(props.smartCode._id);
                }
            break;
            default:
                Alert.alert("NUMBER NOT FOUND");
        }
    } 



// MODAL CHILD TO PARENT & DB
    const [name, setName] = useState(''); //TODO
    const [date, setDate] = useState('');
    const [smartTechnology, setSmartTechnology] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');  
    function updateFromChild(props) {
        setUpdateStatus('updating');
        // mounting
        setSmartCodeId(props.smartCodeId);
        setName(props.name);
        setDate(props.date);
        setSmartTechnology(props.smartTechnology);
        setStockQuantity(props.stockQuantity);
        // user id
        const user_id = localStorage.getItem('user');
        // SMART CODES
        if(popupPageCategory === "Smart Codes") {
            switch(popupStatus) {
            // add
            case "Add":
                api.post("/smartcodes",{"name":props.name,"date":props.date,"smartTechnology":props.smartTechnology,"stockQuantity":props.stockQuantity}, {headers: {user_id}})
                .then(res => {
                    const smartCodes = res.data
                    // state array update
                    const newSmartCode = {"_id":smartCodes._id,"name":smartCodes.name,"date":smartCodes.date,"smartTechnology":smartCodes.smartTechnology,"stockQuantity":smartCodes.stockQuantity};
                    const newSmartCodeData = smartCodeData.slice();
                    newSmartCodeData.push(newSmartCode);
                    setSmartCodeData(newSmartCodeData);
                    // load
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );
                });
            break;
            // edit
            case "Edit":
                api.post(`/smartcodes/update/${props.smartCodeId}`,{"name":props.name,"date":props.date,"smartTechnology":props.smartTechnology,"stockQuantity":props.stockQuantity}, {headers: {user_id}})
                .then(res => {
                    const smartCodes = res.data
                    // state array update
                    for (let i=0; i < smartCodeData.length; i++) {
                        if (smartCodeData[i]._id === smartCodes._id) {
                                const newSmartCodeData = [...smartCodeData];
                                newSmartCodeData[i].date = smartCodes.date;
                                newSmartCodeData[i].smartTechnology = smartCodes.smartTechnology;
                                newSmartCodeData[i].stockQuantity = smartCodes.stockQuantity;
                                setSmartCodeData(newSmartCodeData);
                        }
                    }
                    // load
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );
                });             
            break;
            // delete
            case "Delete":
                api.delete(`/smartcodes/${props.smartCodeId}`)
                .then(res => {
                    // state array update
                    //const smartCode = {"name":props.name,"date":props.date,"smartTechnology":props.smartTechnology,"stockQuantity":props.stockQuantity};
                    const newSmartCodeData = smartCodeData.filter(smartCodeData => smartCodeData._id !== props.smartCodeId);
                    setSmartCodeData(newSmartCodeData);
                    // load
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );                    
                });           
            break;
            default:
                Alert.alert("CASE NOT FOUND");
            }
        // BLANK STOCK
        } else if(popupPageCategory === "Blank Stock") {
            switch(popupStatus) {
            // add   
            case "Add":
                    api.post("/blankstock",{"name":props.name,"date":props.date,"stockQuantity":props.stockQuantity,"associatedLeasableCategory":props.associatedLeasableCategory}, {headers: {user_id}})
                    .then(res => {
                        const blankStock = res.data
                        //console.log(blankStock);
                        // state array update
                        const newBlankStock = {"_id":blankStock._id,"name":blankStock.name,"date":blankStock.date,"stockQuantity":blankStock.stockQuantity,"associatedLeasableCategory":blankStock.associatedLeasableCategory};
                        const newBlankStockData = blankStockData.slice();
                        newBlankStockData.push(newBlankStock);
                        setBlankStockData(newBlankStockData);
                        // load
                        setUpdateStatus('complete');
                        const interval = setInterval(() => {
                            setModal(!modal);
                            clearInterval(interval);
                        }, 2000 );
                    });
                break;            
            // edit
            case "Edit":          
            api.post(`/blankstock/update/${props.blankStockId}`,{"name":props.name,"date":props.date,"stockQuantity":props.stockQuantity,"associatedLeasableCategory":props.associatedLeasableCategory}, {headers: {user_id}})
            .then(res => {
                const blankStock = res.data
                api.get(`/leasablecategories/${props.associatedLeasableCategory}`,{headers: {user_id}})
                .then(res => {
                    const leasableCategory= res.data
                    console.log(leasableCategory)
                    // state array update
                    for (let i=0; i < blankStockData.length; i++) {
                        if (blankStockData[i]._id === blankStock._id) {
                                const newBlankStockData = [...blankStockData];
                                newBlankStockData[i].date = blankStock.date;
                                newBlankStockData[i].associatedLeasableCategory = leasableCategory;
                                newBlankStockData[i].stockQuantity = blankStock.stockQuantity;
                                setBlankStockData(newBlankStockData);
                        }
                    }
                    // load
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );
                });
            });             
        break;    
            // delete
            case "Delete":
                api.delete(`blankstock/${props.blankStockId}`)
                .then(res => {
                    // state array update
                    // const blankStock = {"name":props.name,"date":props.date,"stockQuantity":props.stockQuantity};
                    const newBlankStockData = blankStockData.filter(blankStockData => blankStockData._id !== props.blankStockId);
                    setBlankStockData(newBlankStockData);
                    // load
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );                    
                });           
            break;                
            default:
                Alert.alert("CASE NOT FOUND");
            }
        }
    }


     
 

    return (
        <>
        {/* POPUPS */}
        {popupStatus != ""?
        <div>
            <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName={`custom-modal-style ${popupHeight}`}>
                <ModalHeader toggle={toggle}>
                    {`${popupStatus} | ${popupPageCategory}`}
                </ModalHeader>
                <ModalBody>
                {/* Smart Stock Popups
                {popupPageCategory === "Smart Stock" && popupStatus === "Edit"? <SmartStockBatchDetailsEdit smartStockBatch={passableIdToEdit}
                    onChange={value => {setStateUpdateFromChild(value);
                    setModal(!modal)}}/>:null}
                {popupPageCategory === "Smart Stock" && popupStatus === "Add"? <SmartStockBatchDetailsAdd onChange={value => {setStateUpdateFromChild(value);
                    setModal(!modal)}}/>:null}
                {popupPageCategory === "Smart Stock" && popupStatus === "Delete"? <SmartStockBatchDetailsDelete smartStockBatch={passableIdToEdit}
                    onChange={value => {setStateUpdateFromChild(value); setModal(!modal)}}/>:null}  */}
               

                {/* Blank Stock */}
                {popupPageCategory === "Blank Stock" && popupStatus === "Add"? 
                    <BlankStockAdd updateFromChild={updateFromChild} 
                                    blankStockId={blankStockId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}
                                    />:null}
                 {popupPageCategory === "Blank Stock" && popupStatus === "Edit"? 
                    <BlankStockEdit updateFromChild={updateFromChild} 
                                    blankStockId={blankStockId} 
                                    leasableCategoryId={leasableCategoryId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}
                                    />:null}       
                 {popupPageCategory === "Blank Stock" && popupStatus === "Delete"? 
                    <BlankStockDelete updateFromChild={updateFromChild} 
                                    blankStockId={blankStockId} 
                                    leasableCategoryId={leasableCategoryId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}
                                    />:null}
                {/* Smart Codes */}
                {popupPageCategory === "Smart Codes" && popupStatus === "Add"? 
                    <SmartCodesAdd updateFromChild={updateFromChild} 
                                    smartCodeId={smartCodeId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}
                                    />:null}
                {popupPageCategory === "Smart Codes" && popupStatus === "Edit"? 
                    <SmartCodesEdit updateFromChild={updateFromChild} 
                                    smartCodeId={smartCodeId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}
                                    />:null}
                {popupPageCategory === "Smart Codes" && popupStatus === "Delete"? 
                    <SmartCodesDelete updateFromChild={updateFromChild} 
                                    smartCodeId={smartCodeId} 
                                    popupStatus={popupStatus} 
                                    updateStatus={updateStatus}/>:null}    
                </ModalBody>
            </Modal>
        </div>:
        <div>
            <Modal isOpen={modal} toggle={toggle} centered={true}>
                <ModalHeader toggle={toggle}>
                    Error: No Match Selected
                </ModalHeader>
                <ModalBody>
                    You have not selected a smart stock or blank stock match. Please do so before attempting to activate components.
                </ModalBody>
            </Modal>
        </div>
        }

        <Container fluid>
        <div className="row page-body-container-no-title">
            <div className="col-1">
            </div>
            <div className="col-10 page-body-content-container">
                {/* TABS */}
                <Nav tabs>
                <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { toggleTabs('1'); }}>
                            <h6>Blank Stock Items</h6>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggleTabs('2'); }}>
                            <h6>Smart Codes Items</h6>
                        </NavLink>
                    </NavItem> 
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { toggleTabs('3'); }}>
                            <h6>Pre Assembled Items</h6>
                        </NavLink>
                    </NavItem>  
                </Nav>
                <TabContent activeTab={activeTab}>
                    {/* COMPONENTS */}
                    <TabPane tabId="1" className="">                     
                        <div className="row card-frame-outer">                
                            <div className="col-12 card-frame-inner">
                                <div className=" row"> 
                                {/* BLANK STOCK */}
                                <div className="col-12 card-container">
                                    <div className=" row">
                                        <div className="col-12 card-right">                                    
                                            <div className=" row">
                                                <div className="col-12">
                                                    {/* header */}
                                                    <div className="row">
                                                        <div className="col-12 card-title-bar">
                                                            <div className="row">
                                                                <div className="col-12">                                                    
                                                                    <h5>Blank Stock</h5>
                                                                </div>
                                                                <div className="col-12 right">                                                    
                                                                <Link to="/leasable/categories"><Button size="sm" className="btn-top-bar">Categories</Button></Link>&nbsp;
                                                                <Button size="sm" className="btn-top-bar" onClick={() => toggleFunction({popupStatusPage:"Blank Stock",popupStatus:"Add"})}>Add New</Button>                                                                             
                                                                </div>                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                                                      
                                            {/* scroller */}
                                            <div className="row scroller-container">
                                                <div className={`col-12 scroller-content-new ${cardSomeBlankStock}`}>
                                                    <Table striped>                               
                                                    <tbody>                                        
                                                        { blankStockData.map(blankStock => (
                                                            <tr key={blankStock._id}>
                                                                <td>
                                                                    <div className="leasable-parent-pending">
                                                                    {(blankStock.associatedLeasableCategory)?
                                                                        <img src={blankStock.associatedLeasableCategory.thumbnail_url}  alt="has_object" className="preLive-image1-pending"/>:"here"}
                                                                    </div>
                                                                </td>
                                                                <td className="left">
                                                                    {(blankStock.associatedLeasableCategory)?
                                                                        <div><strong>{blankStock.associatedLeasableCategory.name}</strong><br/></div>:null}
                                                                    {moment(blankStock.date).format('DD/MM/YY')}                                                                                                                                       
                                                                </td>
                                                                <td>
                                                                    {blankStock.stockQuantity}
                                                                </td>
                                                                <td className="right">
                                                                    <Button size="sm" onClick={() => toggleFunction({blankStock,
                                                                                                            popupStatusPage:"Blank Stock",
                                                                                                            popupStatus:"Edit",
                                                                                                            associatedLeasableCategoryName: blankStock.associatedLeasableCategory.name,
                                                                                                            associatedLeasableCategoryThumbnail_url: blankStock.associatedLeasableCategory.thumbnail_url
                                                                                                            })}>Edit</Button>&nbsp;
                                                                    <Button onClick={() => toggleFunction({blankStock,
                                                                                                            popupStatusPage:"Blank Stock",
                                                                                                            popupStatus:"Delete",
                                                                                                            associatedLeasableCategoryName: blankStock.associatedLeasableCategory.name,
                                                                                                            associatedLeasableCategoryThumbnail_url: blankStock.associatedLeasableCategory.thumbnail_url
                                                                                                            })} size="sm">Del </Button>                                                                                              
                                                                </td>
                                                            </tr>
                                                        )) }                                                                        
                                                    </tbody>                                    
                                                    </Table>
                                                </div> 
                                                <div className={`col-12 scroller-content-new padding-top-20 ${cardZeroBlankStock}`}>You currently have no blank stock.</div>
                                            </div>
                                        </div>                     
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>                   
                    </TabPane>

                    {/* SMART CODES - card left */}
                    <TabPane tabId="2">                     
                        <div className="row card-frame-outer">                
                            <div className="col-12 card-frame-inner">
                                <div className=" row">                                
                                <div className="col-12 card-container">
                                    <div className=" row">
                                        <div className="col-12 card-left">                                    
                                            <div className=" row">
                                                <div className="col-12">
                                                    {/* header */}
                                                    <div className="row">
                                                        <div className="col-12 card-title-bar">
                                                            <div className="row">
                                                                <div className="col-12">                                                    
                                                                    <h5>Smart Codes</h5>
                                                                </div>
                                                                <div className="col-12 right">                                                    
                                                                    <Button size="sm" className="btn-top-bar" onClick={() => toggleFunction({popupStatusPage:"Smart Codes",popupStatus:"Add"})}>Add New</Button>&nbsp;     
                                                                </div>                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* scroll */}  
                                    <div className="row scroller-container">
                                        <div className="col-12 scroller-content-new">                            
                                            <Table striped>
                                                <tbody>
                                                    {smartCodeData.map(smartCode => (
                                                    <tr key={smartCode._id}>                                                                         
                                                        <td>
                                                            <div className="leasable-parent-pending">
                                                                {smartCode.smartTechnology==="QR codes"?
                                                                    <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image1-pending" alt="holding"/>:null}
                                                                {smartCode.smartTechnology==="RFID chips"?
                                                                    <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image1-pending" alt="holding"/>:null}
                                                            </div>
                                                        </td>
                                                        <td className="left">
                                                            <strong>{smartCode.smartTechnology}</strong><br/>
                                                            {moment(smartCode.date).format('DD/MM/YY')}
                                                        </td>
                                                        <td>{smartCode.stockQuantity}</td>
                                                        <td className="right">
                                                        <Button onClick={() => toggleFunction({smartCode,popupStatusPage:"Smart Codes",popupStatus:"Edit"})} size="sm">Edit</Button>&nbsp;
                                                        <Button onClick={() => toggleFunction({smartCode,popupStatusPage:"Smart Codes",popupStatus:"Delete"})} size="sm">Del </Button>
                                                        </td>
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>                   
                    </TabPane>

                    {/* PREASSEMBLED */}
                    <TabPane tabId="3">  
                        <div className="row card-frame">
                            <div className="col-12 card-frame-divider-full-tabs">
                                <div className=" row card-container">
                                    <div className="col-12 card-single">
                                        <div className="row card-header-container">
                                            <div className="col-6 card-title">
                                                <h5>Smart Stock</h5>
                                            </div>
                                            <div className="col-6 card-header-btn">
                                                <Button size="sm" className="btn-top-bar" onClick={() => toggleFunction({popupStatusPage:"Smart Codes",popupStatusInput:"Add"})}>Add Smart Codes</Button>&nbsp;     
                                            </div> 
                                        </div>    
                                        <div className="row card-scroller-container">
                                            <div className="col-12 card-scroller-content">
                                                <Table striped>
                                            <tbody>
                                                {(smartStockData && smartStockData.length>0)?null:<tr><td colSpan="6">You currently have no pending Smart Stock</td></tr>}{smartStockData.map(smartStock => (
                                                <tr key={smartStock._id}>
                                                    <td className="smartStock-table-col1">
                                                        <div className="preLive-parent-pending">
                                                        {(smartStock.associatedLeasableCategory)?
                                                            <img src={smartStock.associatedLeasableCategory.thumbnail_url}  alt="has_object" className="preLive-image1-pending"/>:null}
                                                            {smartStock.initialSmartTechnology==="QR codes"?
                                                                <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                            {smartStock.initialSmartTechnology==="RFID chips"?
                                                                <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                        </div>
                                                    </td>
                                                    <td className="smartStock-table-col2">{smartStock.name}</td>
                                                    <td className="smartStock-table-col3">{moment(smartStock.date).format('DD/MM/YYYY')}</td>
                                                    <td className="smartStock-table-col4">{smartStock.initialSmartTechnology}</td>
                                                    <td className="smartStock-table-col5">{smartStock.initialStockNumber}</td>
                                                    <td className="smartStock-table-col6">X                                             
                                                    </td>
                                                </tr>
                                                ))}
                                            </tbody>
                                            </Table>
                                            </div>
                                        </div>                                        
                                    </div>                                       
                                </div>
                            </div>
                        </div>                    
                    </TabPane>
                </TabContent>
            </div>
            <div className="col-1"></div>
        </div>
        </Container>
        </>
    )
}

export default RepositoryComponents;
