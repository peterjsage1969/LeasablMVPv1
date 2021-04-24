import React from "react";
import {Table } from "react-bootstrap";
import { useLocation} from "react-router-dom";

const ProductDetailsLabels = () => {
    const {state} = useLocation();
    return (
        <>
        <div>
                    <Table striped>
                        <thead>
                            <tr className="suzo-admin-thead">
                                <th>Specifications</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Contents</td>
                                <td className="labelling-image">
                                {state.product.labelBrand ? 
                                    <img src={"../images/product_brand_labels/" + state.product.labelIngredients} alt="container"/>:
                                    "label required"}</td>
                            </tr>                            
                            <tr>
                                <td>Company</td>
                                <td className="labelling-image">
                                {state.product.labelBrand ? 
                                    <img src={"../images/product_ingredients_labels/" + state.product.labelBrand} alt="container"/>:
                                    "label required"}</td>
                            </tr>                                                                                                                                                                                                                                                                                                                                                                   
                        </tbody>
                    </Table>                               
       </div>
    
       </>   
   )
}

export default ProductDetailsLabels;