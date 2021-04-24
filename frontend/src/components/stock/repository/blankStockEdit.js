import React, {useState, useEffect} from "react";
import { Table, Button, Form, Input, Alert, Container } from 'reactstrap';
import Moment from "moment";
import api from '../../../services/api';
//import classnames from 'classnames';*/


const BlankStockEdit = (props) => {

    // DATA SETUP
    // const - main object
    const [blankStockId, setBlankStockId] = useState('');
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    // const - child object  
    const [leasableCategoryName, setLeasableCategoryName]  = useState('');
    const [associatedLeasableCategoryThumbnail_url, setAssociatedLeasableCategoryThumbnail_url]  = useState('');  
    const [leasableCategoriesData, setLeasableCategoriesData] = useState([]);    
    const [associatedLeasableCategoryId, setAssociatedLeasableCategoryId] = useState('');    
    useEffect(() => {
        // page data
        api.get(`/blankstock/${props.blankStockId}`)
        .then(res => {
            const blankStockData = res.data
            setName(blankStockData.name);
            setDate(Moment(blankStockData.date).format('yyyy-MM-DD'))
            setBlankStockId(props.blankStockId);
            setStockQuantity(blankStockData.stockQuantity);
            setAssociatedLeasableCategoryId(blankStockData.associatedLeasableCategory._id); 
            setLeasableCategoryName(blankStockData.associatedLeasableCategory.name);            
            setAssociatedLeasableCategoryThumbnail_url(blankStockData.associatedLeasableCategory.thumbnail_url);
        });
        }, []) 
        // all categories 4 dropdowns
        useEffect(() => {
            api.get(`/leasablecategories`)
            .then(res => {
                const leasableCategories = res.data
                setLeasableCategoriesData(leasableCategories)
            });
        }, []) 
        // category by id 4 inpage updates
        function collectLeasableItemById(leasableCategoryId) {
            const user_id = localStorage.getItem('user');
            api.get(`/leasablecategories/${leasableCategoryId}`,{headers: {user_id}})
            .then(res => {
                const leasableCategory= res.data
                //setAssociatedLeasableCategoryData(leasableCategory)
                setAssociatedLeasableCategoryId(leasableCategoryId);
                console.log("leasableCategoryId" + leasableCategoryId)
                setLeasableCategoryName(leasableCategory.name);
                setAssociatedLeasableCategoryThumbnail_url(leasableCategory.thumbnail_url);
            })
        }    


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
                                                <Input type="select" name="select" value={associatedLeasableCategoryId} onChange={event => collectLeasableItemById(event.target.value)}>
                                                    <option value=""></option>
                                                {leasableCategoriesData.map(leasableCategories => (
                                                    <option key={leasableCategories._id} value={leasableCategories._id}>{leasableCategories.name }</option>
                                                    ))}
                                                </Input>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Date of Arrival</td>
                                            <td colSpan='2'>
                                                <Input type="date" value={date} onChange={event => setDate(event.target.value)}/>
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
                                        <Button onClick={(event) => props.updateFromChild({"blankStockId":blankStockId,"name":name, "date":date,"stockQuantity":stockQuantity,"associatedLeasableCategory":associatedLeasableCategoryId})}>Update</Button>
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

  export default BlankStockEdit



