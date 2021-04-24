import React, {useState, useEffect} from "react";
import {Link,useLocation} from "react-router-dom"

const TopStockHome = () => {
    
    // ACTIVE FROM URL  
    const location = useLocation();
    const [menuItem1, setMenuItem1] = useState(''); 
    const [menuItem2, setMenuItem2] = useState('');
    const [menuItem3, setMenuItem3] = useState('');
    const [menuItem4, setMenuItem4] = useState('');
    const [menuItem5, setMenuItem5] = useState('');  
    useEffect(() => {   
        if (location.pathname === '/stock/products' || location.pathname === '/stock/products/list'  || location.pathname === '/stock/products/add' || location.pathname === '/stock/products/details') { 
            setMenuItem1('active-menu-item');
            setMenuItem2('');
            setMenuItem3('');
            setMenuItem4('');
            setMenuItem5('');
        } else if (location.pathname === '/stock/legals/contracts/list' || location.pathname === '/stock/legals/contracts/add') { 
            setMenuItem1('');
            setMenuItem2('active-menu-item');
            setMenuItem3('');
            setMenuItem4('');
            setMenuItem5('');
        } else if (location.pathname === '/stock/activation/stepOne' || location.pathname === '/stock/activation/step1a' || location.pathname === '/stock/activation/step1b') { 
            setMenuItem1('');
            setMenuItem2('');
            setMenuItem3('active-menu-item');
            setMenuItem4('');
            setMenuItem5('');
        } else if (location.pathname === '/stock/accessories/list' || location.pathname === '/stock/accessories/add') { 
            setMenuItem1('');
            setMenuItem2('');
            setMenuItem3('');
            setMenuItem4('active-menu-item');
            setMenuItem5('');
        } else if (location.pathname === '/stock/categories/products/list' || location.pathname === '/stock/categories/accessories/list') { 
            setMenuItem1('');
            setMenuItem2('');
            setMenuItem3('');
            setMenuItem4('');
            setMenuItem5('active-menu-item');
        }
            }, [location.pathname]) 


    return (
        <div className="row inline">
                <div className="col-1"></div>
                <div className={`col-2 top-menu-item ${menuItem1} border-right`}><Link to={`/stock/products/list`} className="link-body-black">Products</Link></div>
                <div className={`col-2 top-menu-item ${menuItem2}`}><Link to={`/stock/legals/contracts/list`} className="link-body-black">Legals</Link></div>
                <div className={`col-2 top-menu-item ${menuItem3}`}><Link to={`/stock/activation/step1a`} className="link-body-black">Smart Tagging</Link></div>
                <div className={`col-2 top-menu-item ${menuItem4} border-right`}><Link to={`/stock/accessories/list`} className="link-body-black">Accesories</Link></div>
                <div className={`col-2 top-menu-item ${menuItem5} border-right`}><Link to={`/stock/categories/products/list`} className="link-body-black">Categories</Link></div>                                        
                <div className="col-1"></div>   
        </div>                
    )
}


export default TopStockHome;   