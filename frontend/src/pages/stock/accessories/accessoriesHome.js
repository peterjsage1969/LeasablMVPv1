import React, {useState, useEffect } from "react";
import { Container, Fade } from 'reactstrap';
import { useHistory, useLocation } from 'react-router-dom';
import StockItemsList from "../../../components/stock/Items/stockItemsList";
import StockItemsAddEdit from "../../../components/stock/Items/stockItemsAddEdit";
import CategoriesList from "../../../components/stock/products/categories/categoriesList";
import StockQuantityList from "../../../components/stock/stockQuantity/stockQuantityList"
import SideAccessories from "../../../navigation/submenuComponents/side_accessories";
import { CategoriesContext } from "./../../../components/stock/products/categories/categoriesContext";
import { StockItemContext } from "./../../../components/stock/Items/stockItemsContext";

const AccessoriesHome = () => {


// HISTORY
    const history = useHistory();


// LOCATION
    const location = useLocation(); 


// CONTEXT STOCK ITEM
    const {pageStateViewObj,
            clickHistoryObj,
            stockItemTypeObj
            } = React.useContext(StockItemContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [stockItemType, setStockItemType] = stockItemTypeObj;


// CONTEXT CATEGORY
    const {categoryTypeObj} = React.useContext(CategoriesContext);
    const [categoryType, setCategoryType] = categoryTypeObj;


// LOCALE
    const [fadeInList, setFadeInList] = useState(true);
    const [fadeInEdit, setFadeInEdit] = useState(true);  


// CLICK HISTORY & STOCK TYPE
    useEffect(() => {  
        setStockItemType('Accessories');
        setCategoryType('Accessories');
        if (clickHistory) {
            if(clickHistory === "add") {
                history.push('/stock/accessories/add')
                setClickHistory('');
                setPageViewState('add');
            }
            if(clickHistory === "edit" ) {
                history.push('/stock/accessories/edit')
                setClickHistory('');
                setPageViewState('edit');
            }            
            if(clickHistory === "delete" ) {
                history.push('/stock/accessories/list')
                setClickHistory('');

            }
            if(clickHistory === "categories" ) {
                setCategoryType("accessories")
                history.push('/stock/accessories/categories')
                setClickHistory('');

            }  
            if(clickHistory === "quantities" ) {
                setCategoryType("accessories")
                history.push('/stock/accessories/accessoryquantities')
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
                        {/* side menu */} 
                        <div className="col-2 side-menu-holder"><SideAccessories/></div>  
                        <div className="col-1"></div>
                        {/* content */} 
                        <div className="col-9 contents-holder">
                            {location.pathname === "/stock/accessories/add"?
                                <Fade in={fadeInList} className="mt-3">
                                    <StockItemsAddEdit addOrEdit="add"/>
                                </Fade>                           
                            : null}
                            {location.pathname === "/stock/accessories/edit"?
                                <Fade in={fadeInEdit} className="mt-3">
                                    <StockItemsAddEdit addOrEdit="edit"/>
                                </Fade>
                            : null}                            
                            {location.pathname === "/stock/accessories/list"?
                                <Fade in={fadeInList} className="mt-3">
                                    <StockItemsList/>
                                </Fade>
                            : null}
                            {location.pathname === "/stock/accessories/categories"?
                            <Fade in={fadeInList} className="mt-3">
                                <CategoriesList/>
                            </Fade>
                            : null} 
                            {location.pathname === "/stock/accessories/accessoryquantities"?
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

export default AccessoriesHome;