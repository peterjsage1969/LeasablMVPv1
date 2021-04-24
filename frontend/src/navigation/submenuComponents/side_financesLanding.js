import React from "react";
import {Link} from "react-router-dom"

const SideFinancesLanding = () => {
 
    return (
        <div className="row card-frame-outer">
        <div className="col-12 card-frame-inner">
            <div className="row height-500 top">
                <div className="col-12">
                    <div className="side-menu-title"><h5>Finance Manager</h5></div>
                    <div className="side-menu-links"><Link to="#" className="link-body-black">Deposit returns</Link></div>                                    
                </div>
            </div> 
        </div>
    </div> 
    )
}


export default SideFinancesLanding;   