import React, { useState, useEffect } from "react";
import { Table, Button, Container} from 'reactstrap';
import axios from "axios";
import moment from 'moment';

const ActivationStepOne = (props) => { 


// PAGE STATE
    const [viewComponents, setViewComponents] = useState('');
    const [viewPreAssembled, setViewPreAssembled] = useState('');
    // stock type
    useEffect(() => {
        if(props.selectionData.selectedType === "Components" ){ 
            setViewComponents('');
            setViewPreAssembled('display-none');
        } else if (props.selectionData.selectedType === "Pre Assembled" ){ 
            setViewComponents('display-none');
            setViewPreAssembled('');
        }
    }, [props.selectionData.selectedType])


// COLLECTING DATA
    const [smartCodeBatchData, setSmartCodeBatchData] = useState([]);
    const [blankStockBatchData, setBlankStockBatchData] = useState([]);
    const [smartStockBatchData, setSmartStockBatchData] = useState([]);    
    // smartcodes
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/smartcodes`,{headers: {user_id}})
        .then(res => {
            const smartCodeBatches = res.data
            setSmartCodeBatchData(smartCodeBatches)
        });
    }, [])
    // blank stock
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/blankstock`,{headers: {user_id}})
        .then(res => {
            const blankStockBatches = res.data
            setBlankStockBatchData(blankStockBatches)
        });
    }, [])
    // pre assembled
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/smartstockbatches`,{headers: {user_id}})
        .then(res => {
            const smartStockBatches = res.data
            setSmartStockBatchData(smartStockBatches);
        });
    }, []);


// ROW SELECTION BTNS
    const [nextBtn, setNextBtn] = useState(true);
    const [dependencyOne, setDependencyOne] = useState(false);
    const [dependencyTwo, setDependencyTwo] = useState(false);
    const [smartCodeMatch, setSmartCodeMatch] = useState('');
    const [blankStockMatch, setBlankStockMatch] = useState('');
    const [associatedLeasableCategoryThumb, setAssociatedLeasableCategoryThumb] = useState('');
    const [associatedLeasableCategoryName, setAssociatedLeasableCategoryName] = useState('');
    // activate btn  
    useEffect(() => {
        if (dependencyOne === true && dependencyTwo === true) {
            setNextBtn(false);
        }
    }, [dependencyOne,dependencyTwo]);
    // btn match
    function matchUpdate (props) {
        if (props.dependency === "one") {
            if ( props.smartCodeBatchId === '') {
                setDependencyOne(false);
                setSmartCodeMatch();
            } else {
                setDependencyOne(true);
                setSmartCodeMatch(props.smartCodeBatchId)
            }
        } else if (props.dependency === "two") {
            setAssociatedLeasableCategoryThumb(props.associatedLeasableCategoryThumb); 
            setAssociatedLeasableCategoryName(props.associatedLeasableCategoryName);            
            if ( props.smartCodeBatchId === '') {
                setDependencyTwo(false);
                setBlankStockMatch();
            } else {
                setDependencyTwo(true);
                setBlankStockMatch(props.smartCodeBatchId);
            }
        }                   
    }


// TAB STATE
    // const
    const [activeTab, setActiveTab] = useState('1');
    // toggle
    const toggleTabs = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }


// SUBMIT
    function setSubmitHandler() {
        props.onChange({"target":"stepTwo","blankStockId":blankStockMatch, "smartCodeId":smartCodeMatch,"associatedLeasableCategoryThumb":associatedLeasableCategoryThumb,"associatedLeasableCategoryName":associatedLeasableCategoryName})
    }   



    return (
        <>
        <Container fluid>
        {/* COMPONENTS */}
        <div className={`row page-body-top-Mtb60 ${viewComponents}`}>
            <div className="col-1"></div>
            <div className="col-10">
                <div className="row main-top-header-and-button">
                    <div className="col-6">  
                    </div> 
                    <div className="col-6 right padding-bottom-20">
                    <Button className="activate-btn" disabled={nextBtn} onClick={() => setSubmitHandler({smartCodeId:smartCodeMatch,
                                                                                                            blankStockId:blankStockMatch,
                                                                                                            associatedLeasableCategory:associatedLeasableCategoryThumb,
                                                                                                            associatedLeasableCategoryName:associatedLeasableCategoryName})}>
                                                                                                            Confirm and Continue</Button>
                    </div>                                                                                                    
                </div>
                <div className="row">
                    {/* BLANK STOCK*/}
                    <div className="col-12 card-container-left"> 
                        <div className="row table-header-holder">
                            <div className="col-12 table-header-dk">
                                <h6>Blank Stock</h6>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 table-holder"> 
                                <Table striped className="border">                            
                                    <tbody>                                        
                                        { blankStockBatchData.map(blankStockBatch => (
                                            <tr key={blankStockBatch._id}>
                                                <td className={blankStockMatch === blankStockBatch._id ? "active-background width-100":"width-100"}>
                                                    <div className="leasable-parent-pending">
                                                    {(blankStockBatch.associatedLeasableCategory)?
                                                        <img src={blankStockBatch.associatedLeasableCategory.thumbnail_url}  alt="has_object" className="preLive-image1-pending"/>:null}
                                                    </div>
                                                </td>
                                                <td className={blankStockMatch === blankStockBatch._id ? "active-background":null }>
                                                    <strong>{(blankStockBatch.associatedLeasableCategory)?blankStockBatch.associatedLeasableCategory.name:null}</strong><br/>
                                                    {moment(blankStockBatch.date).format('DD/MM/YY')}
                                                </td>
                                                <td className ={blankStockMatch === blankStockBatch._id ? "active-background right":"right" }>{blankStockBatch.stockQuantity} units</td>
                                                <td className ={blankStockMatch === blankStockBatch._id ? "active-background right width-150":"right width-150" }>                                               
                                                    {blankStockMatch != blankStockBatch._id ?
                                                    <Button variant="secondary" className="match-btn" size="sm" onClick={() =>  matchUpdate({"dependency":"two",
                                                                                                                                                "smartCodeBatchId":blankStockBatch._id,
                                                                                                                                                "associatedLeasableCategoryThumb":blankStockBatch.associatedLeasableCategory.thumbnail_url,"associatedLeasableCategoryName":blankStockBatch.associatedLeasableCategory.name
                                                                                                                                            })} >Select</Button>
                                                                                                                                            :null
                                                    }
                                                </td>
                                            </tr>
                                        )) }                                                                        
                                    </tbody>                                    
                                </Table>
                            </div>
                        </div>
                    </div>
                  </div> 
                </div> 
            </div>
            <div className="row">
                <div className="col-12 card-btns-base right">
                    </div>                                                                    
            </div>
        </Container>
        </>
    )
}

export default ActivationStepOne;