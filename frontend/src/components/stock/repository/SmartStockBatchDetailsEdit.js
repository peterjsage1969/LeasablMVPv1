import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Col, Row, Container } from 'reactstrap';
import Moment from "moment";
import axios from "axios";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartStockBatchDetailsEdit = (props) => {

    const [smartStockBatchIdEdit, setSmartStockBatchIdEdit] = useState('');
    const [leasableCategoriesData, setLeasableCategoriesData] = useState([]);
    //const [associatedLeasableCategoryData,setAssociatedLeasableCategoryData] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [associatedLeasableCategoryEdit, setAssociatedLeasableCategoryEdit] = useState('');
    const [thumbnail_url, setThumbnail_url]  = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [classNameAssociatedLeasableCategory, setClassNameAssociatedLeasableCategory] = useState('leasable-category');
    const [initialSmartTechnology, setInitialSmartTechnology] = useState('');
    const [initialStockNumber, setInitialStockNumber] = useState('');
    const [smartTechnologyValues, setSmartTechnologyValues] = useState([]);


    // SMART TECHNOLOGY
        useEffect(() => {setSmartTechnologyValues(["QR codes","RFID chips"])
    }, [])

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
            } else {setAssociatedLeasableCategoryEdit('');
            }
        });
    }, [props.smartStockBatch])

    // ALL LEASABLE CATEGORIES
    useEffect(() => {
        axios.get(`http://localhost:4000/leasablecategories`)
        .then(res => {
            const leasableCategories = res.data
            setLeasableCategoriesData(leasableCategories)
        });
    }, [])







    // GET LEASABLE CATEGORY BY ID
    function collectLeasableItemById(leasableCategoryId) {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/leasablecategories/${leasableCategoryId}`,{headers: {user_id}})
        .then(res => {
            const leasableCategory= res.data
            //setAssociatedLeasableCategoryData(leasableCategory)
            setAssociatedLeasableCategoryEdit(leasableCategory._id)
            setThumbnail_url(leasableCategory.thumbnail_url);
            setClassNameAssociatedLeasableCategory('leasable-category-show');
        })
    }

    // FORM SUBMISSION
    const setSubmitHandler = async (evt) => {

        const user_id = localStorage.getItem('user');
        const smartStockBatchData = new FormData();

        if(nameEdit) {smartStockBatchData.append("name", nameEdit)}
        if (dateEdit) {smartStockBatchData.append("date", dateEdit)}
        if (associatedLeasableCategoryEdit) {smartStockBatchData.append("associatedLeasableCategory", associatedLeasableCategoryEdit)}
        if (initialSmartTechnology) {smartStockBatchData.append("initialSmartTechnology", initialSmartTechnology)}
        if (initialStockNumber) {smartStockBatchData.append("initialStockNumber", initialStockNumber)}

        const smartStockBatchId = smartStockBatchIdEdit;

        try {
            const response = await api.post(`/smartstockbatches/update/${smartStockBatchId}`,smartStockBatchData, {headers: {user_id}})
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
                            <td colSpan='2'>
                                <Input type="text" value={nameEdit} onChange={event => setNameEdit(event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td colSpan='2'>
                                <Input type="date" value={dateEdit} onChange={event => setDateEdit(event.target.value)}/>
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
                        <tr>
                            <td>Associated Leasable Category</td>
                            <td colSpan='2'>
                                <Input type="select" name="select" value={associatedLeasableCategoryEdit} onChange={event => collectLeasableItemById(event.target.value)}>
                                    <option value=""></option>
                                {leasableCategoriesData.map(leasableCategories => (
                                    <option key={leasableCategories._id} value={leasableCategories._id}>{leasableCategories.name }</option>
                                    ))}
                                </Input>
                            </td>
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

  export default SmartStockBatchDetailsEdit
