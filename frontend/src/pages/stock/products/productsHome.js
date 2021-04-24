import React, {useState, useEffect } from "react";
import { Container, Fade } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import StockItemsList from "../../../components/stock/Items/stockItemsList";
import StockItemsAddEdit from "../../../components/stock/Items/stockItemsAddEdit";
import CategoriesList from "../../../components/stock/products/categories/categoriesList";
import StockQuantityList from "../../../components/stock/stockQuantity/stockQuantityList"
import { StockItemContext } from "./../../../components/stock/Items/stockItemsContext";
import { CategoriesContext } from "../../../components/stock/products/categories/categoriesContext";

const ProductsHome = () => {


// HISTORY
    const history = useHistory();


// LOCATION
    const location = useLocation(); 


// CONTEXT STK ITEMS
    const {pageStateViewObj,
            clickHistoryObj,
            stockItemTypeObj
            } = React.useContext(StockItemContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [stockItemType, setStockItemType] = stockItemTypeObj;


// CONTEXT CATEORIES
    const {categoryTypeObj} = React.useContext(CategoriesContext);
    const [categoryType, setCategoryType] = categoryTypeObj;

// LOCALE
    const [fadeInList, setFadeInList] = useState(true);
    const [fadeInEdit, setFadeInEdit] = useState(true);  


// CLICK HISTORY
useEffect(() => { 
    setStockItemType('Products');
    setCategoryType('Products');
    if (clickHistory) {
        if(clickHistory === "add") {
            history.push('/stock/products/add')
            setClickHistory('');
            setPageViewState('add');
        }
        if(clickHistory === "edit" ) {
            history.push('/stock/products/edit')
            setClickHistory('');
            setPageViewState('edit');
        }            
        if(clickHistory === "delete" ) {
            history.push('/stock/products/list')
            setClickHistory('');
        }            
    }
}, [clickHistory])




    return (
        <>
        <Container fluid>
            <div className="row">
            <div className="col-1"></div>  
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 contents-holder">
                            {location.pathname === "/stock/products/add"?
                                <Fade in={fadeInList} className="mt-3">
                                    <StockItemsAddEdit addOrEdit="add"/>
                                </Fade>                           
                            : null}
                            {location.pathname === "/stock/products/edit"?
                                <Fade in={fadeInEdit} className="mt-3">
                                    <StockItemsAddEdit addOrEdit="edit"/>
                                </Fade>
                            : null}                            
                            {location.pathname === "/stock/products/list"?
                                <Fade in={fadeInList} className="mt-3">
                                    <StockItemsList/>
                                </Fade>
                            : null}
                            {location.pathname === "/stock/products/categories"?
                            <Fade in={fadeInList} className="mt-3">
                                <CategoriesList/>
                            </Fade>
                            : null} 
                            {location.pathname === "/stock/products/accessoryquantities"?
                            <Fade in={fadeInList} className="mt-3">
                                <StockQuantityList/>
                            </Fade>
                            : null}                                                        
                        </div>
                    </div>                
                </div>
                <div className="col-1"></div>
            </div>
        </Container>

        </> 
    )
}

export default ProductsHome;