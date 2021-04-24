import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import api from "../../../services/api";
import { ActivationContext } from "./../../../components/stock/activation/activationContext";
import { ProductsContext } from "./../../../components/stock/products/productsContext";
import { CategoriesContext } from "./../../../components/stock/products/categories/categoriesContext";

const ActivationOneSelectProduct = (props) => { 



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
    const [productDetailsRequest, setProductDetailsRequest] = productDetailsRequestObj;
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;


// CATEGORIES CONTEXT
const {categoriesListObj,
    categoryIdObj,
    subCategoryIdObj
} = React.useContext(CategoriesContext);
const [categoriesList, setCategoriesList] = categoriesListObj;
const [categoryId, setCategoryId] = categoryIdObj;
const [subCategoryId, setSubCategoryId] = subCategoryIdObj;    


// LOCALE
const [categoryType, setCategoryType] = useState('products');
const [subCategoryDropdownDisabled, setSubCategoryDropdownDisabled] = useState(true);
const [productDropdownDisabled, setProductDropdownDisabled] = useState(true);
const [technologyDropdownDisabled, setTechnologyDropdownDisabled] = useState(true);
const [subCategoryList, setSubCategoryList] = useState([]);
const [technologyList, setTechnologyList] = useState([]);



// PAGE SETUP - UNSURE WHAT THESE DO????
    // show product list
    const [localProductList, setLocalProductList] = useState([]);
    useEffect(() => {
        setShowProductList("active");
    }, []) 
    // set up product list
    useEffect(() => {
        if(productList != []) {setLocalProductList(productList);}
    }, [productList]) 


/* DATA RETREIVAL
    const [displayNone, setDisplayNone] = useState('display-none'); 
    function getProductbyId(props) {
        setProductId([{productId:props}])
        setProductDetailsRequest("yes");
        setDisplayNone('');
    }
    useEffect(() => {
        if(productData.name){setName(productData.name)};
        if(productData.description){setDescription(productData.description)};
        if(productData.thumbnail_url){setThumbnail_url(productData.thumbnail_url)};
    }, [productData])         
*/        
        

// DROPDOWNS
        // category data
        useEffect(() => {
                const user_id = localStorage.getItem('user');
                const categoryCollect = new FormData();             
                categoryCollect.append("categoryType", categoryType)
                api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
                .then(res => {
                setCategoriesList(res.data);  
                });
        }, [])
        // category on update
        function updateFromCategory(props) {
            setCategoryId(props);
            setSubCategoryDropdownDisabled(false);
        }
        // sub category data
        useEffect(() => { 
            if (categoryId != "") {
                const user_id = localStorage.getItem('user');
                const subCategorySelection = new FormData(); 
                subCategorySelection.append("categoryId", categoryId)
                api.post(`/subcategories/bycategoryId`,subCategorySelection, {headers: {user_id}})
                .then(res => {
                    setSubCategoryList(res.data.subCategory);
                });
            }
        }, [categoryId]) 
        // sub category on update
        function updateFromSubCategory(props) {
            setSubCategoryId(props);
            setProductDropdownDisabled(false);
            console.log(props);
        }
        // product data 
        useEffect(() => { 
            if (subCategoryId != "") {
                const user_id = localStorage.getItem('user');
                const productSelection = new FormData(); 
                productSelection.append("subCategoryId", subCategoryId)
                api.post(`/productselection/bysubcategoryId`,productSelection, {headers: {user_id}})
                .then(res => {
                    setProductList(res.data);
                });
            }
        }, [subCategoryId]) 
        // product on update
        function updateFromProduct(props) {
            setProductId(props);
            setTechnologyDropdownDisabled(false);
        }
        // technology on update
        useEffect(() => { 
            if (productId != "") {
                const user_id = localStorage.getItem('user');
                const productSelection = new FormData(); 
                productSelection.append("subCategoryId", subCategoryId)
                api.post(`/productselection/bysubcategoryId`,productSelection, {headers: {user_id}})
                .then(res => {
                    setProductList(res.data);
                });
            }
        }, [subCategoryId]) 



       // setTechnologyList









/*
    useEffect(() => { 
        if (subCategoryList[0] && categoryId != '') {
            setShowSubCategory("list")
            setSubCategoryReset(true);                
        } else {
            setShowSubCategory("noList")
        }
    }, [subCategoryList])   */   




// CONTINUE BUTTON
    function onContinue() {
        history.push('/stock/activation/step1b');
    }



// SEND TO PARENT
    function setSubmitHandler(fromButton){
        console.log(fromButton.selectedType)
        props.onChange({"target":"stepOne","selectedType":fromButton.selectedType});
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
                                <h5>Your Product</h5>
                            </div>
                        </div>                                             
                        <div className="row">
                            <div className="col-12 padding-top-40">
                                <div className="padding-bottom-5"><strong>Category</strong></div>
                                <Input type="select" value={categoryId} onChange={event => updateFromCategory(event.target.value)}>
                                    <option value="All"></option> 
                                    {categoriesList.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                    ))} 
                                </Input>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-12 padding-top-20">
                                <div className="padding-bottom-5"><strong>Sub Category</strong></div>
                                <Input type="select" disabled = {(subCategoryDropdownDisabled)? "disabled" : ""} onChange={event => updateFromSubCategory(event.target.value)}>
                                    <option value="All"></option> 
                                    {subCategoryList.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                    ))} 
                                </Input>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col-12 padding-top-20"> 
                                <div className="padding-bottom-10"><strong>Product</strong></div>
                                <Input type="select" disabled = {(productDropdownDisabled)? "disabled" : ""} onChange={event => updateFromProduct(event.target.value)}>
                                <option value=""></option> 
                                {productList.map(productItem => (
                                <option key={productItem._id} value={productItem._id}>{productItem.name}</option> 
                                ))} 
                                </Input>                                        
                            </div>
                        </div>                               
                    </div>
                    <div className="col-1"></div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-12 padding-top-10">
                                    <h5>The Tracking Technology</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 padding-top-40">
                                    <div className="padding-bottom-5"><strong>Technology</strong></div>
                                    <Input type="select" disabled = {(technologyDropdownDisabled)? "disabled" : ""} onChange={event => updateFromSubCategory(event.target.value)}>
                                        <option value="All"></option> 
                                        {technologyList.map(technologyItem => (
                                        <option key={technologyItem._id} value={technologyItem._id}>{technologyItem.name}</option> 
                                        ))} 
                                    </Input>
                                </div>
                            </div>    
                            <div className="row">
                                <div className="col-12 padding-top-40 right">
                                    <Button disabled onClick={() => onContinue()}>Confirm and Continue</Button>
                                </div>
                            </div>                                 
                        </div>
                </div>
            </div>
    </div>           
    </>
    )
}


export default ActivationOneSelectProduct;