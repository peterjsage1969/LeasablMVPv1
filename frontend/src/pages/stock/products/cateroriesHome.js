import React, {useState, useEffect } from "react";
import { Container, Fade } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import SideCategories from "../../../navigation/submenuComponents/side_categories";
import CategoryList from "../../../components/stock/products/categories/categoriesList"
import { CategoriesContext } from "./../../../components/stock/products/categories/categoriesContext";


const CategoriesHome = () => {


// CONTEXT
    const {categoryTypeObj
    } = React.useContext(CategoriesContext);
    const [categoryType, setCategoryType] = categoryTypeObj;


// LOCATION
    const location = useLocation(); 


// SET CONTEXT
    useEffect(() => {
        if(location.pathname === "/stock/categories/products/list") {setCategoryType("products")}
        if(location.pathname === "/stock/categories/accessories/list") {setCategoryType("accessories")}
    }, [location.pathname])


// PAGE FADE EFFECT
    const [fadeInList, setFadeInList] = useState(true);


    return (
        <>
        <Container fluid>
            <div className="row page-top-spacer-60">
                <div className="col-12"></div>
            </div>
            {/* main body */} 
            <div className="row">
                <div className="col-1"></div> 
                <div className="col-10">
                    <div className="row">
                        {/* side menu */} 
                        <div className="col-2 side-menu-holder"><SideCategories/></div>  
                        <div className="col-1"></div>
                        {/* content */} 
                        <div className="col-9 contents-holder">
                            <div className="col-12 contents-holder">
                                {categoryType === "products"? // && productId.length != 0?
                                    <Fade in={fadeInList} className="mt-3">
                                        <CategoryList categoryType={"products"}/>                                  
                                    </Fade>
                                : null}
                                {categoryType === "accessories"? //  || productId.length === 0?
                                <Fade in={fadeInList} className="mt-3">
                                    <CategoryList categoryType={"accessories"}/>
                                </Fade>
                                : null}
                            </div>
                        </div>
                    </div>
                    </div>
                <div className="col-1"></div>
            </div>
        </Container>
        </> 
    )
}

export default CategoriesHome;