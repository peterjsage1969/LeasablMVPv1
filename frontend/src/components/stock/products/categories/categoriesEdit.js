import React, {useState, useEffect} from "react";
import { Table, Form, Input, Container, Button, Label, Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const CategoriesEdit = (props) => {


// CONTEXT
    const {categoryIdObj, 
            categoryDataObj
            } = React.useContext(CategoriesContext);
    const [categoryId, setCategoryId] = categoryIdObj;
    const [categoryData, setCategoryData] = categoryDataObj;



// LOCALE
    const [updateStatus, setUpdateStatus] = useState('default');
    const [name, setName] = useState('');


// DATA COLLECTION
    useEffect(() => {
        if (categoryData.name) { setName(categoryData.name); }
    }, [categoryData])   


// DATABASE EDIT
    function submitHandler(updateProps) {
        const user_id = localStorage.getItem('user');
        const categoryUpdate = new FormData();  
        categoryUpdate.append("name", updateProps.name) 
        api.post(`/categories/update/${props.categoryId}`,categoryUpdate, {headers: {user_id}})
        .then(res => {
            //setCategoryData(res.data.categoryData);
            setCategoryData(res.data);
            setUpdateStatus('complete');
            const interval = setInterval(() => {
                setUpdateStatus('default');  
                clearInterval(interval);
                props.updateFromChild({closeModal:true, updateList:true})                    
            }, 2000 ); 
        });
    }


    return (
        <Container fluid>
            <Form>            
            <div className=" row margin-top-10">
                <div className="col-12">  
                    <Label value="name">Title</Label>
                    <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                </div>
            </div>
            <div className = "row">
                <div className = "col-12 padding-top-20 right">
                    { updateStatus === "default"?
                    <div>
                        <Button onClick={() =>props.updateFromChild({closeModal:true, updateList:false})} size="sm">Close</Button>&nbsp;
                        <Button onClick={() => submitHandler({ name: name,
                                                                updateStatus: "updating"
                                                                })} variant="secondary" size="sm">Confirm and Update</Button>
                    </div>
                    : null}
                    { updateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                    { updateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null}                                           
                </div>
            </div>
            </Form>
        </Container>
    )
}

  export default CategoriesEdit