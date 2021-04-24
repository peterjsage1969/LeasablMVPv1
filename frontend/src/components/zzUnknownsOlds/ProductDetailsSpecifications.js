import React, { useState, useEffect} from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
//import ProductDetailsCirculation from "../../components/ProductDetailsCirculation";
import { useLocation} from "react-router-dom";
import classnames from 'classnames';

const ProductDetailsSpecifications = () => {
    const [activeTab, setActiveTab] = useState('1');   
    const [editView, setEditView] = useState(false);
    const {state} = useLocation();
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [content, setContent] = useState('');
    const [fillMethod, setFillMethod] = useState('');    
    const [measurement, setMeasurement] = useState('');
    const [volumeOrWeight, setVolumeOrWeight] = useState(''); 
    const [containerTypeName, setContainerTypeName] = useState('');   
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [hasSeal, setHasSeal] = useState('');
    const [price, setPrice] = useState('');
    const [inStock, setInStock] = useState('');
    const [imageProduct_url, setImageProduct_url] = useState('');    
    
    // Triggers after render
    useEffect(() => {
        setName(state.productId.name); 
        setCompany(state.productId.company); 
        setContent(state.productId.content);  
        setFillMethod(state.productId.fillMethod);  
        setMeasurement(state.productId.measurement);
        setVolumeOrWeight(state.productId.volumeOrWeight); 
        setContainerTypeName(state.productId.containerTypeName);
        setDescription(state.productId.description);
        setIngredients(state.productId.ingredients); 
        setHasSeal(state.productId.hasSeal); 
        setPrice(state.productId.price); 
        setInStock(state.productId.inStock); 
        setImageProduct_url(state.productId.imageProduct_url); 
    },[])

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <>
        <div>

        <div className="page-body"> 
            <div className="details">
                <div className="details-image">
                    <img src={imageProduct_url} alt="container"/>
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







                    <Table striped>
                        <thead>
                            <tr className="suzo-admin-thead">
                                <th>Specifications</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{name}</td>
                            </tr>                            
                            <tr>
                                <td>Company</td>
                                <td>{company}</td>
                            </tr>
                            <tr>
                                <td>Contents</td>
                                <td>{content}</td>
                            </tr>  
                            <tr>
                                <td>Measurement</td>
                                <td>{measurement}
                                {volumeOrWeight === "grams" ? " grams": " mlitres"}
                                </td>
                            </tr> 
                            <tr>
                                <td>Container</td>
                                <td>{containerTypeName}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{description}</td>
                            </tr>  
                            <tr>
                                <td>Ingredients</td>
                                <td>{ingredients}</td>
                            </tr> 
                            <tr>
                                <td>Has Seal</td>
                                <td>{hasSeal === "Yes" ? "Yes": "No"}</td>
                            </tr> 
                            <tr>
                                <td>Price</td>
                                <td>£{price}</td>
                            </tr>                             
                            <tr>
                                <td>Fill Method</td>
                                <td>{fillMethod}</td>
                            </tr>  
                            <tr>
                                <td>In Stock </td>
                                <td>{inStock === true ? "Yes": "No"}</td>
                            </tr>                                                                                  
                            </tbody>                                                                                                                                                                                                                                                                                                                                                                     
                    </Table> 
                    

                    <div className="tab-base-button-holder">
                                    {(editView)? '':<Button onClick={(evt) => setEditView(true)}>Edit Specifications</Button>}
                                    {(editView)? <Button variant="secondary" onClick={(evt) => setEditView(false)}>Cancel</Button>: ''}
                                    </div>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <Col sm="12">
                                    
                                </Col>
                            </Row>
                            </TabPane>
                    </TabContent>
                </div>
            </div>
        </div>   






       </div>
    
       </>   
   )
}

export default ProductDetailsSpecifications;




/*   

 


                              
                           

                            <tr>

                            




                             






























            <FormGroup>
              <Button className="secondary-btn" onClick={()=> history.push('/register')}>Register</Button>
            </FormGroup> 

{(specificationEdit)? "<div>True</div>":"<div>False</div>"}



name: {type: String},
    image: {type: String},
    company: {type: String},
    content: {type: String},
    volumeOrWeight: {type: String},
    measurement: {type: String},
    fillMethod: {type: String},
    ingredients: {type: String},
    description: {type: String},
    labelBrand: {type: String},
    labelIngredients: {type: String},
    hasSeal: {type: String},
    price: {type: Number},
    inStock: {type: Boolean}*/