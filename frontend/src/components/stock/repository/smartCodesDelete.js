import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Container } from 'reactstrap';
import Moment from "moment";
import api from '../../../services/api';

const SmartCodesDelete = (props) => {

    
    // DATA SETUP
    // const
    const [smartCodeId, setSmartCodeId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [smartTechnology, setSmartTechnology] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    // general for page
    useEffect(() => {
        api.get(`/smartcodes/${props.smartCodeId}`)
        .then(res => {
            const smartCodeData = res.data
            setName(smartCodeData.name);
            setDate(Moment(smartCodeData.date).format('yyyy-MM-DD'))
            setSmartCodeId(props.smartCodeId);
            setStockQuantity(smartCodeData.stockQuantity);
            setSmartTechnology(smartCodeData.smartTechnology);
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
                                            <td>Name</td>
                                            <td colSpan='2'>
                                                {name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date of Arrival</td>
                                            <td colSpan='2'>
                                                {date}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Smart Technology</td>
                                            <td className="left width-100">
                                                {smartTechnology==="QR codes"?
                                                    <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image1-pending" alt="holding"/>:null}
                                                {smartTechnology==="RFID chips"?
                                                    <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image1-pending" alt="holding"/>:null}                                                
                                            </td>
                                            <td className="left">
                                                {smartTechnology}
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
                                        <Button className="danger-btn" onClick={(event) => props.updateFromChild({"smartCodeId":smartCodeId,"name":name, "date":date,"smartTechnology":smartTechnology,"stockQuantity":stockQuantity})}>Delete</Button>
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

  export default SmartCodesDelete



