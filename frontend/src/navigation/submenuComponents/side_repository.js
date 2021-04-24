import React from "react";
import {Link} from "react-router-dom";


const SideRepository = (props) => {


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
                    <div className="side-menu-title padding-bottom-20"><h5>Repository</h5></div>
                    <div className="side-menu-title padding-bottom-20">Sort by</div>


                - category









                    {/*<div className="side-menu-links"><Link to="#" onClick={() => setSubmitHandler({"target":"Landing"})} className="link-body-black">Snapshot</Link></div>*/}                                                  
                </div>
            </div> 
        </div>
    </div> 
    )
}


export default SideRepository;   