import React, {useEffect,useState} from "react";
import {Link,useLocation} from "react-router-dom";
import api from '../../services/api';
import { CategoriesContext } from "../../components/stock/products/categories/categoriesContext";
import { StockItemContext } from "../../components/stock/Items/stockItemsContext";


const SideAccessories = (props) => {

// CONTEXT CATEGORIES
const {categoriesListObj,
    categoryIdObj,
    subCategoryIdObj
} = React.useContext(CategoriesContext);
const [categoriesList, setCategoriesList] = categoriesListObj;
const [categoryId, setCategoryId] = categoryIdObj;
const [subCategoryId, setSubCategoryId] = subCategoryIdObj;


// CONTEXT STOCK ITEMS
const { stockItemIdObj, 
    clickHistoryObj,
    stockItemFilterObj
    } = React.useContext(StockItemContext);
const [clickHistory, setClickHistory] = clickHistoryObj;
const [stockItemId, setStockItemId] = stockItemIdObj;
const [stockItemFilter, setStockItemFilter] = stockItemFilterObj;


// LOCALE
const [categoryType, setCategoryType] = useState('accessories');


// SIDE MENU DATA
    // categories
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        const categoryCollect = new FormData();             
        categoryCollect.append("categoryType", categoryType)
        api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
        .then(res => {
        setCategoriesList(res.data);  
        });
    }, [])


// SUBMIT
function setSubmitHandler(callback) {
    setClickHistory(callback.clickHistory);
    //props.onChange({"target":callback.target});
} 
 
    return (
            <div className="row height-500 top">
                <div className="col-12">
                    <div className="side-menu-title"><h4>Accessories</h4></div>
                    <div className="side-menu-subtitle">By Category</div> 
                    
                    {categoriesList.map(categoryItem => (
                        categoryItem.name === stockItemFilter ?
                        <div key={categoryItem._id} className={`side-menu-links active-menu-item`}>
                            <Link to="/stock/accessories/list"  className="link-body-black" onClick={(event) => setStockItemFilter(categoryItem.name)}>{categoryItem.name}</Link>
                        </div> :
                        <div key={categoryItem._id} className={`side-menu-links`}>
                        <Link to="/stock/accessories/list"  className="link-body-black" onClick={(event) => setStockItemFilter(categoryItem.name)}>{categoryItem.name}</Link>
                    </div>
                    ))} 
                    <div className="side-menu-subtitle">Manage</div> 
                    <div className={`side-menu-links cursor-pointer`} onClick={(event) => setSubmitHandler({clickHistory:"categories"})}>Setup Categories</div>                   
                </div>
            </div> 
    )
}


export default SideAccessories;   