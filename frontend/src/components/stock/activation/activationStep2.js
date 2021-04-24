import React, {useState, useEffect} from "react";
import { Button, Container } from 'reactstrap';
import Moment from 'moment';
import axios from "axios";

const ActivationsStepTwo = (props) => {



// FAILING GRACEFULLY - BACK TO MATCH
    // const
    const [gracefulHide, setGracefulHide] = useState('');
    const [gracefulShow, setGracefulShow] = useState('step-2-graceful-hide');
    // useEffect
    useEffect(() => {
        if(props.selectionData.blankStockId === '') {
            setGracefulHide('step-2-graceful-hide');
            setGracefulShow('');
        }
    }, [])  


// COLLECTING DATA
    // const
    const [blankStockData, setBlankStockData] = useState([]);
    const [smartCodeData, setSmartCodeData] = useState([]);
    // blank stock
    useEffect(() => {
            const user_id = localStorage.getItem('user');
            axios.get(`http://localhost:4000/blankstock/` + props.selectionData.blankStockId,{headers: {user_id}})
            //axios.get(`http://localhost:4000/blankstockbatches/` + blankStockMatch,{headers: {user_id}})
            .then(res => {
                const blankStockBatches = res.data
                setBlankStockData(blankStockBatches);
            });
    }, [])
    // smart code
    useEffect(() => {
            const user_id = localStorage.getItem('user');
            //axios.get(`http://localhost:4000/smartcodebatches/` + smartCodeMatch,{headers: {user_id}})
            axios.get(`http://localhost:4000/smartcodes/` + props.selectionData.smartCodeId,{headers: {user_id}})
            .then(res => {
                const smartCodeBatches = res.data
                setSmartCodeData(smartCodeBatches);
            });
    }, [])



// STOCK LEVELS
    const [noOfBlankStockUnits, setNoOfBlankStockUnits] = useState(0); 
    const [noOfSmartCodesUnits, setNoOfSmartCodesUnits] = useState();
    const [moreSmartCodes, setMoreSmartCodes] = useState('');
    const [leftOvers, setLeftOvers] = useState('');
    const [actuals, setActuals] = useState('');
    useEffect(() => {
        if(smartCodeData.stockQuantity > blankStockData.stockQuantity) {
            setMoreSmartCodes ('more');
            setActuals(blankStockData.stockQuantity)
            setLeftOvers(smartCodeData.stockQuantity - blankStockData.stockQuantity);
        } else if(smartCodeData.stockQuantity < blankStockData.stockQuantity) {
            setMoreSmartCodes ('less');
            setActuals(smartCodeData.stockQuantity);
            setLeftOvers(blankStockData.stockQuantity - smartCodeData.stockQuantity);
        }   else {
            setMoreSmartCodes ('equal');
        }
        setNoOfBlankStockUnits(blankStockData.stockQuantity);
        setNoOfSmartCodesUnits(smartCodeData.stockQuantity);
    }, [smartCodeData.stockQuantity, blankStockData.stockQuantity]) 


// BACK
    function setBackHandler() {
        props.onChange({"target":"stepOne"});
    } 


// SUBMIT
    function setSubmitHandler() {
        props.onChange({"target":"stepThree","noOfBlankStockUnits":noOfBlankStockUnits,"noOfSmartCodesUnits":noOfSmartCodesUnits});
    }    

    


return (
    <>
    <Container fluid>
    <div className="row page-body-top-Mtb60">
        <div className="col-1"></div>
        <div className="col-10"> 
            <div className="row main-top-header-and-button">
                <div className="col-6">  
                </div> 
                <div className="col-6 right padding-bottom-20">
                    <Button onClick={() => setBackHandler()}>Back</Button>&nbsp;                           
                    <Button className="activate-btn" onClick={() => setSubmitHandler()}>Attachments All Done</Button>
                </div>                                                                                                    
            </div>        
            <div className="row"> 
                {/* right */}
                <div className="col-6"> 
                    <div className={`row ${gracefulHide}`}>                       
                        <div className={`col-12 padding-bottom-20`}> 
                            <h5>Attach your {smartCodeData.smartTechnology} to your blank stock</h5>
                        </div>
                    </div>
                    <div className={`row alert-message-holder ${gracefulShow}`}>
                        <div className={`col-2 alert-message-symbol`}> 
                            <img src="http://localhost:4000/files/icons/warning-yellow.gif"  alt="has_object" className="warning-yellow-sm-0"/>
                        </div>
                        <div className={`col-10 alert-message-text`}> 
                            <h5>A time out or error has occured</h5>
                            <div>Please go back and match again.</div>
                        </div>                        
                    </div>                        
                    <div className={`row alert-message-holder ${gracefulHide}`}>
                        <div className={`col-2 alert-message-symbol`}> 
                            <img src="http://localhost:4000/files/icons/warning-yellow.gif"  alt="has_object" className="warning-yellow-sm"/>
                        </div>
                        <div className={`col-10 alert-message-text`}>
                            {moreSmartCodes === 'more'?
                            <div><strong>Please now attach {actuals} {smartCodeData.smartTechnology} to your blank stock</strong><br/>
                            The remainder ({leftOvers}) of your {smartCodeData.smartTechnology} will be returned to your repository after activation.</div>
                            : null}
                            {moreSmartCodes === 'equal'?
                            <div><strong>Please now attach your {smartCodeData.smartTechnology} to your blank stock</strong><br/>
                            Please note you do not have to attach all your codes at this time. Any leftover codes or stock will be returned to your repository after activation.</div>
                            : null}                            
                            {moreSmartCodes === 'less'?
                            <div><strong>Please now attach {actuals} {smartCodeData.smartTechnology} to your blank stock</strong><br/>
                            The remainder ({leftOvers}) of your {smartCodeData.smartTechnology} will be returned to your repository after activation.</div>
                            :null}
                        </div>
                    </div>   
                </div>
                {/* left */}
                <div className="col-1"></div>
                {/* left */}
                <div className="col-5"> 
                    <div className={`row ${gracefulHide}`}>                       
                        <div className="col-12 padding-bottom-20"> 
                            <h6>Your Selection</h6>
                        </div>
                    </div>
                    {/* smart codes */} 
                    <div className={`row card-row-object ${gracefulHide}`}>
                        <div className="col-12 inline">
                            <div className="stock-box">  
                                <div className="leasable-parent-pending">
                                    {smartCodeData.smartTechnology==="QR codes"?
                                        <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image1-pending" alt="holding"/>:null}
                                    {smartCodeData.smartTechnology==="RFID chips"?
                                        <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image1-pending" alt="holding"/>:null}
                                </div> 
                            </div> 
                            <div className="stock-box"><strong>Smart Codes:</strong><br/>
                                                    Date:<br/>
                                                    No of items:
                            </div>
                            <div className="stock-box">                                       
                                    {smartCodeData.smartTechnology}<br/>
                                    {Moment(smartCodeData.date).format('DD/MM/YY')}<br/>
                                    {smartCodeData.stockQuantity}                                                                                             
                            </div>
                        </div> 
                    </div>
                    {/* blank stock */}                                                                      
                    <div className={`row card-row-object ${gracefulHide}`}>
                        <div className="col-12 inline">
                            <div className="stock-box">
                                <img src={props.selectionData.associatedLeasableCategoryThumb}  alt="has_object" className="preLive-image1-pending"/>
                            </div>                                        
                            <div className="stock-box"><strong>Blank Stock:</strong><br/>
                                                    Date:<br/>
                                                    No of items:
                            </div>
                            <div className="stock-box">{props.selectionData.associatedLeasableCategoryName}<br/>
                                                    {Moment(blankStockData.date).format('DD/MM/YY')}<br/>
                                                    {blankStockData.stockQuantity}   
                            </div> 
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <div className="col-1"></div>
    </div>    
    </Container>
    </>
    )

}

export default ActivationsStepTwo



