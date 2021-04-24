import React from "react";
import { Container } from 'reactstrap';
import NavbarPage from "../../../navigation/navAdmin";
import TopStockHome from "../../../navigation/submenuComponents/topMenu_stock";
import SideRepository from "../../../navigation/submenuComponents/side_repository";
import RepositoryLists from "../../../components/stock/repository/repositoryLists";

const RepositoryHome = () => {

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
                <div className="col-2"><SideRepository/></div>  
                <div className="col-8">
                    <RepositoryLists/>
                </div>
                <div className="col-1"></div>
            </div>
        </Container>
        </> 
    )
}

export default RepositoryHome;