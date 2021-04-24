import React, {useState, useEffect} from "react";
import { Container } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import Navigation from "../../navigation/navAdmin";
import TopStockHome from "../../navigation/submenuComponents/topMenu_stock";
import ProductsHome from "./products/productsHome"
import ActivationHome from "./activation/activationHome"
import {ProductDataProvider} from "../../components/stock/products/productsContext";
import {ActivationProvider} from "../../components/stock/activation/activationContext";
import {CategoriesProvider} from "../../components/stock/products/categories/categoriesContext";
import {ContractsProvider} from "../../components/stock/legals/contractsContext";
import {StockItemsDataProvider} from "../../components/stock/Items/stockItemsContext";
import {StockQuantityDataProvider} from "../../components/stock/stockQuantity/stockQuantityContext";
import CategoriesHome from "./products/cateroriesHome";
import LegalsHome from "./legals/legalsHome";
import AccessoriesHome from "./accessories/accessoriesHome";

const StockHome = () => {


// INTERNAL SECTION ROUTING
    const location = useLocation();
    const [localLocation, setLocalLocation] = useState('');
    useEffect(() => {
        setLocalLocation(location.pathname);
    }, [location.pathname])


    return (
        <>
        <div><Navigation /></div>
        <Container fluid>
            <div className="row page-top-spacer-60">
                <div className="col-12"></div>
            </div>
            {/* top menu */} 
            <div className="row">
                <div className="col-1"></div>                      
                <div className="col-10">
                    <div className="row top-menu-holder">  
                        <div className="col-12">                                              
                            <TopStockHome/>
                        </div>
                    </div>
                </div>
                <div className="col-1"></div>
            </div>
        </Container>

        <StockItemsDataProvider>
            <StockQuantityDataProvider>
                <CategoriesProvider>
                        {localLocation === "/stock/products" || 
                        localLocation === "/stock/products/details" || 
                        localLocation === "/stock/products/list" || 
                        localLocation === "/stock/products/add" ||
                        localLocation === "/stock/accessories/categories" ?        
                    <ProductsHome/>
                : null}
                </CategoriesProvider>
            </StockQuantityDataProvider>
        </StockItemsDataProvider>

        <StockItemsDataProvider>
            <StockQuantityDataProvider>
                <CategoriesProvider>
                    {localLocation === "/stock/accessories/list" || 
                    localLocation === "/stock/accessories/details" || 
                    localLocation === "/stock/accessories/add" ||
                    localLocation === "/stock/accessories/edit" ||  
                    localLocation === "/stock/accessories/accessoryquantities" || 
                    localLocation === "/stock/accessories/categories" ?       
                    <AccessoriesHome/>
                    : null}
                </CategoriesProvider>
            </StockQuantityDataProvider>
        </StockItemsDataProvider> 



        <ActivationProvider>
            <CategoriesProvider>
                {location.pathname === "/stock/activation/step1a" ||  location.pathname === "/stock/activation/step1b" ?       
                    <ActivationHome/>
                : null}
            </CategoriesProvider>            
        </ActivationProvider> 

 

        <CategoriesProvider>     
            {location.pathname === "/stock/categories/products/list" || location.pathname === "/stock/categories/accessories/list" ?       
                <CategoriesHome/>
            : null}  
        </CategoriesProvider> 
        <ContractsProvider>
            {location.pathname === "/stock/legalshome" || location.pathname === "/stock/legals/contracts/list" || location.pathname === "/stock/legals/contracts/add" || location.pathname === "/stock/legals/contracts/details" ?       
                <LegalsHome/>
            : null} 
        </ContractsProvider>
        </>
    )
}

export default StockHome;