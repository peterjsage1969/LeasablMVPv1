import React, {useState} from "react";
import {Table, Button, Form } from "react-bootstrap";
import { useLocation} from "react-router-dom";


const ProductDetailsSpecificationsEdit = () => {

    const {state} = useLocation(); 
    
    const [company, setName] = useState({state});

    const handleSubmit = (evt) => {
        evt.preventDefault();
        alert(`Submitting Name ${company}`)
    }   
    
    console.log({state});

    return (
        <>
        <div>
                <Form onSubmit={handleSubmit}>
                    <Table striped>
                        <thead>
                            <tr className="suzo-admin-thead">
                                <th>Specifications</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Company</td>
                                <td>{state.product.company}</td>
                            </tr> 
                            <tr>
                                <td>Company</td>
                                <td><input
                                    type="text"
                                    value={state.product.company}
                                    onChange={e => setName(e.target.value)}
                                    />
                                </td>
                            </tr>                             
                            </tbody>                                                                                                                                                                                                                                                                                                                                                                     
                    </Table> 
                    <input type="submit" value="Submit" />
                    <div className="tab-base-button-holder">
                    <Button variant="secondary">Cancel</Button>&nbsp; &nbsp;<Button variant="danger">Update</Button>   
                    </div> 
                </Form>                             
       </div>
    
       </>   
   )
}

export default ProductDetailsSpecificationsEdit;

/*  

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