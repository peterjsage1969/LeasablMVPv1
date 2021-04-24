import React, {useState, useEffect} from "react";
import { Table, Form, Container, Button, Alert } from 'reactstrap';
import api from "../../../services/api";
import { ProductsContext } from "./../../../components/stock/products/productsContext";


const ProductsDelete = (props) => {


// CONTEXT STORE
    const {pageStateViewObj,  
            //productCrudStatusObj, 
            productIdObj, 
            productDataObj, 
            productUpdateStatusObj,
            clickHistoryObj
            } = React.useContext(ProductsContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    //const [crudStatus, setCrudStatus] = productCrudStatusObj
    const [productId, setProductId] = productIdObj;
    const [productData, setProductData] = productDataObj;
    const [updateStatus, setUpdateStatus] = productUpdateStatusObj;
    const [clickHistory, setClickHistory] = clickHistoryObj; 



// CONTEXT GET
    // product data
    const [name, setName] = useState('');   
    useEffect(() => { 
        if(productData.name){setName(productData.name)};
    }, [productData]) 



// DELETE
function submitHandler(props) {
    const user_id = localStorage.getItem('user');
    api.delete(`/products/${productId}`)
    .then(res => {
        setUpdateStatus("complete");
        const interval = setInterval(() => {
            setUpdateStatus("close"); 
            clearInterval(interval);
        }, 2000 ); 
        const interval2 = setInterval(() => {
            setClickHistory('delete') 
            clearInterval(interval2);
        }, 2800 ); 
    })
}


// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
        if(updateStatus[0]) {
            setLocalUpdateStatus(updateStatus);
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
                            <Button variant="secondary" color="danger" onClick={(event) => submitHandler()} size="sm">Confirm and Delete</Button> 
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

  export default ProductsDelete