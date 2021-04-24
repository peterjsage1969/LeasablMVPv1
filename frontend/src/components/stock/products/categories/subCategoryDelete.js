import React, {useState, useEffect} from "react";
import { Form, Container, Button, Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const SubCategoryDelete = (props) => {


// CONTEXT
    const {categoryIdObj, 
        categoryDataObj,
        subCategoryDataObj
        } = React.useContext(CategoriesContext);
    //const [categoryId, setCategoryId] = categoryIdObj;
    const [categoryData, setCategoryData] = categoryDataObj;
    const [subCategoryData, setSubCategoryData] = subCategoryDataObj;


// LOCALE
    const [updateStatus, setUpdateStatus] = useState('default');
    const [categoryName, setCategoryName] = useState('');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');        


// DATA SETUP
    // category
    useEffect(() => {
        if (categoryData.name){setCategoryName(categoryData.name)}
    }, [categoryData])
    // sub category
    useEffect(() => {
        if (subCategoryData.name){setSubCategoryName(subCategoryData.name)};
    }, [subCategoryData])



// DATA DELETE
    function submitHandler() {
        // data
            const user_id = localStorage.getItem('user');
            const subCategoryUpdate = new FormData(); 
            if (props.subCategoryId){subCategoryUpdate.append("subCategoryId", props.subCategoryId) }
        // ref
            api.post(`/subcategories/delete`,subCategoryUpdate, {headers: {user_id}})
            const categorySubCategoryUpdate = new FormData(); 
            categorySubCategoryUpdate.append("categoryId", props.categoryId);
            categorySubCategoryUpdate.append("subCategoryId", props.subCategoryId);
            api.post(`/categories/subcategories/pull`,categorySubCategoryUpdate, {headers: {user_id}})
            .then(res=>{
                setUpdateStatus("complete");
                setCategoryData(res.data);
                const interval = setInterval(() => {
                    setUpdateStatus("unload");
                    setUpdateStatus('default'); 
                    clearInterval(interval);
                }, 2000 ); 
            })
    }
    useEffect(() => {
        if(updateStatus === "unload") {
            props.updateFromChild({closeModal:true,updateList:true,subCategoryId:props.subCategoryId });
        }
    }, [updateStatus])



    return (
    <>
       <div>
        <Container fluid>
            <div className="row">
                <div className={`col-12 padding-top-10`}>  
                    <div className="row">
                        <div className="col-12  padding-top-10  padding-bottom-30">Are you sure you want to delete this subcategory?</div>
                    </div>                
                    <Form>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-3"><strong>Sub Category:</strong></div>
                            <div className="col-8"><strong>{subCategoryName}</strong></div>
                        </div>
                        <div className="row margin-bottom-20">
                            <div className="col-1"></div>
                            <div className="col-3">Category:</div>
                            <div className="col-8">{categoryName}</div>
                        </div>
                    </Form>
                    <div className=" row card-modal-btns-base">
                        { updateStatus === "default"?
                        <div className="col-12 right">
                                    <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp; 
                                    <Button color="danger" onClick={() => submitHandler({ categoryName: categoryName,
                                                                                            updateStatus: "updating"
                                                                                            })} variant="secondary" size="sm">Confirm and Delete</Button>
                        </div>: null}
                        { updateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                        { updateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null }
                    </div>                                
                </div>
            </div>
        </Container>
        </div>
    </>
    )
}

export default SubCategoryDelete