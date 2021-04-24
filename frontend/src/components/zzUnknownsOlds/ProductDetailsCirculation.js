import React from "react";
import {Table } from "react-bootstrap";
//import { useLocation} from "react-router-dom";

const ProductDetailsCIrculation = () => {
    //const {state} = useLocation();
    return (
        <>
        <div>
                    <Table striped>
                        <thead>
                            <tr className="suzo-admin-thead">
                                <th>Circulation</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>                                                    
                            <tr>
                                <td>On Market</td>
                                <td>908</td>
                            </tr>
                            <tr>
                                <td>With Retailer</td>
                                <td>800</td>
                            </tr>  
                            <tr>
                                <td>Consumer Leased</td>
                                <td>340</td>
                            </tr> 
                            <tr>
                                <td>Collected</td>
                                <td>556</td>
                            </tr>                                                                                                                                                                                                                                                           
                        </tbody>
                    </Table>                               
       </div>
    
       </>   
   )
}

export default ProductDetailsCIrculation;