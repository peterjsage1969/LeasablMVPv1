import React, {useState, useEffect, useMemo} from "react";
import { Input, Container, Label, Alert, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import api from "../../../services/api";
import FileUploader from '../../../services/fileUploader'
import AccessoryDelete from "./accessoryDelete";
import { AccessoriesContext } from "../accessories/accessoriesContext";


const AccessoriesAddEdit = (props) => {


// CONTEXT STORE
    const {accessoriesListObj,
        showAccessoriesListObj,
        pageStateViewObj, 
        accessoryDataObj,
        clickHistoryObj,
        accessoryIdObj,

        accessoriesBodyComponentObj,
        accessoryCrudStatusObj,
        accessoryUpdateStatusObj,
        accessoryUpdateDataObj
        } = React.useContext(AccessoriesContext);
    const [accessoriesList, setAccessoriesList] = accessoriesListObj;
    const [showAccessoriesList, setShowAccessoriesList] = showAccessoriesListObj;
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [bodyComponent, setBodyComponent] = accessoriesBodyComponentObj;
    const [crudStatus, setCrudStatus] = accessoryCrudStatusObj
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [accessoryId, setAccessoryId] = accessoryIdObj;
    const [accessoryData, setAccessoryData] = accessoryDataObj;
    const [updateStatus, setUpdateStatus] = accessoryUpdateStatusObj;
    const [accessoryUpdateData, setAccessoryUpdateData] = accessoryUpdateDataObj;


// CONTEXT GET
    // data
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');   
    const [description, setDescription] = useState('');
    const [smartTechnology, setSmartTechnology] = useState('');    
    const [thumbnail_url, setThumbnail_url] = useState(null);
    useEffect(() => { 
        if(accessoryData.name){setName(accessoryData.name)};
        if(accessoryData.category){setCategory(accessoryData.category)};
        if(accessoryData.description){setDescription(accessoryData.description)};
        if(accessoryData.thumbnail_url){setThumbnail_url(accessoryData.thumbnail_url)};
    }, [accessoryData]) 


// CONTEXT SET
function setContext(props) {
    setCrudStatus([{crudType:props[0].crudType }]); 
    setAccessoryUpdateData([{
        name: props[0].name,
        category: props[0].category,
        description: props[0].description,
        thumbnail: props[0].thumbnail
    }])
    setUpdateStatus([{
        updateStatus: props[0].updateStatus
    }])
}



// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
        if(updateStatus[0]) {
            setLocalUpdateStatus(updateStatus[0].updateStatus);
            if (updateStatus[0].updateStatus === "close") {
                toggle();
                setUpdateStatus([{updateStatus:"default"}]);
                setPageViewState([{bodyComponent:"viewList"}])
            }
        }
    }, [updateStatus])


// DROP DOWNNS
    // smart tech
    const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);    
    useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])}, [])
    // categories
    const [allCategoryData, setAllCategoryData] = useState([]);
    useEffect(() => { api.get(`/categories`).then(res => { setAllCategoryData(res.data) }); }, []) 



// THUMBNAIL IMAGE
    const [thumbnailPreview, setThumbnailPreview] =  useState(null);
    const [imageSwitch,setImageSwitch] = useState('default');
    // image update
    const preview = useMemo(() => {
        return thumbnailPreview ? URL.createObjectURL(thumbnailPreview) : null;        
    },[thumbnailPreview])  
    const onFileSelect = (props) => {
        setThumbnailPreview(props);
        setImageSwitch('preview')      
    }


// POPUP
    const [popupStatus, setPopupStatus] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};
    function popUpSetter(props) {
        if (props.popupStatus === 'delete') {
            setPopupStatus(props.popupStatus)
            toggle();
        }
    }



    return (
    <>
    {popupStatus != ""?
        <div>
            <Modal isOpen={modal} toggle={toggle} centered={true} contentClassName="custom-modal-style">
                <ModalHeader toggle={toggle}>
                    {popupStatus === "delete"?"Delete Product":null}
                </ModalHeader>
                <ModalBody>
                    { popupStatus === "delete"?<AccessoryDelete/>:null}            
                </ModalBody>
                </Modal>
        </div>
        : null}
       <div> 
        <Container fluid>
            <div className=" row padding-0 margin-0 height-420">
                <div className="col-6">                                            
                    <div className=" row padding-top-20">
                        <div className="col-12"> 
                            <div>{/* productDataTest */}  
                                <Label value="name">Name</Label>
                                <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    <div  className="row padding-top-20">
                        <div className="col-12"> 
                            <div>
                                <Label value="description">Category</Label>
                                <Input type="select" value={category} onChange={event => setCategory(event.target.value)}>
                                    <option value="">Select</option> 
                                    {allCategoryData.map(categoryItem => (
                                    <option key={categoryItem._id} value={categoryItem.name}>{categoryItem.name}</option> 
                                    ))} 
                                </Input>
                            </div> 
                        </div>
                    </div>
                    <div  className="row padding-top-20">
                        <div className="col-12"> 
                            <div>
                                <Label value="description">Descriptions</Label>
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
                                {imageSwitch === "default" && pageViewState[0].bodyComponent === "viewEdit"?
                                <img className="width-220 border" src={thumbnail_url} alt="uploaded" /> 
                                : null} 
                            </div>
                        </div>
                    </div>
                    <div className="row margin-0">
                        <div className="col-12 padding-0 right">{pageViewState[0].bodyComponent} XXX
                            {pageViewState[0].bodyComponent === "viewEdit" ?
                            <FileUploader onFileSelect = {onFileSelect} btnText = "Edit Image"/>:
                            <FileUploader onFileSelect = {onFileSelect} btnText = "Add Image"/>}
                        </div> 
                    </div>                        
                </div>
            </div>

            <div className = "row margin-0">
                <div className = "col-12 padding-0 right">
                    {pageViewState[0].bodyComponent === "viewEdit" ? //&& localUpdateStatus === "default"
                        <div>
                            <Button onClick={() => popUpSetter({ popupStatus:"delete" })}>Delete</Button>&nbsp;
                            <Button variant="secondary" onClick={(event) =>setContext([{crudType:"edit",
                                                                                        name:name,
                                                                                        category: category,
                                                                                        description: description,
                                                                                        thumbnail: thumbnailPreview, 
                                                                                        updateStatus: "updating"
                                                                                        }])}>Update</Button> 

                        </div> : null}    
                    { pageViewState[0].bodyComponent === "viewAdd" && localUpdateStatus === "default"?
                        <div>
                            <Button variant="secondary" onClick={(event) =>setContext([{crudType:"add",
                                                                                        name:name,
                                                                                        category: category,
                                                                                        description: description,
                                                                                        thumbnail: thumbnailPreview,
                                                                                        updateStatus: "updating"
                                                                                        }])}>Add New</Button> 
                        </div> : null } 



                    { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updating...</Alert></div>: null}
                    { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null }                                           
                </div>
                </div>          




      
        </Container>
        </div>
    </>
    )
}

  export default AccessoriesAddEdit




  /*


             // test for values being appended
             for (var key of smartStockBatchData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

       */