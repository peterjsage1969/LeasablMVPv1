import React, {useState, useEffect} from "react";
import {  Table, Button, Container,Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from "axios";

const ActivationsStepFour = (props) => {

    // TBS
    const [blankStockData, setBlankStockData] = useState([]);
    const [blankStockId, setBlankStockId] = useState('');
    const [smartCodeId, setSmartCodeId] = useState([]);
    const [smartCodesArray,setSmartCodesArray] = useState([]);
    const [checkedStatus, setCheckedStatus] = useState('Nope');
    const [checkedStatusColour, setCheckedStatusColour] = useState('colour-text-normal-black');
    
 
    // COLLECTING DATA
    // const
    const [blankStockDataAssociatedLeasableCategory, setBlankStockDataAssociatedLeasableCategory] = useState('');
    const [smartCodeData, setSmartCodeData] = useState([]);
    // blank stock
    useEffect(() => {
        setBlankStockId(props.selectionData.blankStockId);
            const user_id = localStorage.getItem('user');
            axios.get(`http://localhost:4000/blankstock/` + props.selectionData.blankStockId,{headers: {user_id}})
            .then(res => {
                const blankStockBatches = res.data
                setBlankStockData(blankStockBatches);
                setBlankStockDataAssociatedLeasableCategory(blankStockBatches.associatedLeasableCategory);
            });
    }, [])
    // smart code
    useEffect(() => {
        setSmartCodeId(props.selectionData.smartCodeId);
            const user_id = localStorage.getItem('user');
            axios.get(`http://localhost:4000/smartcodes/` + props.selectionData.smartCodeId,{headers: {user_id}})
            .then(res => {
                const smartCodeBatches = res.data
                setSmartCodeData(smartCodeBatches);
            });
    }, [])
    // grabbing array data
    useEffect(() => {
        setSmartCodesArray(props.selectionData.smartCodesArray); 
    }, [])      




// ACTIVATION
    // const
    const [scanCheckProgressCount,setScanCheckProgressCount] = useState(0);
    const [activateStock, setActivateStock] = useState('');    
    const [verificationReport, setVerificationReport] = useState('verification-report-module-hide');
    const [activationStatus,setActivationStatus] = useState('');
    const [viewActivationComplete, setViewActivationComplete] = useState('display-none');
    // counting
    const activate = (props) => {
        if (props.action === "activating") {
            setActivateStock('display-none');
            setVerificationReport('');
            setActivationStatus("activating");
            let i=0
            const interval = setInterval(() => {
                if(i < smartCodesArray.length) {
                    setScanCheckProgressCount(i+1);
                i++;                
                } else {
                    setActivationStatus("complete");
                clearInterval(interval);
                }
            }, 50           
                ); 
        }
    }; 
    // completion
    useEffect(() => {
        if (activationStatus === "activating") {
            setCheckedStatus("In Progress");
        } else if (activationStatus === "complete") {
            setViewActivationComplete('');
            setCheckedStatus("Activated");
            setCheckedStatusColour('colour-text-success');
        } 
    }, [activationStatus])



    // BACK
    function setBackHandler() {
        props.onChange({"target":"stepThree"});
    } 

    


return (
    <>
    <Container fluid>
    <div className="row page-body-top-Mtb60">
        <div className="col-1"></div>
        <div className="col-10"> 
            <div className="row height-500">
                {/* left */}                       
                <div className="col-5">                                  
                    <div className={`row`}>
                        <div className="col-12 padding-bottom-10">                                         
                            <h5>Make live</h5>
                        </div> 
                    </div>
                    <div className={`row padding-bottom-40`}>
                        <div className="col-12">
                            You are now ready to make your stock live. Once activated your stock will appear in live stock
                        </div>
                    </div>                            
                    <div className={`row ${activateStock}`}>
                        <div className="col-12 right">
                            <Button onClick={() => setBackHandler()}>Back</Button>&nbsp;  
                            <Button className="activate-btn" onClick={(evt) => activate({"action":"activating"})}>Activate and Make Live</Button>                             
                        </div>                     
                    </div>                                    
                    <div className={`row ${verificationReport}`}>                       
                        <div className="col-12">
                            <h5>Activating...</h5>
                        </div> 
                    </div>  
                    <div className={`row padding-bottom-20 ${verificationReport}`}>                            
                        <div className="col-12">
                            {scanCheckProgressCount < smartCodesArray.length?`${scanCheckProgressCount} out of ${smartCodesArray.length} Smart items checked`: `Completed ${smartCodesArray.length} items verified`}
                        </div>
                    </div>                            
                    <div className={`row ${viewActivationComplete}`}>
                        <div className="col-12 right">
                            <Link to="/stock/liveStock"><Button className="suzoLive-btn">View Your Live Stock Now!</Button></Link>    
                        </div>
                    </div>
                </div>
                {/* spacer */}
                <div className="col-1"></div>
                {/* right */}
                <div className="col-6 card-container-right">
                    <div className = "row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 card-title-bar">Code Scans</div>
                            </div>     
                            <div className="row scroller-container">
                                <div className="col-12 scroller-content-new border">
                                    <Table striped>
                                    <tbody>
                                        {(smartCodesArray.length>0)?smartCodesArray.map(smartCodes => (
                                        <tr key={smartCodes.codeNumberId} className="activation2-scrollable-codes">
                                            <td>
                                                <div className="preLive-parent-pending">
                                                    {(blankStockDataAssociatedLeasableCategory)?
                                                    <img src={blankStockDataAssociatedLeasableCategory.thumbnail_url}  alt="has_object" className="preLive-image1-pending"/>:null}
                                                    {smartCodeData.smartTechnology==="QR codes"?
                                                    <img src="http://localhost:4000/files/icons/QrCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                    {smartCodeData.smartTechnology==="RFID chips"?
                                                    <img src="http://localhost:4000/files/icons/RfidCode.gif" className="preLive-image2-pending" alt="holding"/>:null}
                                                </div>                                               
                                            </td>
                                            <td>{blankStockDataAssociatedLeasableCategory.name}</td>
                                            <td>{smartCodes.codeNumber}</td>
                                            {activationStatus === "activating" && scanCheckProgressCount < smartCodesArray.length?
                                                <td><Spinner color="dark" /></td>
                                                :
                                                <td className={checkedStatusColour}>{checkedStatus}</td>}                                                           
                                        </tr>
                                        )):null}
                                    </tbody>                            
                                </Table>
                                </div>
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

export default ActivationsStepFour



