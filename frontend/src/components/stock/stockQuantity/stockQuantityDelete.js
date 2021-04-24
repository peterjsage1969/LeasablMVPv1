import React, {useState, useEffect} from "react";
import { Container, Button, Alert, Input } from 'reactstrap';
import api from "../../../services/api";
import { StockItemContext } from "../Items/stockItemsContext";
import { StockQuantityContext } from "./stockQuantityContext";


const StockQuantityDelete = (props) => {


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

// DATA
    const [name, setName] = useState('');   
    useEffect(() => { 
    if(stockItemData.name){setName(stockItemData.name)};
    }, [stockItemData]) 


// LOCALE
    const [stockTransactionType, setStockTransactionType] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');    


// DELETE
    function submitHandler() {
        // data
        const user_id = localStorage.getItem('user');
        api.delete(`/stock/${stockId}`);
        // ref
        const productStockUpdate = new FormData(); 
        productStockUpdate.append("productId", stockItemId);
        productStockUpdate.append("stockId", stockId);
        api.post(`/accessoriesupdate/stock/pull`,productStockUpdate, {headers: {user_id}})
        .then(res=>{
            setUpdateStatus("complete");
            const interval = setInterval(() => {
                setUpdateStatus("close");
                // update context
                for (let i=0; i < stockList.length; i++) {                  
                    if (stockList[i]._id === stockId) {
                        const newStockList = stockList.filter(stockItem => stockItem._id !== stockId);
                        setStockList(newStockList);
                    }
                }
                clearInterval(interval);
            }, 2000 ); 
        })
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
        <div className="col-12">  
            <div>Please confirm you wish to delete this entry
            </div> 
        </div>              
    </div>                       
    <div className="row padding-top-20">
        <div className={`col-12`}> 
            <div className=" row card-modal-btns-base">
                { localUpdateStatus === "default"?
                <div className="col-12 right">      
                    <Button variant="secondary" onClick={(event) => submitHandler()} size="sm">Delete Entry</Button> 
                </div>: null}
                { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Stock Entry Deleted</Alert></div>: null }
            </div>                                
        </div>                                
    </div>
</Container>
</div>
</>
)
}

  export default StockQuantityDelete