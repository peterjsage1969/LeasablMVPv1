import React, { useState, useEffect } from "react";
import { Input, Button, Container } from 'reactstrap';
import api from '../../../services/api';
import { ProductsContext } from "./productsContext";
import { CategoriesContext } from "./categories/categoriesContext";

const ProductsList = (props) => {


// PRODUCTS CONTEXT
    const { productIdObj, 
            clickHistoryObj
            } = React.useContext(ProductsContext);
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [productId, setProductId] = productIdObj;


// CATEGORIES CONTEXT
const {categoriesListObj,
        categoryIdObj,
        subCategoryIdObj
    } = React.useContext(CategoriesContext);
const [categoriesList, setCategoriesList] = categoriesListObj;
const [categoryId, setCategoryId] = categoryIdObj;
const [subCategoryId, setSubCategoryId] = subCategoryIdObj;



// LOCALE
    const [productList, setProductList] = useState([]);
    const [updateList, setUpdateList] = useState('');
    const [productViewData, setProductViewData] = useState([]); 
    const [productFilter, setProductFilter] = useState('All');
    const [categoryType, setCategoryType] = useState('products');



// DATA STATE
    useEffect(() => { 
            const user_id = localStorage.getItem('user');   
            api.get(`/products`)
            .then(res => {
                setProductList(res.data);          
            })
            setProductFilter('All');
    }, [])     



// CATEGORY
        // filter
        useEffect(() => {   
            // state array update
            if (productFilter !== 'All') {
                const productView = [];
                for (let i=0; i < productList.length; i++) {
                    if (productList[i].category.name === productFilter) {
                            productView.push(productList[i]);  
                    }
                }
                setProductViewData(productView);
            } else {
                setProductViewData(productList);
            }
        }, [productFilter, productList]) 
        // dropdown categories
        useEffect(() => {
                const user_id = localStorage.getItem('user');
                const categoryCollect = new FormData();             
                categoryCollect.append("categoryType", categoryType)
                api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
                .then(res => {
                setCategoriesList(res.data);  
                });
        }, [])



// SUBMIT HANDLER
        function submitHandler(props) {
            if (props.productId != '') {
                if (props.productId) {setProductId(props.productId)};
                if (props.categoryId) {setCategoryId(props.categoryId)};
                if (props.subCategoryId){setSubCategoryId(props.subCategoryId._id); console.log(props.subCategoryId._id);};         
                setClickHistory(props.clickHistory);
            } else {
                setProductId(props.productId);
                setCategoryId(props.categoryId);
                setSubCategoryId(props.subCategoryId);         
                setClickHistory(props.clickHistory);
            }
        }
   


return (
    <>
    <Container fluid>  
        <div className="row margin-0">
            <div className="col-12">                    
                <h4 className="contents-top-title">Product List | {productFilter}</h4>
                <div className="row margin-bottom-60">
                    <div className="col-2 inline">
                        Filter by:
                    </div>
                    <div className="col-4 inline">
                        <Input type="select" name="select" value={productFilter} onChange={(event) => setProductFilter(event.target.value)}>
                            <option value="All">All</option> 
                            {categoriesList.map(categoryItem => (
                            <option key={categoryItem._id} value={categoryItem.name}>{categoryItem.name}</option> 
                            ))} 
                        </Input>  
                    </div>                                
                    <div className="col-6 right">
                           <Button variant="secondary" className="margin-right-10" onClick={(event) => submitHandler({productId:'', 
                                                                                        categoryId: '',
                                                                                        subCategoryId: '',
                                                                                        name: '',
                                                                                        clickHistory: "add"                                                                           
                                                                                        })} size="sm">Add New</Button>                                                                                                
                    </div>                                
                </div>                               
                <div className="row header-dk">
                    <div className="col-2"></div>
                    <div className="col-5">Name</div> 
                    <div className="col-2 left">Unlive Stock</div>
                    <div className="col-2 left">Live Stock</div>
                    <div className="col-1"></div>
                </div>
                {productViewData.map(productItem => (
                    <div key={productItem._id} className= "row list-rows striped-list inline height-150">
                        <div className="col-2 center"><img  className="preLive-image1-pending" src={productItem.thumbnail_url} alt="uploaded" /></div>
                        <div className="col-5 left"><strong>{productItem.name}</strong><br/>
                                                            {productItem.category? <div>{productItem.category.name}</div>: null}
                                                            {productItem.subCategory? <div>/{productItem.subCategory.name}</div>: null}</div> 
                        <div className="col-2 left"></div>
                        <div className="col-2 left"></div>
                        <div className="col-1 right  padding-right-20">
                           <Button variant="secondary" onClick={(event) => submitHandler({productId:productItem._id,
                                                                                        clickHistory: "edit",
                                                                                        name: productItem.name,
                                                                                        thumbnail_url: productItem.thumbnail_url                                                                                    
                                                                                        })} size="sm">Details</Button>                                                                                                
                        </div>
                    </div>                                
                ))} 
            </div>
        </div>                                                                                                                 
     </Container>

    </>
    )
}

export default ProductsList;




