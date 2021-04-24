import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Col, Row, Container } from 'reactstrap';
import axios from "axios";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const SmartStockBatchDetailsEdit = (props) => {

    //const [blankBatchIdEdit, setblankStockBatchIdEdit] = useState('');
    const [leasableCategoriesData, setLeasableCategoriesData] = useState([]);
    //const [associatedLeasableCategoryData,setAssociatedLeasableCategoryData] = useState('');

    const [nameEdit, setNameEdit] = useState('');
    const [dateEdit, setDateEdit] = useState('');
    const [associatedLeasableCategoryEdit, setAssociatedLeasableCategoryEdit] = useState('');
    const [thumbnail_url, setThumbnail_url]  = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [classNameAssociatedLeasableCategory, setClassNameAssociatedLeasableCategory] = useState('leasable-category');
    const [initialStockNumber, setInitialStockNumber] = useState('');

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
        const blankStockBatchData = new FormData();

        if (dateEdit) {blankStockBatchData.append("date", dateEdit)}
        if (associatedLeasableCategoryEdit) {blankStockBatchData.append("associatedLeasableCategory", associatedLeasableCategoryEdit)}
        if (initialStockNumber) {blankStockBatchData.append("initialStockNumber", initialStockNumber)}

        // NEW
            if (dateEdit === '' || associatedLeasableCategoryEdit === '' || initialStockNumber === '') {
                setSuccess(false);
                setMessage("You are missing fields.");
                const interval = setInterval(() => {setMessage(''); }, 4000);
                return () => clearInterval(interval);
            }
            else {
                try {
                    const response = await api.post(`/blankstock`,blankStockBatchData, {headers: {user_id}})
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
                        <tr>
                            <td>Date</td>
                            <td colSpan='2'>
                                <Input type="date" value={dateEdit} id="dateEdit"  onChange={event => setDateEdit(event.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td>Stock Items</td>
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

  export default SmartStockBatchDetailsEdit




  /*


             // test for values being appended
             for (var key of smartStockBatchData.entries()) {
                console.log(key[0] + ', ' + key[1]);
            }

       */