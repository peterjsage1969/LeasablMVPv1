import React, { useState, useEffect } from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Container, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from "react-router-dom"
import classnames from 'classnames';
import api from '../../../services/api';
/*import CategoriesEdit from "./stockTypesEdit"
import CategoriesAdd from "./stockTypesAdd"
import CategoriesDelete from "./stockTypesDelete"*/

import SideLiveStockList from "../../../navigation/submenuComponents/side_liveStock"


const LiveStockList = () => {


// USER RIGHTS VIEW STATE
    const  [viewUserRights, setViewUserRights] = useState('');
    // all stock
    useEffect(() => {
        setViewUserRights('admin')
        //setViewUserRights('')
    }, []) 


// DATA COLLECTION
    // const
    const [blankStockCategoryFilteredData, setBlankStockCategoryFilteredData] = useState([]);
    const [smartCodesCategoryFilteredData, setSmartCodesCategoryFilteredData] = useState([]);
    const [preAssembledCategoryFilteredData, setPreAssembledCategoryFilteredData] = useState([]); 
    const [allCategoryData, setAllCategoryData] = useState(false);  // Total Amount      
    // all stock
    useEffect(() => {
        api.get(`/leasablecategories`)
        .then(res => {
            const allCategoryItems = res.data
            setAllCategoryData(allCategoryItems)          
        });
    }, []) 



// FILTER    
    // blank stock
    useEffect(() => {   
    const filteredResultsArray = [];       
    for (let i=0; i < allCategoryData.length; i++) {
        if(allCategoryData[i].categoryType === "Blank Stock") {
            filteredResultsArray.push(allCategoryData[i])
        }
    }
    setBlankStockCategoryFilteredData(filteredResultsArray); 
    }, [allCategoryData]) 
    // smart codes
    useEffect(() => {   
        const filteredResultsArray = [];       
        for (let i=0; i < allCategoryData.length; i++) {
            if(allCategoryData[i].categoryType === "Smart Codes") {
                filteredResultsArray.push(allCategoryData[i])
            }
        }
        setSmartCodesCategoryFilteredData(filteredResultsArray); 
    }, [allCategoryData])
    // pre assembled
    useEffect(() => {   
        const filteredResultsArray = [];       
        for (let i=0; i < allCategoryData.length; i++) {
            if(allCategoryData[i].categoryType === "Pre Assembled") {
                filteredResultsArray.push(allCategoryData[i])
            }
        }
        setPreAssembledCategoryFilteredData(filteredResultsArray); 
    }, [allCategoryData])    



// PAGE VIEWSTATE
    const [viewBlankStock, setViewBlankStock] = useState('display-none');
    const [viewSmartCodes, setViewSmartCodes] = useState('');
    const [viewPreAssembled, setViewPreAssembled] = useState('display-none');
    // change view state
    function changeStockTypeViewState(props){
        if (props.StockTypeViewState === "Blank Stock") {
            setViewBlankStock('');
            setViewSmartCodes('display-none');
            setViewPreAssembled('display-none');
        } else if (props.StockTypeViewState === "Smart Codes") {
            setViewBlankStock('display-none');
            setViewSmartCodes('');
            setViewPreAssembled('display-none');
        }  else if (props.StockTypeViewState === "Pre Assembled") {
            setViewBlankStock('display-none');
            setViewSmartCodes('display-none');
            setViewPreAssembled('');
        }
    }



// TABS
    const [activeTab, setActiveTab] = useState('2');    
    const toggleTabs = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }


// PARENT TO MODAL CHILD
    // const
    const [modal, setModal] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [popupHeight, setPopupHeight] = useState(0); //TODO
    const [categoryId, setCategoryId] = useState(''); 
    const [updateStatus, setUpdateStatus] = useState('default');
    const [categoryType, setCategoryType] = useState('');
    const toggle = (props) => {setModal(!modal);};
    // assignments
    function toggleFunction(props) {
        setUpdateStatus('default');
        setModal(!modal);
            if(props.popupStatus === "Edit") {
                setPopupStatus("Edit");
                setPopupHeight("height-500");
                setCategoryType(props.categoryType);
                setCategoryId(props.categoryId);
            } else if (props.popupStatus === "Add"){
                setPopupStatus("Add");
                setPopupHeight("height-500");
                setCategoryType(props.categoryType);
            } else if (props.popupStatus === "Delete"){
                setPopupStatus("Delete");
                setPopupHeight("height-500");
                setCategoryType(props.categoryType);
                setCategoryId(props.categoryId);
                setDeleteWarning(false);
            }   
    } 


