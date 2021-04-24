import React from "react";
import {Table } from "react-bootstrap";
//import { useLocation } from "react-router-dom";

const ContainerTypeCirclulation = () => {
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
                                <td>In Production</td>
                                <td>1234</td>
                            </tr>
                            <tr>
                                <td>In Warehouse</td>
                                <td>221</td>
                            </tr>                            
                            <tr>
                                <td>With Filler</td>
                                <td>5563</td>
                            </tr>                            
                            <tr>
                                <td>On Market</td>
                                <td>908</td>
                            </tr>
                            <tr>
                                <td>With Retailer</td>
                                <td>8000</td>
                            </tr>                            
                            <tr>
                                <td>Leased</td>
                                <td>231</td>
                            </tr>
                            <tr>
                                <td>Returned</td>
                                <td>7890</td>
                            </tr>
                            <tr>
                                <td>Collected</td>
                                <td>332</td>
                            </tr>
                            <tr>
                                <td>Awaiting Washing</td>
                                <td>675</td>
                            </tr>                                                                                                                                            
                        </tbody>
                    </Table>                               
       </div>
    
       </>   
   )
}

export default ContainerTypeCirclulation;