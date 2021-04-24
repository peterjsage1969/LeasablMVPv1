import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Container } from 'reactstrap';
import Moment from "moment";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartCodesEdit = (props) => {

    // DATA COLLECTION
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
        // smart tech drop down
        const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);
        useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])
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
                                                <Input type="text" value={name} onChange={event => setName(event.target.value)}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date of Arrival</td>
                                            <td colSpan='2'>
                                                <Input type="date" value={date} onChange={event => setDate(event.target.value)}/>
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
                                                <Input type="select" name="select" value={smartTechnology} onChange={event => setSmartTechnology(event.target.value)}>
                                                    <option value=""></option>
                                                {smartTechnologyValues.map(smartTechnologies => (
                                                    <option key={smartTechnologies} value={smartTechnologies}>{smartTechnologies}</option>
                                                    ))}
                                                </Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td colSpan='2'>
                                                <Input type="number" value={stockQuantity} onChange={event => setStockQuantity(event.target.value)}/>
                                            </td>
                                        </tr>
                                        </tbody>
                                        </Table>
                                </Form>
                                <div className=" row card-modal-btns-base">
                                    { updateStatus === "default"?
                                    <div className="col-12 right">
                                        <Button>Close</Button>&nbsp;       
                                        <Button onClick={(event) => props.updateFromChild({"smartCodeId":smartCodeId,"name":name, "date":date,"smartTechnology":smartTechnology,"stockQuantity":stockQuantity})}>Update</Button>
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

  export default SmartCodesEdit



