import React, { useState, useEffect } from "react";
import { Button, Container, Modal, ModalHeader, ModalBody} from 'reactstrap';
import CategoriesAdd from "./categoriesAdd";
import CategoriesEdit from "./categoriesEdit";
import CategoriesDelete from "./categoriesDelete";
import SubCategoriesAdd from "./subCategoryAdd";
import SubCategoriesEdit from "./subCategoryEdit"
import SubCategoriesDelete from "./subCategoryDelete";
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";



const CategoryList = () => {


// CONTEXT CATEGORIES
    const {categoryTypeObj,
        categoryDataObj,
        subCategoryDataObj,
        categoryUpdateDataObj,
        categoriesListObj,
        categoryIdObj
        } = React.useContext(CategoriesContext);
    const [categoryType, setCategoryType] = categoryTypeObj;
    const [categoryData, setCategoryData] = categoryDataObj;
    const [categoryUpdateData, setCategoryUpdateData] = categoryUpdateDataObj;     
    const [subCategoryData, setSubCategoryData] = subCategoryDataObj;
    const [categoriesList, setCategoriesList] = categoriesListObj;
    const [categoryId, setCategoryId] = categoryIdObj;

// LOCALE
    //const [categoriesList, setCategoriesList] = useState([]);
    const [subCategoryId, setSubCategoryId] = useState('');
    const [updateList, setUpdateList] = useState(false);
    const [popupStatus, setPopupStatus] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};



// DATA COLLECTION
    useEffect(() => {
            const user_id = localStorage.getItem('user');
            const categoryCollect = new FormData();             
            categoryCollect.append("categoryType", categoryType)
            api.post(`/categories/bytype`, categoryCollect, {headers: {user_id}})
            .then(res => {
            setCategoriesList(res.data);  
            });
    }, [categoryType])


// DATA FOR POPUPS       
    function submitForPopups(updateProps) {
        setCategoryId(updateProps.categoryId);
        setSubCategoryId(updateProps.subCategoryId);
        // category
        if(updateProps.popupStatus === "editCategory" || updateProps.popupStatus === "deleteCategory" ) {
            const user_id = localStorage.getItem('user');
            api.get(`/categories/${updateProps.categoryId}`,{headers: {user_id}})
            .then(res => {
                setCategoryData(res.data);
            });
        }
        // sub category
        if(updateProps.popupStatus === "editSubCategory" || updateProps.popupStatus === "deleteSubCategory" ) {
            const user_id = localStorage.getItem('user');
            api.get(`/subcategories/${updateProps.subCategoryId}`,{headers: {user_id}})
            .then(res => {
                setSubCategoryData(res.data);
            });
            api.get(`/categories/${updateProps.categoryId}`,{headers: {user_id}})
            .then(res => {
                setCategoryData(res.data);
            });
        }
        // popup                
        setPopupStatus(updateProps.popupStatus);
        toggle();
    }


// UPDATE FROM CHILD
function updateFromChild(props) {
    if (props.closeModal === true) { toggle(); }
    setUpdateList(props.updateList);
}    


// STATE UPDATE
    useEffect(() => {
        if (updateList === true) {
            setUpdateList(false);
            // categories
            if (popupStatus === "addCategory") {
                    const newCategoriesList = categoriesList.slice();
                    newCategoriesList.push(categoryData);
                    setCategoriesList(newCategoriesList);              
            }
            if (popupStatus === "editCategory") {
                for (let i=0; i < categoriesList.length; i++) {
                    if (categoriesList[i]._id === categoryData._id) { // double dot - look at objects
                            const newCategoriesList = [...categoriesList];
                            newCategoriesList[i] = categoryData;
                            setCategoriesList(newCategoriesList);
                    }
                }
            } 
            if (popupStatus === "deleteCategory") {
                const newCategoryList = categoriesList.filter(categoryItem => categoryItem._id !== categoryId);
                setCategoriesList(newCategoryList);
            } 
            // sub categories
            if (popupStatus === "addSubCategory") {
               for (let i=0; i < categoriesList.length; i++) {                  
                    if (categoriesList[i]._id === categoryData._id) {
                        const newCategoriesList = [...categoriesList];
                        newCategoriesList[i] = categoryData;
                        setCategoriesList(newCategoriesList);
                    }
                }              
            }   
            if (popupStatus === "deleteSubCategory") {
                for (let i=0; i < categoriesList.length; i++) {                  
                    if (categoriesList[i]._id === categoryData._id) {
                        const newCategoriesList = [...categoriesList];
                        newCategoriesList[i] = categoryData;
                        setCategoriesList(newCategoriesList);
                    }
                }                 
            }
            if (popupStatus === "editSubCategory") {                
                const newCategoriesList = [...categoriesList];
                for (let i=0; i < categoriesList.length; i++) {                  
                   if (categoriesList[i]._id === categoryData._id) {  
                        newCategoriesList[i] = categoryData;
                    }
                    if (categoriesList[i]._id === categoryUpdateData._id) {
                        newCategoriesList[i] = categoryUpdateData;
                        
                    }
                }   
                setCategoriesList(newCategoriesList);                      
            }
        }
}, [updateList])




