import React, {useState, useEffect} from "react";
import { Container, Button, Alert, Input } from 'reactstrap';
import Moment from 'moment';
import api from "../../../services/api";
import { StockItemContext } from "../Items/stockItemsContext";
import { StockQuantityContext } from "./stockQuantityContext";


const StockQuantityAddEdit = (props) => {


// CONTEXT STOCK ITEMS
const {stockItemIdObj, 
    stockItemDataObj, 
    stockItemUpdateStatusObj
    } = React.useContext(StockItemContext);
const [stockItemId, setStockItemId] = stockItemIdObj;
const [stockItemData, setStockItemData] = stockItemDataObj;
const [updateStatus, setUpdateStatus] = stockItemUpdateStatusObj;


// CONTEXT STOCK QUANTITIES
    const {stockDataObj, 
           stockListObj,
           stockTypeObj,
           stockIdObj
    } = React.useContext(StockQuantityContext);
    const [stockData, setStockData] = stockDataObj;   
    const [stockList, setStockList] = stockListObj;
    const [stockType, setStockType] = stockTypeObj;
    const [stockId, setStockId] = stockIdObj;


// LOCALE
const [stockTransactionType, setStockTransactionType] = useState('');
const [dateChoice, setDateChoice] = useState('originalDate');
const [date, setDate] = useState('');
const [quantity, setQuantity] = useState('');  


// DATA FOR EDIT
    useEffect(() => { 
    if(props.popupCrud === 'edit') {
        const user_id = localStorage.getItem('user');
        api.get(`/stocksingle/${stockId}`,{headers: {user_id}})
        .then(res => {
            setDate(res.data.date);
            setQuantity(res.data.quantity);       
            });
        }
    }, [props.popupCrud]) 


// ADD
    function submitHandler(updateProps) {
    const user_id = localStorage.getItem('user');
    if(props.popupCrud === "add") {
        const stockUpdate = new FormData(); 
        stockUpdate.append("type", stockType)
        stockUpdate.append("quantity", updateProps.quantity)
        if(props.popupCrud === "add") { stockUpdate.append("date", Date.now()) }
        stockUpdate.append("product", stockItemId)
        api.post(`/stock`,stockUpdate, {headers: {user_id}})
        .then(res => {
            setStockId(res.data._id);
            // update browser 
            const newStockList = stockList.slice(); 
            newStockList.push(res.data);
            setStockList(newStockList);
            // update db product array
            const productStockUpdate = new FormData(); 
            productStockUpdate.append("productId", stockItemId);
            productStockUpdate.append("stockId", res.data._id);
            api.post(`/accessoriesupdate/stock/push`,productStockUpdate, {headers: {user_id}})  
            .then(res => {            
                setUpdateStatus("complete");
                const interval = setInterval(() => {
                setUpdateStatus('close');  
                setStockType('');
                setQuantity('');
                setDate('');            
                clearInterval(interval);
            }, 2000 ); 
            })});
        }
// UPDATE
    if(props.popupCrud === "edit") {  
        const productStockUpdate = new FormData();  
        productStockUpdate.append("quantity", updateProps.quantity)
        if(dateChoice === "originalDate") { productStockUpdate.append("date",date) }
        if(dateChoice === "currentDate") { productStockUpdate.append("date", Date.now()) }
        productStockUpdate.append("stockId", stockId)
        api.post(`/stock/update`,productStockUpdate, {headers: {user_id}})
        .then(res => {
            console.log(res.data)
            // update browser
            for (let i=0; i < stockList.length; i++) {
                if (stockList[i]._id === res.data._id) {
                        const newStockList = [...stockList];
                        newStockList[i] = res.data;
                        setStockList(newStockList);
                }
            }
            setUpdateStatus('complete');
            const interval = setInterval(() => {
                setUpdateStatus('close'); 
                setStockType('');
                setQuantity('');
                setDate('');                 
                clearInterval(interval);                   
            }, 2000 ); 
        });
    }
}

// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
    if(updateStatus[0]) {
        setLocalUpdateStatus(updateStatus);
    }
    }, [updateStatus])


return (
<>
<div>
<Container fluid>
    <div className="row padding-top-10 padding-bottom-10 padding-right-20 padding-left-20">
        <div className="col-3">  
            <div>Quantity
                {stockType === "Write Off"? " (Negative number required)":null}
            </div> 
        </div>
        <div className="col-6">  
            <div>
                <Input type="number" value={quantity} onChange={event => setQuantity(event.target.value)}/>
            </div> 
        </div>                
    </div>
    {props.popupCrud === "edit"?
        <div className="row padding-top-10 padding-bottom-10 padding-right-20 padding-left-20">
            <div className="col-3">  
                <div>Date
                </div> 
            </div>
            <div className="col-9">  
                <div className="row padding-left-20">
                    <div className="col-12"><Input type="radio" id="originalDate" name="dates" value="originalDate" onChange={event => setDateChoice(event.target.value)} checked/>&nbsp;
                    <label htmlFor="originalDate">Use original date ({Moment(date).format('DD/MM/YYYY')})</label></div>
                </div>
                <div className="row padding-left-20">
                    <div className="col-12"><Input type="radio" id="currentDate" name="dates" value="currentDate" onChange={event => setDateChoice(event.target.value)} />&nbsp;
                    <label htmlFor="currentDate">Update with current date ({Moment(Date.now()).format('DD/MM/YYYY')})</label></div>
                </div> 
            </div>  
        </div>
    :null}                                         
    <div className="row padding-top-20">
        <div className={`col-12`}> 
            <div className=" row card-modal-btns-base">
                { localUpdateStatus === "default"?
                <div className="col-12 right">      
                    <Button variant="secondary" onClick={(event) => submitHandler({date:date,quantity:quantity })} size="sm">Add Entry</Button> 
                </div>: null}
                { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Stock Entry Added</Alert></div>: null }
            </div>                                
        </div>                                
    </div>
</Container>
</div>
</>
)
}

  export default StockQuantityAddEdit