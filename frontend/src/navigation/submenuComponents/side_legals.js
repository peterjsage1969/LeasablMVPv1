import React, {useEffect,useState} from "react";
import {Link,useLocation} from "react-router-dom";


const SideLegals = (props) => {


// ACTIVE FROM URL  
    const location = useLocation();
    const [menuItem1, setMenuItem1] = useState(''); 
    const [menuItem2, setMenuItem2] = useState('');
    const [menuItem3, setMenuItem3] = useState('');
    const [menuItem4, setMenuItem4] = useState('');
    const [menuItem5, setMenuItem5] = useState('');  
    useEffect(() => {   
        if (location.pathname === '/stock/legals/contracts/list') { 
            setMenuItem1('active-menu-item');
            setMenuItem2('');
            setMenuItem3('');
            setMenuItem4('');
            setMenuItem5('');
        } else if (location.pathname === '/stock/legals/insurance/list') { 
            setMenuItem1('');
            setMenuItem2('active-menu-item');
            setMenuItem3('');
            setMenuItem4('');
            setMenuItem5('');
        }
    }, [location.pathname]) 


// SUBMIT
function setSubmitHandler(callback) {
    // props.onChange({"target":callback.target});
} 
 
    return (
            <div className="row height-500 top">
                <div className="col-12">
                    <div className="side-menu-title"><h5>Legals</h5></div>
                    <div className={`side-menu-links ${menuItem1}`}><Link to="/stock/legals/contracts/list" onClick={() => setSubmitHandler({"target":"Contracts"})} className="link-body-black">Contracts</Link></div> 
                    <div className={`side-menu-links ${menuItem2}`}><Link to="/stock/legals/insurance/list" onClick={() => setSubmitHandler({"target":"Insurance"})} className="link-body-black">Insurance</Link></div>                                               
                </div>
            </div> 
    )
}


export default SideLegals;   