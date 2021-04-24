import React, {useState, useEffect} from "react";
import { Table, Button, Form, Alert, Col, Row, Container } from 'reactstrap';
import Moment from "moment";
import axios from "axios";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartCodeBatchDetailsDelete = (props) => {

    const [smartCodeBatchIdEdit, setSmartCodeBatchIdEdit] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [initialSmartTechnology, setInitialSmartTechnology] = useState('');
    const [initialStockNumber, setInitialStockNumber] = useState('');

    // SMART STOCK DETAILS
    useEffect(() => {
        axios.get(`http://localhost:4000/smartcodebatches/${props.smartCodeBatch}`)
        .then(res => {
            const smartCodeData = res.data
            setNameEdit(smartCodeData.name);
            setDateEdit(Moment(smartCodeData.date).format('yyyy-MM-DD'))
            setSmartCodeBatchIdEdit(props.smartCodeBatch);
            setInitialStockNumber(smartCodeData.initialStockNumber);
            setInitialSmartTechnology(smartCodeData.initialSmartTechnology);
        });
    }, [props.smartCodeBatch])

    // FORM SUBMISSION
    const setSubmitHandler = async (evt) => {
        //const user_id = localStorage.getItem('user');

        const smartCodeBatchId = smartCodeBatchIdEdit;

        try {
            const response = await api.delete(`/smartcodebatches/${smartCodeBatchId}`)
            const {message} = response.data;
            setSuccess(true);
            setMessage(message);
            const interval = setInterval(() => {
                setMessage('');
            }, 4000);
            props.onChange("I am updated")
            return () => clearInterval(interval);
        } catch (error) {
            Promise.reject(error);
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
                            <td colSpan='2'>{nameEdit}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td colSpan='2'>{dateEdit}</td>
                        </tr>
                        <tr>
                            <td>Smart Technology</td>
                            <td colSpan='2'>{initialSmartTechnology}</td>
                        </tr>
                        <tr>
                            <td>Stock Number</td>
                            <td colSpan='2'>{initialStockNumber}</td>
                        </tr>
                        </tbody>
                    </Table>
                    <Container>
                        <Row>
                            <Col className="popup-footer-messages-left">
                                {(message !== "" && success === true)?<Alert color="success" className="alert-message">{message}</Alert>:""}
                                {(message !== "" && success === false)?<Alert color="danger" className="alert-message">{message}</Alert>:""}
                            </Col>
                            <Col  className="popup-footer-messages-right">
                                <Button onClick={(evt) => cancelPage()} >Cancel</Button>&nbsp;
                                <Button color="danger" onClick={(evt) => setSubmitHandler(false)}>Delete</Button>
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

  export default SmartCodeBatchDetailsDelete
