import React, {useState, useEffect} from "react";
import { Table, Button, Form, Alert, Col, Row, Container } from 'reactstrap';
import Moment from "moment";
import axios from "axios";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartStockBatchDetailsDelete = (props) => {

    const [smartStockBatchIdEdit, setSmartStockBatchIdEdit] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [associatedLeasableCategoryEdit, setAssociatedLeasableCategoryEdit] = useState('');
    const [thumbnail_url, setThumbnail_url]  = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [classNameAssociatedLeasableCategory, setClassNameAssociatedLeasableCategory] = useState('leasable-category');
    const [initialSmartTechnology, setInitialSmartTechnology] = useState('');
    const [initialStockNumber, setInitialStockNumber] = useState('');

    // SMART STOCK DETAILS
    useEffect(() => {
        axios.get(`http://localhost:4000/smartstockbatches/${props.smartStockBatch}`)
        .then(res => {
            const smartStockData = res.data
            setNameEdit(smartStockData.name);
            setDateEdit(Moment(smartStockData.date).format('yyyy-MM-DD'))
            setSmartStockBatchIdEdit(props.smartStockBatch);
            setInitialStockNumber(smartStockData.initialStockNumber);
            setInitialSmartTechnology(smartStockData.initialSmartTechnology);

            if (smartStockData.associatedLeasableCategory) {
                setAssociatedLeasableCategoryEdit(smartStockData.associatedLeasableCategory._id);
                setThumbnail_url(smartStockData.associatedLeasableCategory.thumbnail_url);
                setClassNameAssociatedLeasableCategory('leasable-category-show');
            } else {setAssociatedLeasableCategoryEdit('');}
        });
    }, [props.smartStockBatch])

    // FORM SUBMISSION
    const setSubmitHandler = async (evt) => {

        //const user_id = localStorage.getItem('user');
        //const smartStockBatchData = new FormData();

        const smartStockBatchId = smartStockBatchIdEdit;

        try {
            const response = await api.delete(`/smartstockbatches/${smartStockBatchId}`)
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
                        <tr>
                            <td>Associated Leasable Category</td>
                            <td colSpan='2'>{associatedLeasableCategoryEdit}</td>
                        </tr>
                        <tr className = {classNameAssociatedLeasableCategory}>
                            <td  colSpan='3' className="mid-size-image">{(thumbnail_url)?<img src={thumbnail_url} alt='related'/>: ""}</td>
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

  export default SmartStockBatchDetailsDelete
