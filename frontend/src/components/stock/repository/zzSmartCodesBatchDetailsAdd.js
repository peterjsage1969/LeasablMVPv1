import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Col, Row, Container } from 'reactstrap';
//import Moment from "moment";
//import axios from "axios";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartCodesBatchDetailsEdit = (props) => {

    const [smartCodesBatchIdEdit, setSmartCodesBatchIdEdit] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    //const [thumbnail_url, setThumbnail_url]  = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    //const [classNameAssociatedLeasableCategory, setClassNameAssociatedLeasableCategory] = useState('leasable-category');
    const [initialSmartTechnology, setInitialSmartTechnology] = useState('');
    const [initialStockNumber, setInitialStockNumber] = useState('');
    const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);

    // smart technology
        useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])
    }, [])

    // FORM SUBMISSION
    const setSubmitHandler = async (evt) => {

        const user_id = localStorage.getItem('user');
        const smartCodesBatchData = new FormData();

        if(nameEdit) {smartCodesBatchData.append("name", nameEdit)}
        if (dateEdit) {smartCodesBatchData.append("date", dateEdit)}
        if (initialSmartTechnology) {smartCodesBatchData.append("initialSmartTechnology", initialSmartTechnology)}
        if (initialStockNumber) {smartCodesBatchData.append("initialStockNumber", initialStockNumber)}

        // NEW
            if (nameEdit === '' || dateEdit === '' || initialSmartTechnology === '' || initialStockNumber === '') {
                setSuccess(false);
                setMessage("You are missing fields.");
                const interval = setInterval(() => {setMessage(''); }, 4000);
                return () => clearInterval(interval);
            }
            else {
                try {
                    const response = await api.post(`/smartcodebatches`,smartCodesBatchData, {headers: {user_id}})
                    const {message} = response.data;
                    setSuccess(true);
                    setMessage(message);
                    const interval = setInterval(() => {setMessage(''); }, 4000);
                    props.onChange("I am updated")
                    return () => clearInterval(interval);
                } catch (error) {
                    Promise.reject(error);
                }
            }
        }

        // CANCEL MODAL
        function cancelPage() {
            props.onChange("I am updated")
        }

    return (
    <>
        <div>
        <Container fluid>
            <Row>
                <Col>
                <Form>
                    <div className="details-content-box">
                    <Table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td colSpan='2'>
                                <Input type="text" value={nameEdit} id="nameEdit"  onChange={event => setNameEdit(event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td colSpan='2'>
                                <Input type="date" value={dateEdit} id="dateEdit"  onChange={event => setDateEdit(event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Smart Technology</td>
                            <td colSpan='2'>
                                <Input type="select" name="select" value={initialSmartTechnology} onChange={event => setInitialSmartTechnology(event.target.value)}>
                                    <option value=""></option>
                                {smartTechnologyValues.map(smartTechnologies => (
                                    <option key={smartTechnologies} value={smartTechnologies}>{smartTechnologies}</option>
                                    ))}
                                </Input>
                            </td>
                        </tr>
                        <tr>
                            <td>Stock Number</td>
                            <td colSpan='2'>
                                <Input type="number" value={initialStockNumber} onChange={event => setInitialStockNumber(event.target.value)}/>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Container>
                        <Row>
                            <Col className="popup-footer-messages-left">
                                {(message !== "" && success === true)?<Alert color="success">{message}</Alert>:""}
                                {(message !== "" && success === false)?<Alert color="danger">{message}</Alert>:""}
                            </Col>
                            <Col className="popup-footer-messages-right">
                                <Button onClick={(evt) => cancelPage()} >Cancel</Button>&nbsp;
                                <Button variant="secondary" onClick={(evt) => setSubmitHandler(false)}>Submit</Button>
                            </Col>
                        </Row>
                            </Container>
                    </div>
                </Form>
                </Col>
            </Row>
        </Container>
        </div>
    </>
    )
}

  export default SmartCodesBatchDetailsEdit