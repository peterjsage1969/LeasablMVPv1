import React, {useState, useEffect} from "react";
import { Table, Form, Container, Button, Alert } from 'reactstrap';
import { ProductsContext } from "./../../../components/stock/products/productsContext";


const AccessoryDelete = (props) => {


// CONTEXT STORE
    const {pageStateViewObj, 
            productBodyComponentObj, 
            productCrudStatusObj, 
            productIdObj, 
            productDataObj, 
            productUpdateDataObj,
            productUpdateStatusObj,
            clickHistoryObj
            } = React.useContext(ProductsContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [bodyComponent, setBodyComponent] = productBodyComponentObj;
    const [crudStatus, setCrudStatus] = productCrudStatusObj
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;
    const [productUpdateData, setProductUpdateData] = productUpdateDataObj;
    const [updateStatus, setUpdateStatus] = productUpdateStatusObj;
    const [clickHistory, setClickHistory] = clickHistoryObj; 



// CONTEXT GET
    // product data
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');   
    const [description, setDescription] = useState('');
    const [smartTechnology, setSmartTechnology] = useState('');    
    const [thumbnail_url, setThumbnail_url] = useState(null);    
    useEffect(() => { 
        if(productData.name){setName(productData.name)};
        if(productData.category){setCategory(productData.category)};
        if(productData.description){setDescription(productData.description)};
        if(productData.thumbnail_url){setThumbnail_url(productData.thumbnail_url)};
    }, [productData]) 


// CONTEXT SET
    function setContext(props) {
        setCrudStatus([{crudType:props[0].crudType }]); 
        setPageViewState([{bodyComponent:props[0].bodyComponent }]); 
    }


// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
        if(updateStatus[0]) {
            setLocalUpdateStatus(updateStatus[0].updateStatus);
        }
    }, [updateStatus])



// POPUP CLOSE
const [modal, setModal] = useState(false);    
const toggle = () => setModal(!modal);        



    return (
    <>
       <div>
        <Container fluid>
            <div className="row">
                {/* card 1 */}
                <div className={`col-12 card-blank padding-top-10`}>  
                    <Form>
                        <Table>
                        <tbody>
                            <tr>
                                <td>Are you sure you want to delete this product?</td>
                            </tr>                                                                                              
                        </tbody>
                        </Table>
                    </Form>
                    <div className=" row card-modal-btns-base">
                        { localUpdateStatus === "default"?
                        <div className="col-12 right">      
                            <Button variant="secondary" color="danger" onClick={(event) => setContext([{crudType:"delete",
                                                                                            bodyComponent: "viewList"
                                                                                            }])} size="sm">Confirm and Delete</Button> 
                        </div>: null}
                        { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                        { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Product deleted</Alert></div>: null }
                    </div>                                
                </div>                                
            </div>
        </Container>
        </div>
    </>
    )
}

  export default AccessoryDelete