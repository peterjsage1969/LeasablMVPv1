import React, {useState, useEffect, useMemo} from "react";
import { Input, Container, Label, Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import api from "../../../services/api";
import FileUploader from '../../../services/fileUploader'
import { ProductsContext } from "./../../../components/stock/products/productsContext";
import { CategoriesContext } from "./categories/categoriesContext";
import ProductsDelete from "./productsDelete"


const ProductStock = (props) => {
    
    
    // CONTEXT PRODUCTS
        const {pageStateViewObj, 
                productIdObj, 
                productDataObj, 
                productUpdateStatusObj,
                clickHistoryObj
            } = React.useContext(ProductsContext);
        const [pageViewState, setPageViewState] = pageStateViewObj;
        const [productId, setProductId] = productIdObj;
        const [productData, setProductData] = productDataObj;
        const [updateStatus, setUpdateStatus] = productUpdateStatusObj;
        const [clickHistory, setClickHistory] = clickHistoryObj;   
    
    
    // CONTEXT CATEGORIES
        const {categoriesListObj,
            categoryIdObj,
            subCategoryIdObj
        } = React.useContext(CategoriesContext);
        const [categoriesList, setCategoriesList] = categoriesListObj;
    
    
    // LOCALE
        const [subCategoryList, setSubCategoryList] = useState([]);
        const [showSubCategory, setShowSubCategory] = useState('');
        const [subCategoryReset, setSubCategoryReset] = useState(false);
        const [name, setName] = useState('');
        const [category, setCategory] = useState('');   
        const [description, setDescription] = useState('');
        const [isSmart, setIsSmart] = useState('');
        const [smartTechnology, setSmartTechnology] = useState('');    
        const [thumbnail_url, setThumbnail_url] = useState(null);
        const [categoryId, setCategoryId] = useState('');
        const [subCategoryId, setSubCategoryId] = useState('');
    
    
    // PAGE DATA
        // collect
            useEffect(() => { 
                const user_id = localStorage.getItem('user');
                api.get(`/products/${productId}`,{headers: {user_id}})
                .then(res => {
                    setProductData(res.data);
                    });
            }, [productId]) 
        // populate
            useEffect(() => { 
                console.log(productData)
                if(productData.name && productId != ''){setName(productData.name)};
                if(productData.description && productId != ''){setDescription(productData.description)};
                if(productData.category && productId != ''){setCategoryId(productData.category._id)} else {setCategoryId('')};
                if(productData.subCategory && productId != ''){setSubCategoryId(productData.subCategory)} else {setSubCategoryId('')};
                if(productData.isSmart && productId != ''){setIsSmart(productData.isSmart)};
                if(productData.smartTechnology && productId != ''){setSmartTechnology(productData.smartTechnology)};
                if(productData.thumbnail_url && productId != ''){setThumbnail_url(productData.thumbnail_url)};
            }, [productData]) 
        // sub category dropdown
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
            useEffect(() => { 
                if (subCategoryList[0] && categoryId != '') {
                    setShowSubCategory("list")
                    setSubCategoryReset(true);                
                } else {
                    setShowSubCategory("noList")
                }
            }, [subCategoryList])  
        // smart tech dropdown
            const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);    
            useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])}, [])
        // thumbnail image
            const [thumbnailPreview, setThumbnailPreview] =  useState(null);
            const [imageSwitch,setImageSwitch] = useState('default');
            const preview = useMemo(() => {
                return thumbnailPreview ? URL.createObjectURL(thumbnailPreview) : null;        
            },[thumbnailPreview])  
            const onFileSelect = (props) => {
                setThumbnailPreview(props);
                setImageSwitch('preview')      
            }
    
    
    
    // ADD, EDIT & DELETE
        // add
        function submitHandler(props) {
            if (props.crudType === "add") {
                const user_id = localStorage.getItem('user');
                const productUpdate = new FormData();  
                productUpdate.append("name", props.name) 
                if(props.categoryId){productUpdate.append("category", props.categoryId)};
                if(props.subCategoryId){productUpdate.append("subCategory", props.subCategoryId)}
                productUpdate.append("description", props.description) 
                if (props.thumbnail){productUpdate.append("thumbnail", props.thumbnail) }
                api.post(`/products`,productUpdate, {headers: {user_id}})
                .then(res => {
                    setProductData(res.data)
                    setUpdateStatus("complete");
                    const interval = setInterval(() => {
                        setUpdateStatus("default");    
                        clearInterval(interval);
                    }, 2000 );                               
                })
            }
            // edit
            if (props.crudType === "edit") {
                const user_id = localStorage.getItem('user');
                const productUpdate = new FormData();   
                productUpdate.append("name", props.name) 
                if(props.categoryId){productUpdate.append("category", props.categoryId)};
                if(props.subCategoryId){productUpdate.append("subCategory", props.subCategoryId)};
                productUpdate.append("description", props.description)
                if (props.thumbnail){productUpdate.append("thumbnail", props.thumbnail) }
                api.post(`/products/${productId}`,productUpdate, {headers: {user_id}})
                .then(res => {
                    setProductData(res.data)
                    setUpdateStatus("complete");
                    const interval = setInterval(() => {
                        setUpdateStatus("default");    
                        clearInterval(interval);
                    }, 2000 ); 
                })
            }    
        }
        // delete popup
        const [popupStatus, setPopupStatus] = useState('');
        const [modal, setModal] = useState(false);
        const toggle = (props) => {setModal(!modal);};
        function popUpSetter(props) {
            if (props.popupStatus === 'delete') {
                setPopupStatus(props.popupStatus)
                toggle();
            }
        }
    
    
    
    // UPDATING
        const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
        useEffect(() => {
            if(updateStatus) {
                setLocalUpdateStatus(updateStatus);
                if (updateStatus === "close") {
                    toggle();
                    setUpdateStatus("default");
                    setPageViewState([{bodyComponent:"viewList"}])
                }
            }
        }, [updateStatus])
    
    
    
    
        return (
        <>
        {popupStatus != ""?
            <div>
                <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName="custom-modal-style">
                    <ModalHeader toggle={toggle}>
                        {popupStatus === "delete"?"Delete Product":null}
                    </ModalHeader>
                    <ModalBody>
                        { popupStatus === "delete"?<ProductsDelete/>:null}            
                    </ModalBody>
                    </Modal>
            </div>
            : null}
           <div> 
            <Container fluid>
                <div className=" row padding-0 margin-0 height-500">
                    <div className="col-6">                                            
                        <div className=" row padding-top-20">
                            <div className="col-12"> 
                                <div>{ isSmart }  
                                    <Label value="name">Name</Label>
                                    <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div  className="row padding-top-20">
                            <div className="col-12"> 
                                <div>
                                    <Label value="description">Category</Label>
                                        <Input type="select" value={categoryId} onChange={event => setCategoryId(event.target.value)}>
                                            {categoryId === ''? <option key="blank" value=''></option> : null}
                                        {categoriesList.map(categoryItem => (
                                        <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                        ))} 
                                        </Input>
                                </div> 
                            </div> 
                        </div>
                        <div  className="row padding-top-10">
                            <div className="col-12"> 
                                {showSubCategory === "list"?
                                <div>
                                    Sub Category
                                    <Input type="select" value={subCategoryId} onChange={event => setSubCategoryId(event.target.value)}>
                                        {subCategoryReset === true? <option key="blank" value=''></option> : null}
                                        {subCategoryList.map(categoryItem => (
                                        <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                        ))} 
                                    </Input>
                                </div> 
                                :null}
                            </div>
                        </div>              
                        {/*<div className="row padding-top-20">
                            <div className="col-5">
                                <div  className="row">
                                    <div className="col-12 font-weight-600">
                                        Is Smart Tagged?
                                    </div>
                                </div>
                                <div  className="row">
                                    <div className="col-12 inline">
                                        <div className="padding-top-5"><Label className="font-weight-normal" for="isSmartTaggedNo">No</Label></div>
                                        <div className="padding-left-30 padding-top-6"><Input type="radio" id="isSmartTaggedNo" name="isSmartTagged" value="no" onChange={event => setIsSmart(event.target.value)}/></div>
                                        <div className="padding-left-30 padding-top-5"><Label className="font-weight-normal" for="isSmartTaggedYes">Yes</Label></div>
                                        <div className="padding-left-30 padding-top-6"><Input type="radio" id="isSmartTaggedYes" name="isSmartTagged" value="yes" onChange={event => setIsSmart(event.target.value)}/></div>
                                    </div>
                                </div>                            
                            </div>
                            <div className="col-7">
                                <Label value="description">Technology</Label>
                                <Input type="select" value={smartTechnology} onChange={event => setSmartTechnology(event.target.value)}>
                                        <option value="">Select</option> 
                                        {smartTechnologyValues.map(smartTechnologyItem => (
                                        <option key={smartTechnologyItem.name} value={smartTechnologyItem._id}>{smartTechnologyItem.name}</option> 
                                        ))} 
                                        </Input>
                                        </div>                                               
                        </div>         */}            
                        <div  className="row padding-top-20">
                            <div className="col-12"> 
                                <div>
                                    <Label value="description">Description</Label>
                                    <Input type="textarea" className="height-150" value={description} onChange={event => setDescription(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 padding-0">
                        <div className="row margin-0">
                            <div className="col-12">                
                                <div className="height-230 margin-top-45 margin-bottom-20 center">
                                    {imageSwitch === "preview"?
                                    <img id="thumbnail" className="width-220 border" src={preview} alt="uploaded" /> 
                                    : null}
                                    {imageSwitch === "default" && pageViewState === "edit"?
                                    <img className="width-220 border" src={thumbnail_url} alt="uploaded" /> 
                                    : null} 
                                </div>
                            </div>
                        </div>
                        <div className="row margin-0">
                            <div className="col-12 padding-0 right">
                                {pageViewState === "edit" ?
                                <FileUploader onFileSelect = {onFileSelect} btnText = "Edit Image"/>:
                                <FileUploader onFileSelect = {onFileSelect} btnText = "Add Image"/>}
                            </div> 
                        </div>                        
                    </div>
                </div>
    
                <div className = "row margin-0">
                    <div className = "col-12 padding-0 right">
                        {pageViewState === "edit"  && localUpdateStatus === "default"?
                            <div>
                                <Button onClick={() => popUpSetter({ popupStatus:"delete" })}>Delete</Button>&nbsp;
                                <Button variant="secondary" onClick={(event) =>submitHandler({crudType:"edit",
                                                                                            name:name,
                                                                                            categoryId: categoryId,
                                                                                            subCategoryId: subCategoryId,
                                                                                            description: description,
                                                                                            thumbnail: thumbnailPreview, 
                                                                                            updateStatus: "updating"
                                                                                            })}>Update</Button> 
    
                            </div> : null}    
                        { pageViewState === "add" && localUpdateStatus === "default"?
                            <div>
                                <Button variant="secondary" onClick={(event) =>submitHandler({crudType:"add",
                                                                                            name:name,
                                                                                            categoryId: categoryId,
                                                                                            subCategoryId: subCategoryId,
                                                                                            description: description,
                                                                                            thumbnail: thumbnailPreview,
                                                                                            updateStatus: "updating"
                                                                                            })}>Add New</Button> 
                            </div> : null } 
    
    
    
                        { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updating...</Alert></div>: null}
                        { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null}                                           
                    </div>
                    </div>          
    
    
    
    
          
            </Container>
            </div>
        </>
        )
    }


export default ProductStock;