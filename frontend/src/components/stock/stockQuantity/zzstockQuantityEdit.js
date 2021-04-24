import React, {useState, useEffect} from "react";
import { Container, Button, Alert, Input } from 'reactstrap';
import api from "../../../services/api";
import { AccessoriesContext } from "../accessories/accessoriesContext";
import { StockContext } from "./stockContext";


const StockQuantityAddEdit = (props) => {


// CONTEXT PRODUCTS/ACCESSORIES
    const {productIdObj, 
        productDataObj, 
        productUpdateStatusObj
        } = React.useContext(AccessoriesContext);
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;
    const [updateStatus, setUpdateStatus] = productUpdateStatusObj;


// CONTEXT STOCK
    const {stockDataObj, 
           stockListObj,
           stockTypeObj
    } = React.useContext(StockContext);
    const [stockData, setStockData] = stockDataObj;   
    const [stockList, setStockList] = stockListObj;
    const [stockType, setStockType] = stockTypeObj;


// DATA
    const [name, setName] = useState('');   
    useEffect(() => { 
    if(productData.name){setName(productData.name)};
    }, [productData]) 


// LOCALE
    const [stockTransactionType, setStockTransactionType] = useState('');
    const [stockId, setStockId] = useState('');
    const [date, setDate] = useState('');
    const [quantity, setQuantity] = useState('');    


// ADD
    function submitHandler(props) {
    const user_id = localStorage.getItem('user');
    const stockUpdate = new FormData(); 
    stockUpdate.append("type", stockType)
    stockUpdate.append("quantity", props.quantity)
    stockUpdate.append("date", Date.now())
    stockUpdate.append("product", productId)
    console.log("aaa1")
    api.post(`/stock`,stockUpdate, {headers: {user_id}})
    .then(res => {
        setStockId(res.data._id);
        // ref
        const productStockUpdate = new FormData(); 
        productStockUpdate.append("productId", productId);
        productStockUpdate.append("stockId", res.data._id);
        api.post(`/accessoriesupdate/stock/push`,productStockUpdate, {headers: {user_id}})  
        .then(res => {              
            setUpdateStatus("complete");
            const interval = setInterval(() => {
            setUpdateStatus('close'); 
            // update context 
            const newStockList = stockList.slice();
            newStockList.push(res.data);
            setStockList(newStockList);              
            clearInterval(interval);
        }, 2000 ); 
        })});
            
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
        <div className="col-6">  
            <div>Quantity
                {stockType === "Write Off"? " (Negative number required)":null}
            </div> 
        </div>
        <div className="col-4">  
            <div>
                <Input type="number" value={quantity} onChange={event => setQuantity(event.target.value)}/>
            </div> 
        </div>                
    </div>                       
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