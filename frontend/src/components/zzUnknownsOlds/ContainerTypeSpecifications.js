import React from "react";
import {Table, Button } from "react-bootstrap";
import { useLocation} from "react-router-dom";

const ContainerTypeSpecifications = () => {
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
                                <td>Category</td>
                                <td>{state.containerType.containerTypeCategory}</td>
                            </tr>
                            <tr>
                                <td>Volume</td>
                                <td>{state.containerType.containerTypeVolume}</td>
                            </tr>                            
                            <tr>
                                <td>Lid Type</td>
                                <td>{state.containerType.containerTypeLidType}</td>
                            </tr>                            
                            <tr>
                                <td>Material</td>
                                <td>{state.containerType.containerTypeMaterial}</td>
                            </tr>
                            <tr>
                                <td>Colour</td>
                                <td>{state.containerType.containerTypeColour}</td>
                            </tr>                            
                            <tr>
                                <td>Consumables Group</td>
                                <td>{state.containerType.containerTypeGroup}</td>
                            </tr>
                            <tr>
                                <td>Barriers</td>
                                <td>{state.containerType.containerTypeBarrier}</td>
                            </tr>
                            <tr>
                                <td>Additives</td>
                                <td>{state.containerType.containerTypeAdditives}</td>
                            </tr>
                            <tr>
                                <td>In Stock</td>
                                <td>{state.containerType.containerTypeInStock}</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>£{state.containerType.containerTypePrice}</td>
                            </tr>                                                                                                                                              
                        </tbody>
                    </Table>                               
       </div>
    
       </>   
   )
}

export default ContainerTypeSpecifications;