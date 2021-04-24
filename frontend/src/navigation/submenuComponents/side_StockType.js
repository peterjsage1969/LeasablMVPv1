import React from "react";
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';

const SideStockType = (props) => {


    // SUBMIT
    function setSubmitHandler(callback) {
        //props.onChange({"target":"Blank Stock"});
        props.onChange({"target":callback.target});
    } 
 
    return (
        <div className="row">
        <div className="col-12 side-menu-inner">
            <div className="row height-500 top">
                <div className="col-12">
                    <div className="side-menu-title padding-bottom-20"><h5>Stock Types</h5></div>
                    <div className="side-menu-links"><Link to="#" onClick={() => setSubmitHandler({"target":"Blank Stock"})} className="link-body-black">Blank Stock</Link></div>
                    <div className="side-menu-links"><Link to="#" onClick={() => setSubmitHandler({"target":"Smart Codes"})} className="link-body-black">Smart Codes</Link></div>
                    <div className="side-menu-links"><Link to="#" onClick={() => setSubmitHandler({"target":"Pre Assembled"})} className="link-body-black">Pre Assembled Stock</Link></div>                                                 
                </div>
            </div> 
        </div>
    </div> 
    )
}


export default SideStockType;   