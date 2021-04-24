import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Container } from 'reactstrap';
import Moment from "moment";
import api from '../../../services/api';

const BlankStockDelete = (props) => {

    
    // DATA SETUP
    // const 
    const [blankStockId, setBlankStockId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    // const - child object  
    const [leasableCategoryName, setLeasableCategoryName]  = useState('');
    const [associatedLeasableCategoryThumbnail_url, setAssociatedLeasableCategoryThumbnail_url]  = useState('');     
    useEffect(() => {
        // general for page
        api.get(`/blankstock/${props.blankStockId}`)
        .then(res => {
            const blankStockData = res.data
            setName(blankStockData.name);
            setDate(Moment(blankStockData.date).format('yyyy-MM-DD'))
            setBlankStockId(props.blankStockId);
            setStockQuantity(blankStockData.stockQuantity);
            setLeasableCategoryName(blankStockData.associatedLeasableCategory.name);            
            setAssociatedLeasableCategoryThumbnail_url(blankStockData.associatedLeasableCategory.thumbnail_url);
        });
        }, [])     



       
  


    // CANCEL MODAL
    function cancelPage() {
        props.onChange("I am updated")
    }


    // LOADING STATUS
    const [updateStatus, setUpdateStatus] = useState('');     
    //updateStatus
    useEffect(() => { 
        setUpdateStatus(props.updateStatus);
    }, [props.updateStatus])


    return (
    <>
        <div>
        <Container fluid>
        <div className="row card-frame-outer">                                    
            <div className="col-12 card-frame-inner">
                <div className=" row"> 
                    {/* SMART CODES - card left */}
                    <div className="col-12 card-container">
                        <div className=" row">
                            <div className="col-12 card-blank padding-top-10">                                    
                                <Form>
                                    <Table>
                                    <tbody>
                                        <tr>
                                            <td>Stock Category</td>
                                            <td className="left width-100">
                                                {associatedLeasableCategoryThumbnail_url != ""?<img src={associatedLeasableCategoryThumbnail_url} className="preLive-image1-pending" alt='related'/>:null}                                                                                   
                                            </td>
                                            <td className="left">
                                                {leasableCategoryName != ""? leasableCategoryName:null}   
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date of Arrival</td>
                                            <td colSpan='2'>
                                                {date}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td colSpan='2'>
                                                {stockQuantity}
                                            </td>
                                        </tr>
                                        </tbody>
                                        </Table>
                                </Form>
                                <div className=" row card-modal-btns-base">
                                    { updateStatus === "default"?
                                    <div className="col-12 right">
                                        <Button>Close</Button>&nbsp;       
                                        <Button className="danger-btn" onClick={(event) => props.updateFromChild({"blankStockId":blankStockId,"name":name, "date":date,"stockQuantity":stockQuantity})}>Delete</Button>
                                    </div>: null}
                                    { updateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                                    { updateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null}
                                </div>
                            </div>                                
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
        </Container>
        </div>
    </>
    )
}

  export default BlankStockDelete



