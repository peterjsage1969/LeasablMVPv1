import React from "react";
import { Container, Button, Tabs, Tab } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import {Layout} from "../navigation";
import ContainerTypeSpecifications from "../components/ContainerTypeSpecifications";
import ContainerTypeCirclulation from "../components/ContainerTypeCirclulation";


const ContainerTypeDetail = () => {
    const {state} = useLocation();
    return (
        <>
        <div>
            <Layout>{state.containerType.containerTypeName}</Layout>
            <Container>
                <div className="details">
                    <div className="details-image">
                        <img src={"../images/containerTypes/" + state.containerType.containerTypeImage} alt="container"/>
                    </div>
                    <div className="details-info">
                        <Tabs defaultActiveKey="Specifications" id="uncontrolled-tab-example">
                            <Tab eventKey="Specifications" title="Specifications">
                                <ContainerTypeSpecifications/> 
                            </Tab>
                            <Tab eventKey="Consumables" title="Consumables">
                            bbbb
                            </Tab>
                            <Tab eventKey="stock" title="Stock">
                            <ContainerTypeCirclulation />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="details-buttons">
                    <Link to="/containers"><Button>Back</Button></Link>
                </div>
                
            </Container>
       </div>
    
       </>   
   )
}

export default ContainerTypeDetail;