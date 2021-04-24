import React, {useState } from "react";
import { Table, Form, Input, Container, Button, Label,Alert } from 'reactstrap';
import api from "../../../../services/api";
import { CategoriesContext } from "./categoriesContext";


const CategoriesAdd = (props) => {


// CONTEXT
    const {categoryDataObj,
        categoryTypeObj
        } = React.useContext(CategoriesContext);
    const [categoryData, setCategoryData] = categoryDataObj;
    const [categoryType, setCategoryType] = categoryTypeObj;


// LOCALE
    const [updateStatus, setUpdateStatus] = useState('default');
    const [name, setName] = useState('');



// DATA ADD
    function submitHandler(updateProps) {
        const user_id = localStorage.getItem('user');
        const categoryUpdate = new FormData(); 
        if (updateProps.name){categoryUpdate.append("name", updateProps.name) }
        if (categoryType){categoryUpdate.append("categoryType", categoryType) }
            api.post(`/categories`,categoryUpdate, {headers: {user_id}})
            .then(res => {
            setCategoryData(res.data);       
        });
        setUpdateStatus("complete");
        const interval = setInterval(() => {
            setUpdateStatus('default');  
            clearInterval(interval);
            props.updateFromChild({closeModal:true,updateList:true})  
        }, 2000 ); 
    }



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
                                    <Label value="name">Title</Label>
                                    <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                                </td>
                            </tr>                                                                                                                
                        </tbody>
                        </Table>
                        <div className = "row">
                            <div className = "col-12">
                                { updateStatus === "default"?
                                <div className="col-12 right">
                                    <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp;
                                    <Button onClick={() => submitHandler({ name: name,
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

  export default CategoriesAdd