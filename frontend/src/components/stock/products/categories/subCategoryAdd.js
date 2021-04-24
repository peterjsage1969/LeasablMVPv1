import React, { useState, useEffect } from "react";
import { Table, Form, Input, Container, Button, Label, Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const SubCategoryAdd = (props) => {


// CONTEXT
    const {categoryDataObj,
    subCategoryDataObj
    } = React.useContext(CategoriesContext);
    const [categoryData, setCategoryData] = categoryDataObj;
    const [subCategoryData, setSubCategoryData] = subCategoryDataObj;


// FROM PARENT
    const [categoryId, setCategoryId] = useState('');


// LOCALE
    const [updateStatus, setUpdateStatus] = useState('default');
    const [subCategoryName, setSubCategoryName] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');


// DATA SETUP
    useEffect(() => {
        if (categoryData.categoryId){setCategoryId(categoryData.categoryId)};
    }, [categoryData])


// DATABASE ADD
    function submitHandler(updateProps) {
            const user_id = localStorage.getItem('user');
            // data
            const subCategoryUpdate = new FormData(); 
            if (updateProps.subCategoryName){subCategoryUpdate.append("name", updateProps.subCategoryName) }
            api.post(`/subcategories`,subCategoryUpdate, {headers: {user_id}})
                .then(res => {
                setSubCategoryData(res.data); 
                setSubCategoryId(res.data._id);
                // ref
                const categorySubCategoryUpdate = new FormData(); 
                categorySubCategoryUpdate.append("categoryId", updateProps.categoryId);
                categorySubCategoryUpdate.append("subCategoryId", res.data._id);
                api.post(`/categories/subcategories/push`,categorySubCategoryUpdate, {headers: {user_id}})  
                .then(res => {
                setCategoryData(res.data);               
                setUpdateStatus("complete");
                const interval = setInterval(() => {
                    setUpdateStatus("unload");
                    setUpdateStatus('default');  
                    clearInterval(interval);
                }, 2000 ); 
                })});
    }
    useEffect(() => {
        if(updateStatus === "unload") {
            props.updateFromChild({closeModal:true,updateList:true,subCategoryId:subCategoryId });
        }
    }, [updateStatus])



    return (
    <>
       <div>
        <Container fluid>
            <div className=" row">
                <div className="col-12 padding-top-10">
                    <Form>
                        <Table>
                        <tbody>  
                            <tr>  
                                <td colSpan="2">
                                    <Label value="name">Category Type</Label>
                                    <Input type="select" onChange={event => setCategoryId(event.target.value)}>
                                    <option value="">Select</option> 
                                    {props.categoriesList.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem._id}>{categoryItem.name}</option> 
                                    ))} 
                                    </Input>
                                </td>
                            </tr>                                                                  
                            <tr>  
                                <td colSpan="2">
                                    <Label value="name">Sub Category Name</Label>
                                    <Input type="text" value={subCategoryName} onChange={event => setSubCategoryName(event.target.value)}/>
                                </td>
                            </tr>                            
                        </tbody>
                        </Table>
                        <div className = "row">
                            <div className = "col-12">
                                { updateStatus === "default"?
                                <div className="col-12 right">
                                    <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp;
                                    <Button onClick={() => submitHandler({subCategoryName: subCategoryName,
                                                                        categoryId: categoryId,
                                                                        subCategoryId:subCategoryId,
                                                                        updateStatus: "updating"
                                                                 })} variant="secondary" size="sm">Add</Button>
                                </div>
                                :null}
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

export default SubCategoryAdd