import React, {useState} from "react";
import { Container } from 'reactstrap';
import NavbarPage from "../../../navigation/navAdmin";
import TopStockHome from "../../../navigation/submenuComponents/topMenu_stock";
import Categories from "../../../components/stock/products/categories/categoriesList";
import SideStockType from "../../../navigation/submenuComponents/side_StockType";

const StockTypes = () => {


// CHILD SIDE MENUS
    const [stateUpdateFromChild, setStateUpdateFromChild] = useState(''); 

    return (
        <>
        <div><NavbarPage /></div>
        <Container fluid>
            {/* top menu */} 
            <div className="row page-body-top-Mtb60">
                    <div className="col-1"></div>                      
                    <div className="col-10 top-menu-inner">
                        <TopStockHome/>
                    </div>
                    <div className="col-1"></div>
                </div>
            {/* body */} 
            <div className="row">
                <div className="col-1"></div>
                {/* side menu */}  
                <div className="col-2"><SideStockType onChange={value => {setStateUpdateFromChild(value)}}/></div>  
                <div className="col-8 menu-body-spacer">
                    <Categories StockTypeViewState={stateUpdateFromChild.target}/> 
                </div>
                <div className="col-1"></div>
            </div>
        </Container>
        </> 
    )
}

export default StockTypes;