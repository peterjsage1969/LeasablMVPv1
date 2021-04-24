import React, {useState}  from "react";
import {Link} from "react-router-dom";
import { Container } from 'reactstrap';
import NavbarPage from "../../../navigation/navAdmin";
import StockLanding from "../../../components/stock/landing/stockLanding";
import SideLiveStock from "../../../navigation/submenuComponents/side_liveStock";
import TopStockHome from "../../../navigation/submenuComponents/topMenu_stock";
import LiveStockList from "../../../components/stock/liveStock/liveStockList";

const StockHome = () => {

// CHILD SIDE MENUS
const [stateUpdateFromChild, setStateUpdateFromChild] = useState(''); 

console.log(stateUpdateFromChild)
 
    return (
        <>
        <Container fluid>
            {/* body */} 
            <div className="row">
                <div className="col-1"></div>
                {/* side menu */}  
                <div className="col-2"><SideLiveStock onChange={value => {setStateUpdateFromChild(value)}}/></div>  
                <div className="col-8 menu-body-spacer">
                {stateUpdateFromChild.target === "Stock Landing"? <StockLanding/>:null}
                {stateUpdateFromChild.target === "Live Stock List"? <LiveStockList/>:null}
                </div>
                <div className="col-1"></div>
            </div>
        </Container>
        </> 
    )
}


export default StockHome;            