import React, {useState, useEffect, useMemo} from "react";
import { Table, Form, Input, Container, Button, Label, Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const SubCategoryEdit = (props) => {


// CONTEXT
    const {categoryDataObj,
        subCategoryDataObj,
        categoryUpdateDataObj
        } = React.useContext(CategoriesContext);
    const [categoryData, setCategoryData] = categoryDataObj;
    const [categoryUpdateData, setCategoryUpdateData] = categoryUpdateDataObj; 
    const [subCategoryData, setSubCategoryData] = subCategoryDataObj;


// LOCALE  
    const [updateStatus, setUpdateStatus] = useState('default');
    const [subCategoryName, setSubCategoryName] = useState(''); 
    const [categoryUpdateId, setCategoryUpdateId] = useState('');


// DATA SETUP
    // category
        useEffect(() => {
            if (props.categoryId){setCategoryUpdateId(props.categoryId)};
        }, [])
    // sub category
        useEffect(() => {
            if (subCategoryData.name){setSubCategoryName(subCategoryData.name)};
        }, [subCategoryData])


// SUBMIT AS EDIT
    function submitHandler(updateProps) {
        // data
            const user_id = localStorage.getItem('user');
            const subCategoryUpdate = new FormData(); 
            if (props.subCategoryId){subCategoryUpdate.append("subCategoryId", props.subCategoryId) }
            if (updateProps.subCategoryName){subCategoryUpdate.append("name", updateProps.subCategoryName) }
            api.post(`/subcategories/edit`,subCategoryUpdate, {headers: {user_id}})
            .then(res=>{
                setUpdateStatus("complete"); 
                setSubCategoryData(res.data); 
            });      
        // ref (inc 2 child/parent updates for ref array)
            const categorySubCategoryUpdate = new FormData(); 
            categorySubCategoryUpdate.append("categoryId", props.categoryId);
            categorySubCategoryUpdate.append("categoryUpdateId", updateProps.categoryUpdateId);
            categorySubCategoryUpdate.append("subCategoryId", props.subCategoryId);
            api.post(`/categories/subcategories/pushpull`,categorySubCategoryUpdate, {headers: {user_id}})
            .then(res=>{
                setUpdateStatus("complete");
                setCategoryData(res.data.categoryData);
                setCategoryUpdateData(res.data.categoryUpdateData);
                const interval = setInterval(() => {
                    setUpdateStatus("unload");
                    setUpdateStatus('default'); 
                    clearInterval(interval);
                }, 2000 ); 
            });
    }
    useEffect(() => {
        if(updateStatus === "unload") {
            console.log("unload")
            props.updateFromChild({closeModal:true,updateList:true,categoryUpdateId:props.categoryUpdateId });
        }
    }, [updateStatus])



    return (
    <>
       <div>
        <Container fluid>
            <div className=" row">
                <div className="col-12 card-blank padding-top-10"> 
                    <div className="row">
                        <div className="col-12  padding-top-10  padding-bottom-30">Are you sure you want to update this subcategory?</div>
                    </div>                  
                    <Form>
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-3"><strong>Sub Category:</strong></div>
                            <div className="col-8"><strong><Input type="text" value={subCategoryName} onChange={event => setSubCategoryName(event.target.value)}/></strong></div>
                        </div>
                        <div className="row padding-top-20 padding-bottom-30">
                            <div className="col-1"></div>
                            <div className="col-3">Category:</div>
                            <div className="col-8">
                                <Input type="select" value={categoryUpdateId} onChange={event => setCategoryUpdateId(event.target.value)}>
                                    {props.categoriesList.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                    ))} 
                                </Input></div>
                        </div>
                        <div className = "row">
                            <div className = "col-12 right">
                                { updateStatus === "default"?
                                <div>
                                    <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp;
                                    <Button onClick={() => submitHandler({ subCategoryName: subCategoryName,
                                                                        categoryUpdateId:categoryUpdateId,
                                                                        updateStatus: "updating"
                                                                        })} variant="secondary" size="sm">Confirm and Update</Button>
                                </div>
                                : null}
                                { updateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                                { updateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null}                                           
                            </div>
                        </div>
                    </Form>
                </div>                                
            </div>
        </Container>
        </div>
    </>
    )
}

export default SubCategoryEdit