// MODAL CHILD TO PARENT & DB 
    // const
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false); 

    // function
    function updateFromChild(props) {
        const user_id = localStorage.getItem('user');
        if(props.close === "Close") {
            setModal(!modal);
        } else {
            switch(popupStatus) {
                // add
                case "Add":     
                    try {
                        // validation and append
                        if (props.description !== '') {
                            const user_id = localStorage.getItem('user');
                            const categoryUpdate = new FormData();  
                            categoryUpdate.append("name", props.name)
                            categoryUpdate.append("date", props.date)    
                            categoryUpdate.append("thumbnail", props.thumbnail)
                            categoryUpdate.append("description", props.description)
                            categoryUpdate.append("categoryType", props.categoryType) 
                            categoryUpdate.append("smartTechnology", props.smartTechnology)   
                            api.post(`/leasablecategories`,categoryUpdate, {headers: {user_id}})
                            .then(res => {
                                // state array update - double dot??
                                const leasableCategory = res.data
                                const newCategory = {"_id":leasableCategory.leasableCategory._id,
                                                    "name":leasableCategory.leasableCategory.name,
                                                    "description":leasableCategory.leasableCategory.description,
                                                    "categoryType":leasableCategory.leasableCategory.categoryType,
                                                    "thumbnail_url":leasableCategory.leasableCategory.thumbnail_url,
                                                    "smartTechnology":leasableCategory.leasableCategory.smartTechnology};
                                const newCategoryData = allCategoryData.slice();
                                newCategoryData.push(newCategory);
                                setAllCategoryData(newCategoryData);
                                // load
                                setUpdateStatus('complete');
                                const interval = setInterval(() => {
                                    setModal(!modal);
                                    clearInterval(interval);
                                }, 2000 ); 
                            }); 
                        } else {
                            setSuccess(false);
                            setErrorMessage(true);
                        }            
                    } catch (error) {
                        Promise.reject(error);
                    }
                break;
                // delete
                case "Delete":  
                    // check for tied blank stock records
                    const user_id = localStorage.getItem('user');
                    // not tied - remove category only
                    if (props.card === 1) {
                        api.get(`/blankstock/category/${props.categoryId}`, {headers: {user_id}})
                        .then(res => {
                            const blankStockResults = res.data
                            if(blankStockResults.length > 0){
                                setDeleteWarning(true);
                                setTiedBlankStockItems(blankStockResults)
                            } else {
                                api.delete(`/leasablecategories/${props.categoryId}`) //TODO ADD USER HEADERS
                                .then(res => {
                                    // state array update
                                    const newCategoryData = allCategoryData.filter(allCategoryData => allCategoryData._id !== props.categoryId);
                                    setAllCategoryData(newCategoryData);
                                    // load
                                    setUpdateStatus('complete');
                                    const interval = setInterval(() => {
                                        setModal(!modal);
                                        clearInterval(interval);
                                    }, 2000 );                    
                                }); 
                            }
                        });
                    // tied - remove blank stock + category
                    } else if (props.card === 2) {
                       api.post(`/blankstocks/many`,{tiedBlankStockItems:tiedBlankStockItems})
                        .then(res => {
                            const resultFromBlankStock = res.data;
                        }); 
                        api.delete(`/leasablecategories/${props.categoryId}`)
                        .then(res => {
                            // state array update
                            const newCategoryData = allCategoryData.filter(allCategoryData => allCategoryData._id !== props.categoryId);
                            setAllCategoryData(newCategoryData);
                            // load
                            setUpdateStatus('complete');
                            const interval = setInterval(() => {
                                setModal(!modal);
                                clearInterval(interval);
                            }, 2000 );                        
                        }); 
                    }   
                    break;        
                // close
                case "Edit":
                    try {
                        // validation and append
                        if (props.description !== '') {
                            console.log(props.smartTechnology);
                            console.log("hohohoho")
                            const user_id = localStorage.getItem('user');
                            const categoryUpdate = new FormData();  
                            categoryUpdate.append("name", props.name)
                            categoryUpdate.append("date", props.date)    
                            categoryUpdate.append("thumbnail", props.thumbnail)
                            categoryUpdate.append("description", props.description)
                            categoryUpdate.append("categoryType", props.categoryType) 
                            categoryUpdate.append("smartTechnology", props.smartTechnology)  
                            categoryUpdate.append("categoryId", props.categoryId) 
                            api.post(`/leasablecategories/update`,categoryUpdate, {headers: {user_id}})
                            .then(res => {
                                // state array update - double dot??
                                const leasableCategory = res.data
                                const newCategory = {"_id":leasableCategory._id,
                                                    "name":leasableCategory.name,
                                                    "description":leasableCategory.description,
                                                    "categoryType":leasableCategory.categoryType,
                                                    "thumbnail_url":leasableCategory.thumbnail_url,
                                                    "thumbnail":leasableCategory.thumbnail,
                                                    "smartTechnology":leasableCategory.smartTechnology};
                                console.log(newCategory)




                                // state array update
                                for (let i=0; i < allCategoryData.length; i++) {
                                    if (allCategoryData[i]._id === leasableCategory._id) {
                                            const newAllCategoryData = [...allCategoryData];
                                            newAllCategoryData[i].name = newCategory.name;
                                            newAllCategoryData[i].description = newCategory.description;
                                            newAllCategoryData[i].categoryType = newCategory.categoryType;
                                            newAllCategoryData[i].smartTechnology = newCategory.smartTechnology;
                                            newAllCategoryData[i].thumbnail_url = newCategory.thumbnail_url;
                                            setAllCategoryData(newAllCategoryData);
                                    }
                                }




                                /*const newCategoryData = allCategoryData.slice();
                                newCategoryData.push(newCategory);
                                setAllCategoryData(newCategoryData); */
                                // load
                                setUpdateStatus('complete');
                                const interval = setInterval(() => {
                                    setModal(!modal);
                                    clearInterval(interval);
                                }, 2000 ); 
                            }); 
                        } else {
                            setSuccess(false);
                            setErrorMessage(true);
                        }            
                    } catch (error) {
                        Promise.reject(error);
                    }
                    break;
                case "Close":    
                        setModal(!modal);
                    break;                             
            default:
                
            }
        }
    }