/* MODAL CHILD TO PARENT & DB 
    // function
    function updateFromChild(props) {
        const user_id = localStorage.getItem('user');
        if(props.close === "Close") {
            setModal(!modal);
        } else {
            switch(popupStatus) {
                // add
                case "Add":     
                    try {
                        // validation and append
                            const user_id = localStorage.getItem('user');
                            const productUpdate = new FormData();  
                            productUpdate.append("name", props.name)   
                            productUpdate.append("thumbnail", props.thumbnail)
                            productUpdate.append("description", props.description)
                            productUpdate.append("smartTechnology", props.smartTechnology) 
                            productUpdate.append("quantity", props.quantity) 
                            productUpdate.append("category", props.category)
                            api.post(`/products`,productUpdate, {headers: {user_id}})
                            .then(res => {
                            // state array update - double dot??
                            const returnedProductData = res.data
                            const newProduct = {"_id":returnedProductData.product._id,
                                                "name":returnedProductData.product.name,
                                                "description":returnedProductData.product.description,
                                                "category":returnedProductData.product.category,
                                                "thumbnail_url":returnedProductData.product.thumbnail_url,
                                                "quantity":returnedProductData.product.quantity,
                                                "smartTechnology":returnedProductData.product.smartTechnology};
                            const newProductsData = allProductData.slice();
                            newProductsData.push(newProduct);
                            setAllProductData(newProductsData);
                            // load
                            setUpdateStatus('complete');
                            const interval = setInterval(() => {
                                setModal(!modal);
                                clearInterval(interval);
                            }, 2000 );
                        }); 
                    } catch (error) {
                        Promise.reject(error);
                    }
                break;
                case "Delete":  
                    api.delete(`/products/${props.productId}`)
                    .then(res => {
                        // state array update
                        const newProductData = allProductData.filter(allProductData => allProductData._id !== props.productId);
                        setAllProductData(newProductData);
                        // load 
                        setUpdateStatus('complete');
                        const interval = setInterval(() => {
                            setModal(!modal);
                            clearInterval(interval);
                        }, 2000 );                    
                    }); 
                    break;        
                case "Edit":
                    try {
                            const user_id = localStorage.getItem('user');
                            const productUpdate = new FormData();  
                            productUpdate.append("name", props.name)
                            productUpdate.append("date", props.date) 
                            productUpdate.append("category", props.category)  
                            productUpdate.append("quantity", props.quantity)  
                            productUpdate.append("smartTechnology", props.smartTechnology) 
                            productUpdate.append("description", props.description)
                            productUpdate.append("thumbnail", props.thumbnail)
                            api.post(`/products/${props.productId}`,productUpdate, {headers: {user_id}})
                            .then(res => {
                                // state array update
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
                                }
                                // load
                                setUpdateStatus('complete');
                                const interval = setInterval(() => {
                                    setModal(!modal);
                                    clearInterval(interval);
                                }, 2000 ); 
                            });            
                    } catch (error) {
                        Promise.reject(error);
                    }
                    break;
                case "Close":    
                        setModal(!modal); 
                    break;                            
            default:
                
            }
        }
    }

// INFORMATION POPUPS
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [tiedBlankStockItems,setTiedBlankStockItems] = useState({});

    */

    /* POPUP STATE 
    {popupStatus != ""?
    <div>
       {deleteWarning}
        <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName="custom-modal-style">
            <ModalHeader toggle={toggle}>
                {popupStatus === "Add"?`Add Product`:null}
                {popupStatus === "Edit"?"Edit Product":null}
                {popupStatus === "Delete"?"Delete Product":null}
            </ModalHeader>
            <ModalBody>
                {popupStatus === "Add"?<ProductsAdd       updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus}
                                                            categoryType = {categoryType}
                                                            />:null} 
                {popupStatus === "Edit"?<ProductsEdit     updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus} 
                                                            productId={productId}/>
                                                            :null} 
                {popupStatus === "Delete"?<ProductsDelete updateFromChild={updateFromChild} 
                                                            updateStatus={updateStatus} 
                                                            productId={productId} 
                                                            />:null}            
            </ModalBody>
            </Modal>
    </div>:
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true}>
            <ModalHeader toggle={toggle}>
                Error
            </ModalHeader>
            <ModalBody>
                No Popup Status Selected.
            </ModalBody>
        </Modal>
    </div>
    }    */


    /* PARENT TO MODAL CHILD - OLD *********
    const [modal, setModal] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    //const [productId, setProductId] = useState(''); 
    const [updateStatus, setUpdateStatus] = useState('default');
    const [categoryType, setCategoryType] = useState('');
    const toggle = (props) => {setModal(!modal);};
    /* pop ups - add/edit/delete
    function toggleFunction(props) {
        setModal(!modal);
            if(props.popupStatus === "Edit") {
                setPopupStatus("Edit");
                setUpdateStatus('edit');
                setProductId(props.productId);
            } else if (props.popupStatus === "Add"){
                setPopupStatus("Add");
                setUpdateStatus('add');
            } else if (props.popupStatus === "Delete"){
                setPopupStatus("Delete");
                setProductId(props.productId);
            }   
    } */