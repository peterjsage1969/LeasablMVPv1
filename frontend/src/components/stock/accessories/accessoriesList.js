import React, { useState, useEffect } from "react";
import { Input, Button, Container } from 'reactstrap';
import api from '../../../services/api';
import { AccessoriesContext } from "./accessoriesContext";
import { CategoriesContext } from "../products/categories/categoriesContext";

const AccessoriesList = (props) => {


// PRODUCTS/ACCESSORY CONTEXT
    const { productIdObj, 
            clickHistoryObj,
            productFilterObj,
            productNameObj
            } = React.useContext(AccessoriesContext);
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [productId, setProductId] = productIdObj;
    const [productName, setProductName] = productNameObj;
    const [productFilter, setProductFilter] = productFilterObj;


// CATEGORIES CONTEXT
const {categoriesListObj,
        categoryIdObj,
        subCategoryIdObj
    } = React.useContext(CategoriesContext);
const [categoriesList, setCategoriesList] = categoriesListObj;
const [categoryId, setCategoryId] = categoryIdObj;
const [subCategoryId, setSubCategoryId] = subCategoryIdObj;



// LOCALE
    const [productList, setProductList] = useState([]);
    const [updateList, setUpdateList] = useState('');
    const [productViewData, setProductViewData] = useState([]); 
    const [categoryType, setCategoryType] = useState('accessories');



// DATA
    // list
    useEffect(() => { 
            const user_id = localStorage.getItem('user');   
            api.get(`/accessories`)
            .then(res => {
                setProductList(res.data);          
            })
            //setProductFilter('All');
    }, []) 
    //calculate totals
    useEffect(() => {
        if(productList !="") {
            for (let i=0; i < productList.length; i++) {
                if (productList[i].stock.length != 0) {
                    var stockTotal = 0;
                    for (let j=0; j < productList[i].stock.length; j++) {
                        stockTotal = stockTotal + productList[i].stock[j].quantity;
                    }
                    productList[i].stockTotal = stockTotal;
                } else {
                    productList[i].stockTotal = 0;
                }
            }
        }
    }, [productList])    



// CATEGORY
        // filter
        useEffect(() => {   
            // state array update
            if (productFilter !== 'All') {
                const productView = [];
                for (let i=0; i < productList.length; i++) {
                    if (productList[i].category.name === productFilter) {
                            productView.push(productList[i]);  
                    }
                }
                setProductViewData(productView);
            } else {
                setProductViewData(productList);
            }
        }, [productFilter, productList]) 
        // dropdown categories
        useEffect(() => {
                const user_id = localStorage.getItem('user');
                const categoryCollect = new FormData();             
                categoryCollect.append("categoryType", categoryType)
                api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
                .then(res => {
                setCategoriesList(res.data);  
                });
        }, [])





// SUBMIT HANDLER
        function submitHandler(props) {
            if (props.productId != '') {
                if (props.productId) {setProductId(props.productId)};
                if (props.name) {setProductName(props.name)};
                if (props.categoryId) {setCategoryId(props.categoryId)};
                if (props.subCategoryId){setSubCategoryId(props.subCategoryId._id)};      
                setClickHistory(props.clickHistory);
            } else {
                setProductId(props.productId);
                setProductName(props.name);
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
                <h4 className="contents-top-title">{productFilter}</h4>
            </div>                              
            <div className="col-6 right padding-0">
                    <Button variant="secondary" className="margin-right-10" onClick={(event) => submitHandler({productId:'', 
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
        {productViewData.length>0 ? productViewData.map(productItem => (
            <div key={productItem._id} className= "row list-rows striped-list inline height-150">
                <div className="col-2 center"><img  className="preLive-image1-pending" src={productItem.thumbnail_url} alt="uploaded" /></div>
                <div className="col-5 left"><strong>{productItem.name}</strong><br/>
                                                    {productItem.category? <div>{productItem.category.name}</div>: null}
                                                    {productItem.subCategory? <div>/{productItem.subCategory.name}</div>: null}</div> 
                <div className="col-2 center">{productItem.stockTotal}</div>
                <div className="col-3 right padding-right-20">
                <Button variant="secondary" onClick={(event) => submitHandler({productId:productItem._id,
                                                                                clickHistory: "quantities",
                                                                                name: productItem.name,
                                                                                thumbnail_url: productItem.thumbnail_url                                                                                    
                                                                                })} size="sm">Stock</Button>&nbsp;                            
                    <Button variant="secondary" onClick={(event) => submitHandler({productId:productItem._id,
                                                                                clickHistory: "edit",
                                                                                name: productItem.name,
                                                                                thumbnail_url: productItem.thumbnail_url                                                                                    
                                                                                })} size="sm">Edit</Button>                                                                                                
                </div>
            </div>                                
        )): <div className="margin-top-20">You currently have no product templates for this category</div>}                                                                                                                
     </Container>
    </>
    )
}

export default AccessoriesList;