import React, {useState, useEffect} from "react";
import { Table, TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col, Form, Input } from 'reactstrap';
import api from '../../services/api';
import { useLocation} from "react-router-dom";
import axios from "axios";
import classnames from 'classnames';

const ProductSpecificationsEdit = () => {
    const [activeTab, setActiveTab] = useState('1');   
    const {state} = useLocation();
    const [nameEdit, setNameEdit] = useState('');
    const [companyEdit, setCompanyEdit] = useState('');
    const [contentEdit, setContentEdit] = useState('');
    const [fillMethodEdit, setFillMethodEdit] = useState('');    
    const [measurementEdit, setMeasurementEdit] = useState('');
    const [volumeOrWeightEdit, setVolumeOrWeightEdit] = useState(''); 
    const [containerTypeNameEdit, setContainerTypeNameEdit] = useState('');   
    const [descriptionEdit, setDescriptionEdit] = useState('');
    const [ingredientsEdit, setIngredientsEdit] = useState('');
    const [hasSealEdit, setHasSealEdit] = useState('');
    const [priceEdit, setPriceEdit] = useState('');
    const [inStockEdit, setInStockEdit] = useState('');
    const [containerData, setContainerData] = useState([]); 
    const [imageProduct_url, setImageProduct_url] = useState('');    
    
    // Triggers after render
    useEffect(() => {
        setNameEdit(state.productId.name); 
        setCompanyEdit(state.productId.company); 
        setContentEdit(state.productId.content);  
        setFillMethodEdit(state.productId.fillMethod);  
        setMeasurementEdit(state.productId.measurement);
        setVolumeOrWeightEdit(state.productId.volumeOrWeight); 
        setContainerTypeNameEdit(state.productId.containerTypeName);
        setDescriptionEdit(state.productId.description);
        setIngredientsEdit(state.productId.ingredients); 
        setHasSealEdit(state.productId.hasSeal); 
        setPriceEdit(state.productId.price); 
        setInStockEdit(state.productId.inStock); 
        setImageProduct_url(state.productId.imageProduct_url);

       /* axios.get(`http://localhost:4000/containertypes`)
        .then(res => {
            const containers = res.data
            console.log(res.data)  
            setContainerData(containers)
        });*/
    },[state.productId.name,
       state.productId.company,
       state.productId.content,
       state.productId.fillMethod,
       state.productId.measurement,
       state.productId.volumeOrWeight,
       state.productId.containerTypeName,
       state.productId.description,
       state.productId.ingredients,
       state.productId.hasSeal,
       state.productId.price,
       state.productId.inStock,
       state.productId.imageProduct_url,
    ])


    /*const Containers = () => {  00000LLLLLLLDDDDDD?????
        useEffect(() => {
            axios.get(`http://localhost:4000/containertypes`)
            .then(res => {
                const containers = res.data
                console.log(res.data)  
                setContainerData(containers)
            });
        }, [])
    } */

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const setSubmitHandler = async (evt) => {
        const user_id = localStorage.getItem('user');
        const productData = new FormData();
    
        productData.append("name", nameEdit)
        productData.append("company", companyEdit)
        productData.append("content", contentEdit)
        productData.append("measurement", measurementEdit)
        productData.append("volumeOrWeight", volumeOrWeightEdit)
        //productData.append("containerTypeName", containerTypeNameEdit)    
    
        try {
            await api.post('/products',productData, {headers: {user_id}})          
        } catch (error) {
            Promise.reject(error);
        }
    }




    return (
    <>
    <div>
        <div className="page-body"> 
        <Form>
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
                                    <Table>
                                    <thead>
                                        <tr className="suzo-admin-thead">
                                            <th colSpan='3'>Specifications (Edit)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td colSpan='2'>
                                                <Input type="text" value={nameEdit} id="nameEdit"  onChange={event => setNameEdit(event.target.value)}/>
                                            </td>
                                        </tr>                            
                                        <tr>
                                            <td>Company</td>
                                            <td colSpan='2'>
                                                <Input type="text" value={companyEdit} id="companyEdit"  onChange={event => setCompanyEdit(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Contents</td>
                                            <td colSpan='2'>
                                                <Input type="text" value={contentEdit} id="contentEdit"  onChange={event => setContentEdit(event.target.value)}/>
                                            </td>
                                        </tr>  
                                        <tr>
                                            <td>Measurement</td>
                                            <td>
                                                <Input type="text" value={measurementEdit} id="measurementEdit"  onChange={event => setMeasurementEdit(event.target.value)}/>
                                            </td>
                                            <td>
                                                <Input type="text" value={volumeOrWeightEdit} id="volumeOrWeightEdit"  onChange={event => setVolumeOrWeightEdit(event.target.value)}/>
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>Container</td>
                                            <td colSpan='2'>{containerTypeNameEdit}
                                            <Input type="select" name="select" id="exampleSelect">
                                                {containerData.map(container => (
                                                    <option key={container._id} value={container.containerTypeName}>{container.containerTypeName}</option>        
                                                ))}  
                                            </Input>  
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Has Seal</td>
                                            <td colSpan='2'>{hasSealEdit === "Yes" ? "Yes": "No"}
                                                
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>Price</td>
                                            <td colSpan='2'>{descriptionEdit}
                                            </td>
                                        </tr> 
                                        <tr>
                                            <td>Price</td>
                                            <td colSpan='2'>{ingredientsEdit}
                                            </td>
                                        </tr>                                                                               
                                        <tr>
                                            <td>Price</td>
                                            <td colSpan='2'>£{priceEdit}
                                            </td>
                                        </tr>                             
                                        <tr>
                                            <td>Fill Method</td>
                                            <td colSpan='2'>{fillMethodEdit}
                                            </td>
                                        </tr>  
                                        <tr>
                                            <td>In Stock </td>
                                            <td colSpan='2'>{inStockEdit === true ? "Yes": "No"}
                                            </td>
                                        </tr>                                                                                  
                                    </tbody>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                                    </Table> 
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
        <div className="base-button-holder">
            <Button variant="secondary">Cancel</Button>&nbsp;
            <Button variant="secondary" onClick={(evt) => setSubmitHandler(false)}>Submit</Button>
        </div>
        </Form>
        </div>         
    </div>
    </>
    )
}

  export default ProductSpecificationsEdit
    



    /*

                                 <tr>
                                <td>Description</td>
                                <td colSpan='2'>
                                    <Input type="text" value={descriptionEdit} id="descriptionEdit"  onChange={event => setDescriptionEdit(event.target.value)}/>
                                </td>
                            </tr>  
                            <tr>
                                <td>Ingredients</td>
                                <td colSpan='2'>
                                    <Input type="text" value={ingredientsEdit} id="ingredientsEdit"  onChange={event => setIngredientsEdit(event.target.value)}/>
                                </td>
                            </tr>                                


     onChange={evt => setUpdateMeasurement(evt.target.value)}

            <FormGroup className="form-group">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            
            </FormGroup>
        </FormGroup>
        <FormGroup> 
            <FormGroup>
            <Button className="submit-btn">Submit</Button>
            </FormGroup>  
        </FormGroup> 

    const {state} = useLocation(); 

                                <td>
                                <input type="text" 
                                    value={state.product.company} 
                                    className="form-control" 

                                    
                                    />

onChange={() => this.setState.product({company:"hello"})}

                            <tr>
                                <td>Contents</td>
                                <td>
                                    <input type="text" value={state.product.content} className="form-control" name="password" />
                                </td>
                            </tr> 
                            <tr>
                                <td>Measurement</td>
                                <td>
                                    <input type="text" value={state.product.volumeOrWeight === "grams" ? 
                                    state.product.measurement + " grams": 
                                    state.product.measurement + " mlitres"} className="form-control" name="password" />
                                </td>
                            </tr> 
                            <tr>
                                <td>Container</td>
                                <td>
                                    <input type="text" value={state.product.containerTypeName} className="form-control" name="password" />
                                </td>
                            </tr>                              
                            <tr>
                                <td>Description</td>
                                <td>
                                    <input type="text" value={state.product.description} className="form-control" name="password" />  
                                </td>
                            </tr>                             
                            <tr>
                                <td>Ingredients</td>
                                <td>
                                    <input type="text" value={state.product.ingredients} className="form-control" name="password" />
                                </td>
                            </tr> 
                            <tr>
                            <td>Fill Method</td>
                                <td>
                                    <input type="text" value={state.product.fillMethod} className="form-control" name="password" />
                                </td>
                            </tr>                             
                            <tr>
                                <td>Has Seal</td>
                                <td>
                                    <input type="text" value={state.product.hasSeal === "Yes" ? "Yes": "No"} className="form-control" name="password" />
                                </td>                                
                            </tr> 
                            <tr>
                                <td>Price</td>
                                <td>
                                    <input type="text" value={"£" + state.product.price} className="form-control" name="password" />
                                </td>
                            </tr>  
                            <tr>
                                <td>In Stock</td>
                                <td>
                                    <input type="text" value={state.product.inStock === true ? "Yes": "No"} className="form-control" name="password" />                                    
                                </td>
                            </tr>

                               */