// INFORMATION POPUPS
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [tiedBlankStockItems,setTiedBlankStockItems] = useState({});
    

return (
    <>
    {/* POPUP STATE */}
    {popupStatus != ""?
    <div>
        {deleteWarning}
    {/*    <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName="custom-modal-style">
            <ModalHeader toggle={toggle}>
                {popupStatus === "Add"?`Add ${categoryType}`:null}
                {popupStatus === "Edit"?"Edit Category":null}
                {popupStatus === "Delete"?"Delete Category":null}
            </ModalHeader>
            <ModalBody>
                {popupStatus === "Add"?<CategoriesAdd       updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus}
                                                            categoryType = {categoryType}
                                                            />:null} 
                {popupStatus === "Edit"?<CategoriesEdit     updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus} 
                                                            categoryType = {categoryType}
                                                            categoryId={categoryId}/>
                                                            :null} 
                {popupStatus === "Delete"?<CategoriesDelete updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus} 
                                                            categoryType = {categoryType}
                                                            categoryId={categoryId} 
                                                            deleteWarning={deleteWarning}
                                                            tiedBlankStockItems={tiedBlankStockItems}
                                                            />:null}            
            </ModalBody>
            </Modal> */}
    </div>:
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true}>
            <ModalHeader toggle={toggle}>
                Error
            </ModalHeader>
            <ModalBody>
                No Popup Status Selected.
            </ModalBody>
        </Modal>
    </div>
    }    



    <Container fluid>  
                <div className="row">
                    <div className="col-12">
                        <div className="row card-frame-outer margin-bottom-40">
                            <div className="col-12 card-frame-inner">
                                <div className="row height-100">
                                    <div className="col-12">
                                        <div className="side-menu-title"><h5>Filter Live Stock</h5></div>                                   
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                {/* BLANK STOCK */}      
                <div className={`row ${viewBlankStock}`}>
                    <div className="col-12"> 
                        <div className="row main-top-header-and-button">
                            <div className="col-6">
                                <h4>Blank Stock</h4>
                            </div> 
                            <div className="col-6 right">
                                <Button onClick={() => toggleFunction({ popupStatus:"Add", categoryType: "Blank Stock"})} variant="secondary">Add</Button>
                            </div>                                                                                                    
                        </div>
                        <div className="row">
                            <div className="col-12"> 
                            <Table striped className="border">                                        
                                <thead>
                                    <tr className="card-title-bar">
                                        <th className="left width-150"></th>
                                        <th className="left">Name</th>
                                        <th className="left width-200">Technology</th>
                                        <th className="width-150"></th>
                                    </tr>
                                </thead>                                                               
                                <tbody>                                                                        
                                {blankStockCategoryFilteredData.map(blankStockCategoryItem => (
                                    <tr key={blankStockCategoryItem._id}>               
                                        <td className="left"><img  className="preLive-image1-pending" src={blankStockCategoryItem.thumbnail_url} alt="uploaded" /></td>                        
                                        <td className="left"><strong>{blankStockCategoryItem.name}</strong><br/>
                                                    {blankStockCategoryItem.description}
                                        </td>                       
                                        <td className="left">{blankStockCategoryItem.smartTechnology}</td>
                                        <td>
                                            <Button onClick={() => toggleFunction({ popupStatus:"Edit", categoryType: "Blank Stock", categoryId:blankStockCategoryItem._id })} size="sm">Edit</Button>&nbsp;
                                            <Button onClick={() => toggleFunction({ popupStatus:"Delete", categoryType: "Blank Stock", categoryId:blankStockCategoryItem._id })} size="sm">Del</Button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>                                                                                                                           
                            </Table>                                                                                                        
                            </div>
                        </div>
                    </div>
                </div>
                {/* SMART CODES */}
                <div className={`row ${viewSmartCodes}`}>
                    <div className="col-12">
                        <div className=" row">
                            <div className="col-12"> 
                                <div className=" row">
                                    <div className=" col-12">
                                        <Table striped className="border">                                        
                                            <thead>
                                                <tr className="card-title-bar-active">
                                                    <th className="left width-150"></th>
                                                    <th className="left">Name</th>
                                                    <th className="left width-200">Technology</th>
                                                    <th className="width-150"></th>
                                                </tr>
                                            </thead>                                                               
                                            <tbody>                                                                        
                                            {smartCodesCategoryFilteredData.map(smartCodesCategoryItem => (
                                                <tr key={smartCodesCategoryItem._id}>               
                                                    <td className="left"><img  className="preLive-image1-pending" src={smartCodesCategoryItem.thumbnail_url} alt="uploaded" /></td>                        
                                                    <td className="left"><strong>{smartCodesCategoryItem.name}</strong><br/>
                                                                {smartCodesCategoryItem.description}
                                                    </td>                       
                                                    <td className="left">{smartCodesCategoryItem.smartTechnology}</td>
                                                    <td className="right">
                                                        {viewUserRights === "admin"?
                                                            <div className="view-admin-only">
                                                            <Button onClick={() => toggleFunction({ popupStatus:"Edit", categoryType: "Smart Codes", categoryId:smartCodesCategoryItem._id })} size="sm">Edit</Button>&nbsp;
                                                            <Button onClick={() => toggleFunction({ popupStatus:"Delete", categoryType: "Smart Codes", categoryId:smartCodesCategoryItem._id })} size="sm">Del</Button>
                                                            </div>
                                                        :null}
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
                {/* PRE ASSEMBLED */}
                <div className={`row ${viewPreAssembled}`}>
                    <div className="col-12">
                        <div className="row main-top-header-and-button">
                            <div className="col-6">
                                <h4>Pre Assembled</h4>
                            </div> 
                            <div className="col-6 right">
                            <Button onClick={() => toggleFunction({ popupStatus:"Add", categoryType: "Pre Assembled"})} variant="secondary">Add</Button>
                            </div>                                                                                                    
                        </div>
                        <div className=" row">
                            <div className=" col-12">
                                <Table striped>                                        
                                    <thead>
                                        <tr className="card-title-bar">
                                            <th className="left width-150"></th>
                                            <th className="left">Name</th>
                                            <th className="left width-200">Technology</th>
                                            <th className="width-150"></th>
                                        </tr>
                                    </thead>                                                               
                                    <tbody>                                                                        
                                    {preAssembledCategoryFilteredData.map(preAssembledCategoryItem => ( 
                                        <tr key={preAssembledCategoryItem._id}>             
                                            <td>
                                                <div className="preLive-parent-pending">
                                                    <img  className="preLive-image1-pending" src={preAssembledCategoryItem.thumbnail_url} alt="uploaded" />                                                                            
                                                    {preAssembledCategoryItem.smartTechnology==="QR codes"?
                                                    <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                    {preAssembledCategoryItem.smartTechnology==="RFID chips"?
                                                    <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                </div>   
                                            </td>
                                            <td className="left"><strong>{preAssembledCategoryItem.name}</strong><br/>
                                                        {preAssembledCategoryItem.description}
                                            </td>                       
                                            <td className="left">{preAssembledCategoryItem.smartTechnology}</td>
                                            <td>
                                                <Button onClick={() => toggleFunction({ popupStatus:"Edit", categoryType: "Pre Assembled", categoryId:preAssembledCategoryItem._id })} size="sm">Edit</Button>&nbsp;
                                                <Button onClick={() => toggleFunction({ popupStatus:"Delete", categoryType: "Pre Assembled", categoryId:preAssembledCategoryItem._id })} size="sm">Del</Button>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>                                                                                                                           
                                </Table>
                            </div>
                        </div>                                                                                                       
                    </div>
                </div>
    </Container>

    </>
    )
}

export default LiveStockList;
