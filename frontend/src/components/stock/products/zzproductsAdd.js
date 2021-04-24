import React, {useState, useEffect, useMemo} from "react";
import { Table, Form, Input, Container, Button, Label,Alert } from 'reactstrap';
import FileUploader from '../../../services/fileUploader'
import api from '../../../services/api';

const CategoriesAdd = (props) => {

// DATA SETUP   
        // smart tech drop down
        const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);
        useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])
        }, [])
        // categories dropdown
        const [allCategoryData, setAllCategoryData] = useState([]);  // Total Amount      
        // all stock
        useEffect(() => {
            api.get(`/categories`)
            .then(res => {
                setAllCategoryData(res.data)          
            });
        }, []) 


// DATA TO SEND
    // const
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [smartTechnology, setSmartTechnology] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);  



// THUMBNAIL IMAGE FROM CHILD
    // preview feature
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;        
    },[thumbnail]) 
    // response from parent
    const onFileSelect = (props) => {
        setThumbnail(props);         
    }


// LOADING STATUS
    const [updateStatus, setUpdateStatus] = useState('');     
    //updateStatus
    useEffect(() => { 
        setUpdateStatus(props.updateStatus);
    }, [props.updateStatus])



// POPUP CLOSE
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);    


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
                                            <td rowSpan="5" className="width-300">
                                                <div className="height-280 margin-30">
                                                    <Label id="thumbnail" style={{ backgroundImage: `url(${preview})` }} className={thumbnail? 'margin-0 height-280': 'margin-0 height-280 border'}/>
                                                </div>
                                                <div className="right margin-right-30">
                                                    <FileUploader onFileSelect = {onFileSelect} btnText = {"Add Image"}/>
                                                </div>                                               
                                            </td> 
                                            <td>
                                                <Label value="name">Name</Label>
                                                <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label value="category">Category</Label>
                                                <Input type="select" value="select" onChange={event => setCategory(event.target.value)}>
                                                    <option value="">Select</option> 
                                                    {allCategoryData.map(categoryItem => (
                                                    <option key={categoryItem._id} value={categoryItem.name}>{categoryItem.name}</option> 
                                                    ))} 
                                                </Input>                                                   
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label value="quantity">Quantity</Label>
                                                <Input type="number" value={quantity} onChange={event => setQuantity(event.target.value)}/>
                                            </td>
                                        </tr>                                        
                                        <tr>
                                            <td>
                                                <Label value="technology">Technology</Label>
                                                <Input type="select" name="select" value={smartTechnology} onChange={event => setSmartTechnology(event.target.value)}>
                                                    <option value=""></option>
                                                    {smartTechnologyValues.map(smartTechnologies => (
                                                    <option key={smartTechnologies} value={smartTechnologies}>{smartTechnologies}</option>
                                                    ))}
                                                </Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Label value="description">Description</Label>
                                                <Input type="textarea" className="height-150" value={description} onChange={event => setDescription(event.target.value)}/>
                                            </td>
                                        </tr>                                                                               
                                    </tbody>
                                    </Table>
                                    <div className = "row">
                                        <div className = "col-12">
                                            { updateStatus === "default"?
                                            <div className="col-12 right">
                                                <Button onClick={(event) => props.updateFromChild({close:"Close"})} >Close</Button>&nbsp;
                                                <Button variant="secondary" onClick={(event) => props.updateFromChild({name:name,
                                                                                                                        description:description,
                                                                                                                        smartTechnology:smartTechnology,
                                                                                                                        quantity:quantity,
                                                                                                                        thumbnail: thumbnail,
                                                                                                                        category: category                                           
                                                                                                                        })}>Add New</Button> 
                                                                                          
                                            </div>: null}
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