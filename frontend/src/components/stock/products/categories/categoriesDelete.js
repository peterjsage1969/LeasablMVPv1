import React, {useState, useEffect} from "react";
import { Form, Container, Button, Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const CategoriesDelete = (props) => {

// CONTEXT
    const {categoryDataObj,
        categoryTypeObj,
        categoryIdObj
        } = React.useContext(CategoriesContext);
    const [categoryData, setCategoryData] = categoryDataObj;
    const [categoryType, setCategoryType] = categoryTypeObj;
    const [categoryId, setCategoryId] = categoryIdObj;


// LOCALE
    const [updateStatus, setUpdateStatus] = useState('default');
    const [name, setName] = useState('');
    const [subCategorySinglePlural, setSubCategorySinglePlural] = useState('');
    const [subCategoryNumber, setSubCategoryNumber] = useState(0);
    const [productNumber, setProductNumber] = useState(0);
    const [productSinglePlural, setProductSinglePlural] = useState('');
    const [dependenciesMessage, setDependenciesMessage] = useState('');
    const [categoryTypeLink, setCategoryTypeLink] = useState('');


// DATA SETUP
    useEffect(() => { 
        if (categoryData.name){ setName(categoryData.name) }
        if (categoryType === "accessories"){ setCategoryTypeLink("/accessoriessort/bycategory") }
        if (categoryType === "products"){ setCategoryTypeLink("/productsort/bycategory") }
    }, [categoryData])


// DELETE CATEGORY
    function submitHandler() {
        // sub categories check
        setSubCategoryNumber(categoryData.subCategory.length);
        // products check
        const user_id = localStorage.getItem('user');
        const categoryUpdate = new FormData();  
        categoryUpdate.append("categoryId", categoryId);
        api.post(categoryTypeLink, categoryUpdate, {headers: {user_id}})
        .then(res => {
            setSubCategoryNumber(categoryData.subCategory.length);
            setProductNumber(res.data.length);           
            if (categoryData.subCategory.length != 0 || res.data.length != 0) {
                if (categoryData.subCategory.length == 1) { setSubCategorySinglePlural("subcategory"); };
                if (categoryData.subCategory.length > 1)  { setSubCategorySinglePlural("subcategories"); };
                if (categoryData.subCategory.length == 0)  { setSubCategorySinglePlural(""); };
                if (res.data.length == 1) {setProductSinglePlural("product"); };
                if (res.data.length > 1)  {setProductSinglePlural("products"); };
                if (res.data.length == 0)  {setProductSinglePlural(""); };
            } else {
                api.delete(`/categories/${categoryId}`)
                setUpdateStatus("complete");
                const interval = setInterval(() => {
                    setUpdateStatus('default'); 
                    clearInterval(interval);
                    props.updateFromChild({closeModal:true,updateList:true}) 
                }, 2000 );
            }              
        }) 
    }    
    // cross checking
    useEffect(() => { 
        if (subCategoryNumber >0 && productNumber >0) {
            setDependenciesMessage("You have "  + subCategoryNumber + " " +  subCategorySinglePlural + 
                                    " and " + productNumber + " " + productSinglePlural + " associated with this category.  Their category and subcategory associations will be removed if you delete this category. " +
                                    "Do you wish to continue?");
        } else if (subCategoryNumber >0 && productNumber === 0) {
            setDependenciesMessage("You have "  + subCategoryNumber + " " +  subCategorySinglePlural 
                                    + " associated with this category.  Their category and subcategory associations will be removed if you delete this category. " +
                                    "Do you wish to continue?");
        }


                                        // delete sub category references



                                        // delete product references



                                        // delete category itself










                                        /* api.delete(`/categories/${props.categoryId}`)
                                        setUpdateStatus("complete");
                                        const interval = setInterval(() => {
                                            setUpdateStatus('default'); 
                                            clearInterval(interval);
                                            props.updateFromChild({closeModal:true,updateList:true}) 
                                        }, 2000 ); */            

    }, [subCategoryNumber,productNumber,subCategorySinglePlural,productSinglePlural])    
    


    return (
    <Container fluid> 
        <Form>
            <div className="row padding-top-10">
                <div className="col-2"><strong>Name:</strong></div>
                <div className="col-10">< strong>{name}</strong></div>
            </div>        
            <div className="row padding-top-10  padding-bottom-20">
                <div className="col-12">
                    {dependenciesMessage?
                    <Alert color="danger" >{dependenciesMessage}</Alert>:
                    null}
                </div>
            </div>  
            <div className=" row card-modal-btns-base">
                { updateStatus === "default"?
                <div className="col-12 right">
                            <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp;
                            <Button color="danger" onClick={() => submitHandler({ crudStatus: "delete",
                                                                name: name,
                                                                categoryType: categoryType,
                                                                updateStatus: "updating"
                                                        })} variant="secondary" size="sm">Delete</Button>
                </div>: null}
                { updateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                { updateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null }
            </div>
        </Form>
    </Container>
    )
}

  export default CategoriesDelete