return (
    <>
    {/* POPUP STATE */}
    {popupStatus != ""?
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true} >
            <ModalHeader toggle={toggle}>
                {popupStatus === "addCategory"?`Add Category`:null}
                {popupStatus === "addSubCategory"?`Add Sub Category`:null}
                {popupStatus === "editCategory"?"Edit Category":null}
                {popupStatus === "editSubCategory"?`Edit Sub Category`:null}
                {popupStatus === "deleteCategory"?"Delete Category":null}
                {popupStatus === "deleteSubCategory"?`Delete Sub Category`:null}
            </ModalHeader>
            <ModalBody>
                {popupStatus === "addCategory"?<CategoriesAdd updateFromChild={updateFromChild}/>:null} 
                {popupStatus === "addSubCategory"?<SubCategoriesAdd updateFromChild={updateFromChild} categoriesList={categoriesList}/>:null} 
                {popupStatus === "editCategory"?<CategoriesEdit updateFromChild={updateFromChild} categoryId={categoryId}/>:null} 
                {popupStatus === "editSubCategory"?<SubCategoriesEdit updateFromChild={updateFromChild} categoriesList={categoriesList} subCategoryId={subCategoryId} categoryId={categoryId}/>:null} 
                {popupStatus === "deleteCategory"?<CategoriesDelete updateFromChild={updateFromChild} categoryId={categoryId}/>:null} 
                {popupStatus === "deleteSubCategory"?<SubCategoriesDelete  updateFromChild={updateFromChild} categoryId={categoryId} subCategoryId={subCategoryId}/>:null} 
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
    }    

    <Container fluid>     
        <div className={`row`}>
            <div className="col-12"> 
                <div className="row margin-bottom-20">
                    <div className="col-6">
                        <h4 className="margin-0 padding-0">For 
                            {categoryType === "products"?" Products":null}
                            {categoryType === "accessories"?" Accessories":null}
                        </h4>
                    </div> 
                    <div className="col-6 right">
                        <Button variant="secondary" size="sm" onClick={() => submitForPopups({ popupStatus:"addCategory" })}>Add Category</Button>&nbsp; 
                        <Button size="sm" onClick={() => submitForPopups({ popupStatus:"addSubCategory" })}>Add Sub Category</Button> 
                    </div>                                                                                                    
                </div>
                <div className="row header-dk margin-bottom-40">
                    <div className="col-12">Name</div>
                </div>
                {/* CATEGORIES */}
                {categoriesList.map(categoryItem => (
                <div key={categoryItem._id} className="row padding-top-5 padding-bottom-5">
                    <div className="col-12">
                        <div className="row vy-lt-grey-panel padding-top-5 padding-bottom-5 margin-0">
                            <div className="col-4">{categoryItem.name}</div>
                            <div className="col-4"></div>
                            <div className="col-4 right">                      
                                <Button onClick={() => submitForPopups({ popupStatus:"editCategory", categoryId:categoryItem._id })} size="sm">Edit</Button>&nbsp;
                                <Button onClick={() => submitForPopups({ popupStatus:"deleteCategory",categoryId:categoryItem._id })} size="sm">Del</Button>
                            </div>
                        </div>
                         {/* SUB CATEGORIES */}
                        {categoryItem.subCategory.map(item => (
                        <div key={item._id} className="row vvy-lt-grey-panel padding-top-5 padding-bottom-5 margin-0 border-top-white">
                            <div className="col-1"></div>
                            <div className="col-7">{item.name}</div> 
                            <div className="col-4 right">             
                                <Button onClick={() => submitForPopups({ popupStatus:"editSubCategory", 
                                                                        categoryId: categoryItem._id,
                                                                        subCategoryId: item._id })} size="sm">Edit</Button>&nbsp;
                                <Button onClick={() => submitForPopups({ popupStatus:"deleteSubCategory", 
                                                                        categoryId: categoryItem._id,
                                                                        subCategoryId:item._id })} size="sm">Del</Button>
                            </div>                         
                        </div>
                        ))}
                    </div>
                </div>   
                ))}                    
            </div>
        </div>
    </Container>

    </>
    )
}

