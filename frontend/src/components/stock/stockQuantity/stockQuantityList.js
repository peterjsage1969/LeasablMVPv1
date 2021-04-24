import React, {useState, useEffect} from "react";
import { Container, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import Moment from 'moment';
import api from "../../../services/api";
import StockQuantityAddEdit from "./stockQuantityAddEdit";
import StockQuantityDelete from "./stockQuantityDelete";
import { StockItemContext } from "../Items/stockItemsContext";
import { StockQuantityContext } from "./stockQuantityContext";


const StockQuantityList = (props) => {
    
    
// CONTEXT STOCK ITEMS
    const {pageStateViewObj, 
            stockItemIdObj,  
            stockItemUpdateStatusObj,
            stockItemNameObj,
            stockItemFilterObj
        } = React.useContext(StockItemContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [stockItemId, setStockItemId] = stockItemIdObj;
    const [stockItemName, setStockItemName] = stockItemNameObj;
    const [updateStatus, setUpdateStatus] = stockItemUpdateStatusObj; 
    const [stockItemFilter, setStockItemFilter] = stockItemFilterObj;
        

// CONTEXT STOCK ENTRIES
    const {stockDataObj, 
           stockListObj,
           stockTypeObj,
           stockIdObj,
           stockTotalObj
    } = React.useContext(StockQuantityContext);
    const [stockData, setStockData] = stockDataObj; 
    const [stockList, setStockList] = stockListObj;
    const [stockType, setStockType] = stockTypeObj;
    const [stockId, setStockId] = stockIdObj;
    const [stockTotal, setStockTotal] = stockTotalObj;
    
// LOCALE
    const [updateList, setUpdateList] = useState(false);
    const [popupStatus, setPopupStatus] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};
    
    
// PAGE DATA
    // collect
        useEffect(() => { 
            const user_id = localStorage.getItem('user');
            const stockCollect = new FormData();             
            stockCollect.append("productId", stockItemId)
            api.post(`/accessorystockdetails/byproductid`, stockCollect, {headers: {user_id}})
            .then(res => {
                setStockList(res.data.stock)
            });
        }, [stockItemId])
    // dropdown
    const [stockTypeValues, setStockTypeValues] = useState([]);    
    useEffect(() => {setStockTypeValues(["QR codes","RFID chips"])}, [])
    // total
    useEffect(() => { 
        var stockCount = 0;
        for (let i=0; i < stockList.length; i++) {                  
            stockCount = stockCount + stockList[i].quantity;
        }
        setStockTotal(stockCount);
    }, [stockList])    

    
    
// ADD, EDIT & DELETE
    function popUpSetter(props) {
        if (props.popupStatus === 'addNew') {
            setPopupStatus(props.popupStatus)
            setStockType("New Stock");
            toggle();
        }
        if (props.popupStatus === 'writeOff') {
            setPopupStatus(props.popupStatus)
            setStockType("Write Off");
            toggle();
        }
        if (props.popupStatus === 'edit') {
            console.log("000")
            setPopupStatus(props.popupStatus)
            setStockId(props.stockId);
            toggle();
        }        
        if (props.popupStatus === 'delete') {
            setPopupStatus(props.popupStatus);
            setStockId(props.stockId);
            toggle();
        }
    }        
    

// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
        if(updateStatus) {
            setLocalUpdateStatus(updateStatus);
            if (updateStatus === "close") {
                toggle();
                setUpdateStatus("default");
                setPageViewState([{bodyComponent:"viewList"}])
            }
        }
    }, [updateStatus]) 


    
    return (
    <>
    {popupStatus != ""?
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName="custom-modal-style">
            <ModalHeader toggle={toggle}>
                {popupStatus === "addNew"?"Add New Stock Entry":null}
                {popupStatus === "writeOff"?"Write Off Stock":null}
                {popupStatus === "edit"?"Edit Stock Entry":null}
                {popupStatus === "delete"?"Delete Stock Entry":null}
            </ModalHeader>
            <ModalBody>
                { popupStatus === "addNew"?<StockQuantityAddEdit popupCrud="add"/>:null}
                { popupStatus === "writeOff"?<StockQuantityAddEdit popupCrud="add"/>:null} 
                { popupStatus === "edit"?<StockQuantityAddEdit popupCrud="edit"/>:null} 
                { popupStatus === "delete"?<StockQuantityDelete/>:null}            
            </ModalBody>
            </Modal>
    </div>
    : null}
        <Container fluid>
            <div className=" row margin-0">
                <div className="col-12 padding-0 ">
                    <div>
                    <h4 className="contents-top-title">{stockItemFilter} | {stockItemName}</h4>
                    </div>               
                </div> 
            </div>                
            <div className=" row margin-0">
                <div className="col-6 padding-0"> 
                    <h5 className="contents-second-title">Stock Ledger</h5>
                </div>
                <div className="col-6 padding-0 right">   
                    <div>
                        <Button variant="secondary" onClick={() => popUpSetter({ popupStatus:"addNew" })} size="sm">Add New Stock</Button>&nbsp;
                        <Button variant="secondary" onClick={() => popUpSetter({ popupStatus:"writeOff" })} size="sm">Write off Stocks</Button> 
                    </div>                                       
                </div>
            </div>

            <div className=" row margin-0 header-dk">
                <div className="col-3">
                    Type
                </div>
                <div className="col-3">
                    Date
                </div>
                <div className="col-3 center">
                    Quantity
                </div>
                <div className="col-3">
                </div>                                                                                                                               
            </div>
            
                {stockList.length>0 ? stockList.map(stockEntry => (
                <div key={stockEntry._id} className= "row striped-list margin-0 padding-top-20 padding-bottom-20">
                    <div className="col-3">{stockEntry.type}</div>
                    <div className="col-3">{Moment(stockEntry.date).format('DD/MM/YYYY')}</div>
                    <div className="col-3 center">{stockEntry.quantity}</div>
                    <div className="col-3 right padding-right-20">
                    <Button  onClick={() => popUpSetter({ popupStatus:"delete", stockId:stockEntry._id})}size="sm">Delete</Button>&nbsp;
                    <Button  onClick={() => popUpSetter({ popupStatus:"edit", stockId:stockEntry._id })}size="sm">Edit</Button>                                                                                              
                    </div>
                </div>                                
                )): "You currently have no product templates for "}  
            {stockList.length>0?
            <div className = "row margin-0 total-dk">
                <div className="col-6">
                    <strong>Total Stock</strong>
                </div>
                <div className="col-3 center">
                    <strong>{stockTotal}</strong>
                </div> 
                <div className="col-3 ">
                </div>                    
            </div>:null}                                                                                                  
        </Container>
    </>
    )
}


export default StockQuantityList ;