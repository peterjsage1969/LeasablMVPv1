import React, { useState, useEffect} from "react";
import NavbarPage from "../../navigation/navAdmin"
import { Container, Button } from 'reactstrap';
import { useLocation,Link } from "react-router-dom";
import ProductSpecificationsEdit from "../../components/ProductDetailsSpecificationsEdit";



const ProductDetail = () => {
    const {state} = useLocation(); 
    const [name, setName] = useState('');

    // Triggers after render
    useEffect(() => {       
        setName(state.productId.name);      
    },[state.productId.name])

    return (
        <>
        <div></div>
        <div>
            <NavbarPage />
        </div>
        <Container fluid>
        <div className="page-header">
            <div className="row">
                <div className="col">
                    <h2>{name}</h2>
                </div>
                <div className="col add-new-btn">
                <Link to="/admin/products"><Button>Back</Button></Link>
                </div>                
            </div>
        </div>



        <ProductSpecificationsEdit/>


                                    

        </Container>           
       </>   
   )
}

export default ProductDetail;




/*  MOST RECENT STUFF


        {(editView)?<ProductSpecificationsEdit />: <ProductSpecifications/>}



        <Container fluid>
        <div className="page-header">
            <div className="row">
                <div className="col">
                    <h2>{state.product.name}</h2>
                </div>
                <div className="col add-new-btn">
                <Link to="/admin/products"><Button>Back</Button></Link>
                </div>                
            </div>
        </div>
        <div className="page-body"> 
            <div className="details">
                <div className="details-image">
                    <img src={state.product.imageProduct_url} alt="container"/>
                </div>
                <div className="details-info">
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { toggle('1'); }}>
                                Specifications
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { toggle('2'); }}>
                                Circulation
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    {(viewtest)?<ProductSpecifications />: <ProductSpecificationsEdit/>}
                                    <div className="tab-base-button-holder">
                                        <Button variant="secondary"  onClick={(evt) => setViewTest("")}>Edit Specifications</Button>   
                                    </div> 
                                    <div className="tab-base-button-holder">
                                        <Button variant="secondary"  onClick={(evt) => setViewTest("hi")}>Cancel</Button>   
                                    </div>                                       
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    <ProductDetailsCirculation />
                                </Col>
                            </Row>
                            </TabPane>
                    </TabContent>
                </div>
            </div>
        </div> 
        </Container> 




















*/



























/*

                        <Tabs defaultActiveKey="Specifications" id="uncontrolled-tab-example">
                            <Tab eventKey="Specifications" title="Specifications">
                                <NameForm />
                            </Tab>
                            <Tab eventKey="Manufacturers" title="Manufacturers">
                            <ProductDetailsLabels />
                            </Tab>
                            <Tab eventKey="Retailers" title="Retailers">
                            bbbb
                            </Tab>                            
                            <Tab eventKey="Stock" title="Stock">
                            <ProductDetailsCIrculation />
                            </Tab>
                        </Tabs>





        <div>
            <Layout>{state.product.name}</Layout>
            <Container>
                <div className="details">
                    <div className="details-image">
                        <img src={"../images/products/" + state.product.image} alt="container"/>
                    </div>
                    <div className="details-info">
                        <Tabs defaultActiveKey="Specifications" id="uncontrolled-tab-example">
                            <Tab eventKey="Specifications" title="Specifications">
                                <NameForm />
                            </Tab>
                            <Tab eventKey="Manufacturers" title="Manufacturers">
                            <ProductDetailsLabels />
                            </Tab>
                            <Tab eventKey="Retailers" title="Retailers">
                            bbbb
                            </Tab>                            
                            <Tab eventKey="Stock" title="Stock">
                            <ProductDetailsCIrculation />
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="details-buttons">
                    <Link to="/products"><Button>Back</Button></Link>
                </div>
                
            </Container>
       </div>

*/