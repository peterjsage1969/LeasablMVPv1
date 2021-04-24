import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import api from "../../../services/api";
import { ActivationContext } from "./../../../components/stock/activation/activationContext";
import { ProductsContext } from "./../../../components/stock/products/productsContext";

const ActivationOneSelectSmartTags = (props) => { 



// HISTORY
const history = useHistory();


// CONTEXT
    // activation
    const { pageStateViewObj} = React.useContext(ActivationContext); 
    const [pageViewState, setPageViewState] = pageStateViewObj;
    // product data
    const {productListObj,
            showProductListObj,
            productDetailsRequestObj,
            productIdObj,
            productDataObj 
            } = React.useContext(ProductsContext);
    const [productList, setProductList] = productListObj;
    const [showProductList, setShowProductList] = showProductListObj;
    const [localProductList, setLocalProductList] = useState([]);
    useEffect(() => {
        setShowProductList("active");
    }, []) 
    useEffect(() => {
        if(productList != []) {setLocalProductList(productList);}
    }, [productList]) 
    // get productbyid
    const [productDetailsRequest, setProductDetailsRequest] = productDetailsRequestObj;
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;
    const [displayNone, setDisplayNone] = useState('display-none'); 
    useEffect(() => {
        setProductDetailsRequest("yes");
        setDisplayNone('');        
    }, [productData]) 
    const [name, setName] = useState(''); 
    const [description, setDescription] = useState('');
    const [smartTechnology, setSmartTechnology] = useState('');    
    const [thumbnail_url, setThumbnail_url] = useState(null);
    const [localProductData, setLocalProductData] = useState('')
    useEffect(() => {
        if(productData.name){setName(productData.name)};
        if(productData.description){setDescription(productData.description)};
        if(productData.thumbnail_url){setThumbnail_url(productData.thumbnail_url)};
    }, [productData])         
    // get smart codes by id
    function getSmartCodesyId(){

    }
        







// CONTINUE BUTTON
    function onContinue() {
        history.push('/stock/activation/step1b');
    }




return (
    <>
    <div className=" row margin-0">
        <div className="col-1"></div>
            <div className="col-11 padding-top-100">
                <div className="row">
                    <div className="col-5">
                    <div className="row">
                            <div className="col-12 padding-top-10">
                                <h5>Now select the tags you want to activate</h5>
                            </div>
                        </div>                                             
                        <div className="row">
                            <div className="col-12 padding-top-40"> 
                                <Input type="select" onChange={event => getSmartCodesyId(event.target.value)}>
                                <option value="">Select Smart Tags</option> 
                                {/*productViewData.map(productItem => (
                                <option key={productItem._id} value={productItem._id}>{productItem.name}</option> 
                                ))*/} 
                                </Input>                                        
                            </div>
                        </div>                               
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <div className={`row margin-top-10`}>
                            <div className="col-12  card-frame-inner">
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Your Product Selection</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-3 padding-top-30">
                                        <img src={thumbnail_url} alt={name} className="preLive-image1-pending border"/>
                                    </div>
                                    <div className="col-9 padding-top-30">
                                        <strong>{name}</strong><br/>
                                        {description}
                                    </div>                                            
                                </div>   
                                <div className="row">
                                    <div className="col-12 padding-top-40 right">
                                        <Button onClick={() => onContinue()}>Confirm and Continue</Button>
                                    </div>
                                </div>                                 
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
    </div>           
    </>
    )
}


export default ActivationOneSelectSmartTags;