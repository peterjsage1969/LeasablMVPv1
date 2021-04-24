import React, {useState, useEffect} from "react";
import { Container, Button, Input, Label} from 'reactstrap';
import api from "../../../services/api";
import { ActivationContext } from "./../../../components/stock/activation/activationContext";
import { ProductsContext } from "./../../../components/stock/products/productsContext";
import ActivationStepper from "./activationStepper"

const ActivationWelcome = (props) => { 


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
    function getProductbyId(props) {
        setProductId([{productId:props}])
        setProductDetailsRequest("yes");
        setDisplayNone('');
    }
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
        
        


// DROP DOWNS
    // filter and product dropdown
    const [productDropdownDisabled, setProductDropdownDisabled] = useState(true);
    const [productFilter, setProductFilter] = useState(''); 
    const [category, setCategory] = useState('');  
    function updateFromCategory(props) {
        setProductDropdownDisabled(false);
        setCategory(props);
    }
    useEffect(() => {
        setProductFilter(category);
    }, [category])         
    const [productViewData, setProductViewData] = useState([]); 
    useEffect(() => {         
        if (productFilter !== 'All') {
            const productView = [];
            for (let i=0; i < localProductList.length; i++) {
                if (localProductList[i].category === productFilter) {
                        productView.push(localProductList[i]);  
                }
            }
            setProductViewData(productView);
        } else {
            setProductViewData(localProductList);
        }
    }, [productFilter,localProductList]) 


    // categories
    const [allCategoryData, setAllCategoryData] = useState([]);
    useEffect(() => { api.get(`/categories`).then(res => { setAllCategoryData(res.data) }); }, []) 





// SEND TO PARENT
    function setSubmitHandler(fromButton){
        console.log(fromButton.selectedType)
        props.onChange({"target":"stepOne","selectedType":fromButton.selectedType});
    }


return (
    <>
    <Container fluid>
    <div className=" row padding-0 margin-0">
        <div className="col-6">
            <div>
                <h4>Activation | Welcome</h4>
            </div>               
        </div>
        <div className="col-6">
            <ActivationStepper/>               
        </div>        
    </div> 
    <div className=" row margin-0">
        <div className="col-1"></div>
            <div className="col-11 padding-top-100">
                <div className="row">
                    <div className="col-5">
                    <div className="row">
                            <div className="col-12 padding-top-10">
                                <h5>Select the product you want to activate</h5>
                            </div>
                        </div>                                             
                        <div className="row">
                            <div className="col-12 padding-top-40">
                                <Input type="select" value={category} onChange={event => updateFromCategory(event.target.value)}>
                                    <option value="">Select A Category</option> 
                                    {allCategoryData.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem.name}>{categoryItem.name}</option> 
                                    ))} 
                                </Input>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-12 padding-top-40"> 
                                <Input type="select" disabled = {(productDropdownDisabled)? "disabled" : ""} onChange={event => getProductbyId(event.target.value)}>
                                <option value="">Select A Product</option> 
                                {productViewData.map(productItem => (
                                <option key={productItem._id} value={productItem._id}>{productItem.name}</option> 
                                ))} 
                                </Input>                                        
                            </div>
                        </div>                               
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        <div className={`row margin-top-10 ${displayNone}`}>
                            <div className="col-12  card-frame-inner">
                                <div className="row">
                                    <div className="col-12">
                                        <h5>Your Product Selection</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 inline padding-top-30">
                                        <div className="row">
                                            <div className="col-5">
                                                <img src={thumbnail_url} alt={name} className="preLive-image1-pending border"/>
                                            </div>
                                            <div className="col-7">
                                                <strong>{name}</strong><br/>
                                                {description}
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>   
                                <div className="row">
                                    <div className="col-12 padding-top-40 right">
                                        <Button>Confirm and Continue</Button>
                                    </div>
                                </div>                                 
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
    </div>           
    </Container>
    </>
    )
}


export default ActivationWelcome;