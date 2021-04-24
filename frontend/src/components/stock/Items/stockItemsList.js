import React, { useState, useEffect } from "react";
import { Button, Container } from 'reactstrap';
import api from '../../../services/api';
import { StockItemContext } from "./stockItemsContext";
import { CategoriesContext } from "../products/categories/categoriesContext";

const StockItemsList = (props) => {


// CONTEXT STOCK ITEM
    const { stockItemIdObj, 
            clickHistoryObj,
            stockItemFilterObj,
            stockItemNameObj,
            stockItemTypeObj
            } = React.useContext(StockItemContext);
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [stockItemId, setStockItemId] = stockItemIdObj;
    const [stockItemName, setStockItemName] = stockItemNameObj;
    const [stockItemFilter, setStockItemFilter] = stockItemFilterObj;
    const [stockItemType, setStockItemType] = stockItemTypeObj;


// CONTEXT CATEGORIES
    const {categoriesListObj,
            categoryIdObj,
            subCategoryIdObj,
            categoryTypeObj
        } = React.useContext(CategoriesContext);
    const [categoriesList, setCategoriesList] = categoriesListObj;
    const [categoryId, setCategoryId] = categoryIdObj;
    const [subCategoryId, setSubCategoryId] = subCategoryIdObj;
    const [categoryType, setCategoryType] = categoryTypeObj;


// LOCALE
    const [stockItemList, setStockItemList] = useState([]);
    const [updateList, setUpdateList] = useState('');
    const [stockItemViewData, setStockItemViewData] = useState([]); 



// DATA
    // list
    useEffect(() => { 
            const user_id = localStorage.getItem('user');   
            if(stockItemType === "Accessories"){
                api.get(`/accessories`)
                .then(res => {
                    setStockItemList(res.data);          
                })
            } else if(stockItemType === "Products"){
                api.get(`/products`)
                .then(res => {
                    setStockItemList(res.data);          
                })
            }
    }, [stockItemType]) 
    //calculate totals
    useEffect(() => {
        if(stockItemList !="") {
            for (let i=0; i < stockItemList.length; i++) {
                if (stockItemList[i].stock.length != 0) {
                    var stockTotal = 0;
                    for (let j=0; j < stockItemList[i].stock.length; j++) {
                        stockTotal = stockTotal + stockItemList[i].stock[j].quantity;
                    }
                    stockItemList[i].stockTotal = stockTotal;
                } else {
                    stockItemList[i].stockTotal = 0;
                }
            }
        }
    }, [stockItemList])    



// CATEGORY
        // filter
        useEffect(() => {   
            // state array update
            if (stockItemFilter !== 'All') {
                const productView = [];
                for (let i=0; i < stockItemList.length; i++) {
                    if (stockItemList[i].category.name === stockItemFilter) {
                            productView.push(stockItemList[i]);  
                    }
                }
                setStockItemViewData(productView);
            } else {
                setStockItemViewData(stockItemList);
            }
        }, [stockItemFilter, stockItemList]) 
        // dropdown categories
        useEffect(() => {
                const user_id = localStorage.getItem('user');
                const categoryCollect = new FormData();             
                categoryCollect.append("categoryType", categoryType)
                api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
                .then(res => {
                setCategoriesList(res.data);
                console.log("blaze");
                console.log(categoryType)
                console.log(res.data)
                console.log("blaze");
                });
        }, [])


// SUBMIT HANDLER
        function submitHandler(props) {
            if (props.stockItemId != '') {
                if (props.stockItemId) {setStockItemId(props.stockItemId)};
                if (props.name) {setStockItemName(props.name)};
                if (props.categoryId) {setCategoryId(props.categoryId)};
                if (props.subCategoryId){setSubCategoryId(props.subCategoryId._id)};      
                setClickHistory(props.clickHistory);
            } else {
                setStockItemId(props.stockItemId);
                setStockItemName(props.name);
                setCategoryId(props.categoryId);
                setSubCategoryId(props.subCategoryId);        
                setClickHistory(props.clickHistory);
            }
        }
   


return (
    <>
    <Container fluid>  
        <div className="row padding-0 margin-0">
            <div className="col-6 padding-0">                    
                <h4 className="contents-top-title">{stockItemFilter}</h4>
            </div>                              
            <div className="col-6 right padding-0">
                    <Button variant="secondary" className="margin-right-10" onClick={(event) => submitHandler({stockItemId:'', 
                                                                                categoryId: '',
                                                                                subCategoryId: '',
                                                                                name: '',
                                                                                clickHistory: "add"                                                                           
                                                                                })} size="sm">Add New</Button>                                                                                                
            </div>                                
        </div>   
        <div className="row header-dk">
            <div className="col-2"></div>
            <div className="col-5">Name</div> 
            <div className="col-2 center">Inactive Stock</div>
            <div className="col-3"></div>
        </div>
        {stockItemViewData.length>0 ? stockItemViewData.map(stockItem => (
            <div key={stockItem._id} className= "row list-rows striped-list inline height-150">
                <div className="col-2 center"><img  className="preLive-image1-pending" src={stockItem.thumbnail_url} alt="uploaded" /></div>
                <div className="col-5 left"><strong>{stockItem.name}</strong><br/>
                                                    {stockItem.category? <div>{stockItem.category.name}</div>: null}
                                                    {stockItem.subCategory? <div>/{stockItem.subCategory.name}</div>: null}</div> 
                <div className="col-2 center">{stockItem.stockTotal}</div>
                <div className="col-3 right padding-right-20">
                <Button variant="secondary" onClick={(event) => submitHandler({stockItemId:stockItem._id,
                                                                                clickHistory: "quantities",
                                                                                name: stockItem.name,
                                                                                thumbnail_url: stockItem.thumbnail_url                                                                                    
                                                                                })} size="sm">Stock</Button>&nbsp;                            
                    <Button variant="secondary" onClick={(event) => submitHandler({stockItemId:stockItem._id,
                                                                                clickHistory: "edit",
                                                                                name: stockItem.name,
                                                                                thumbnail_url: stockItem.thumbnail_url                                                                                    
                                                                                })} size="sm">Edit</Button>                                                                                                
                </div>
            </div>                                
        )): <div className="margin-top-20">You currently have no product templates for this category</div>}                                                                                                                
     </Container>
    </>
    )
}

export default StockItemsList;