export default CategoryList;








/* PARENT TO MODAL CHILD
    // assignments
    function toggleFunction(props) {
        setUpdateStatus('default');
        setModal(!modal);
            if(props.popupStatus === "Edit") {
                setPopupStatus("Edit");
                setCategoryType(props.categoryType);
                setCategoryId(props.categoryId);
            } else if (props.popupStatus === "Add"){
                setPopupStatus("Add");
                setCategoryType(props.categoryType);
            } else if (props.popupStatus === "Delete"){
                setPopupStatus("Delete");
                setCategoryType(props.categoryType);
                setCategoryId(props.categoryId);
                setDeleteWarning(false);
            }   
    }*/



/* MODAL CHILD TO PARENT & DB 
    // const
    const [errorMessage, setErrorMessage] = useState(false);
    const [success, setSuccess] = useState(false); 

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
                        if (props.description !== '') {
                            const user_id = localStorage.getItem('user');
                            const categoryUpdate = new FormData();  
                            categoryUpdate.append("name", props.name)  
                            api.post(`/categories`,categoryUpdate, {headers: {user_id}})
                            .then(res => {
                                const newCategory = {"_id":res.data.categoryData._id,
                                                    "name":res.data.categoryData.name};
                                const newCategoryData = allCategoryData.slice();
                                newCategoryData.push(newCategory);
                                setAllCategoryData(newCategoryData);
                                // load
                                setUpdateStatus('complete');
                                const interval = setInterval(() => {
                                    setModal(!modal);
                                    clearInterval(interval);
                                }, 2000 ); 
                            }); 
                        } else {
                            setSuccess(false);
                            setErrorMessage(true);
                        }            
                    } catch (error) {
                        Promise.reject(error);
                    }
                break;
                // delete
                case "Delete":  
                api.delete(`/categories/${props.categoryId}`)
                .then(res => {
                    // state array update
                    const newCategoryData = allCategoryData.filter(categoryData => categoryData._id !== props.categoryId);
                    setAllCategoryData(newCategoryData);
                    // load 
                    setUpdateStatus('complete');
                    const interval = setInterval(() => {
                        setModal(!modal);
                        clearInterval(interval);
                    }, 2000 );                    
                }); 
                    break;        
                // close
                case "Edit":
                    try {
                        // validation and append
                        if (props.description !== '') {
                            const user_id = localStorage.getItem('user');
                            const categoryUpdate = new FormData();  
                            categoryUpdate.append("name", props.name) 
                            api.post(`/categories/update/${props.categoryId}`,categoryUpdate, {headers: {user_id}})
                            .then(res => {
                                // state array
                                const newCategory = {"_id":res.data._id,
                                                    "name":res.data.name,
                                                    }
                                // state array update
                                for (let i=0; i < allCategoryData.length; i++) {
                                    if (allCategoryData[i]._id === newCategory._id) {
                                            const newAllCategoryData = [...allCategoryData];
                                            newAllCategoryData[i].name = newCategory.name;
                                            setAllCategoryData(newAllCategoryData);
                                    }
                                }
                                // load
                                setUpdateStatus('complete');
                                const interval = setInterval(() => {
                                    setModal(!modal);
                                    clearInterval(interval);
                                }, 2000 ); 
                            }); 
                        } else {
                            setSuccess(false);
                            setErrorMessage(true);
                        }            
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
    } */