import React, {useState, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { Container, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import ProductsEdit from "./productsEditAdd";
import ProductStock from "./productStock";
import classnames from 'classnames';
import { ProductsContext } from "./../../../components/stock/products/productsContext";


const ProductsDetails = (props) => {


// HISTORY
    const history = useHistory();    


// CONTEXT STORE
    const {pageStateViewObj, 
        productIdObj, 
        productDataObj 
        } = React.useContext(ProductsContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;

// CONTEXT GET
    // data
    const [name, setName] = useState('');  
    const [thumbnail_url, setThumbnail_url] = useState(null);
    useEffect(() => { 
        if(productData){
            setName(productData.name);
            setThumbnail_url(productData.thumbnail_url);
        };
    }, [productData]) 

      


// TABS
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => { if(activeTab !== tab) setActiveTab(tab); }


    return (
    <>
       <div>
        <Container fluid>  


        <div className=" row margin-0">
            <div className="col-4">
                <div className=" row margin-0">
                    <div className="col-12">
                        <div>
                            <h4>{name}</h4>
                        </div>               
                    </div>
                </div>
                <div className="row margin-0">
                    <div className="col-12">
                        <div className="padding-top-100 center">
                            <img src={thumbnail_url} alt={name} className="width-300"/>
                        </div>
                    </div>  
                </div>              
            </div>
            <div className="col-8">  
                <Nav tabs  className="tabs-holder">
                    <NavItem className="tab-last">
                        <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }} >Details</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }} >Legals</NavLink>
                    </NavItem>                                                                           
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" className="card-frame-inner vvy-lt-grey-panel height-560">
                        <ProductsEdit/> 
                    </TabPane>
                    <TabPane tabId="2" className="lt-grey-panel height-500">
                        <ProductStock/>
                    </TabPane>
                </TabContent>
            </div>                               
                </div>
        </Container>
        </div>
    </>
    )
}

  export default ProductsDetails


    /* state array update - edit
    const productUpdate = res.data
    const newProduct = {"_id":productUpdate._id,
                        "name":productUpdate.name,
                        "category":productUpdate.category,
                        "quantity":productUpdate.quantity,
                        "smartTechnology":productUpdate.smartTechnology,
                        "description":productUpdate.description,
                        "thumbnail_url":productUpdate.thumbnail_url,
                        "thumbnail":productUpdate.thumbnail}
    for (let i=0; i < allProductData.length; i++) {
        if (allProductData[i]._id === newProduct._id) {
                const newAllProductData = [...allProductData];
                newAllProductData[i].name = newProduct.name;
                newAllProductData[i].category = newProduct.category;
                newAllProductData[i].quantity = newProduct.quantity;
                newAllProductData[i].smartTechnology = newProduct.smartTechnology;
                newAllProductData[i].description = newProduct.description;                                          
                newAllProductData[i].thumbnail_url = newProduct.thumbnail_url;
                setAllProductData(newAllProductData);
        }
    }*/


        /* state array update - double dot??
    const returnedProductData = res.data
    const newProduct = {"_id":returnedProductData.product._id,
                        "name":returnedProductData.product.name,
                        "description":returnedProductData.product.description,
                        "category":returnedProductData.product.category,
                        "thumbnail_url":returnedProductData.product.thumbnail_url,
                        "quantity":returnedProductData.product.quantity,
                        "smartTechnology":returnedProductData.product.smartTechnology};
    const newProductsData = productData.slice();
    newProductsData.push(newProduct);
    setProductData(newProductsData);*/