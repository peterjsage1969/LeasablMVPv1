import React, {useState, useEffect} from "react";
import { Button, Spinner, Input, Table, Container } from 'reactstrap';
import axios from "axios";

const ActivationsStepThree = (props) => {


// FAILING GRACEFULLY
    const [gracefulHide, setGracefulHide] = useState('');
    const [gracefulShow, setGracefulShow] = useState('step-2-graceful-hide');
    // view state
    useEffect(() => {
        if(props.selectionData.blankStockId === '') {
            setGracefulHide('step-2-graceful-hide');
            setGracefulShow('');
        }
    }, [])


// COLLECTING DATA
    const [blankStockData, setBlankStockData] = useState([]);
    const [smartCodeData, setSmartCodeData] = useState([]);
    // blank stock
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        axios.get(`http://localhost:4000/blankstock/` + props.selectionData.blankStockId,{headers: {user_id}})
        .then(res => {
            const blankStockBatches = res.data
            setBlankStockData(blankStockBatches);
        });
    }, [])
    // smart code
    useEffect(() => {
        const user_id = localStorage.getItem('user');
        // 
        axios.get(`http://localhost:4000/smartcodes/` + props.selectionData.smartCodeId,{headers: {user_id}})
        .then(res => {
            const smartCodeBatches = res.data
            setSmartCodeData(smartCodeBatches);
        });
    }, [])

    
// PAGE VIEW STATE
    const [cardOne, setCardOne] = useState('');
    const [cardTwo, setCardTwo] = useState('card-two-hide');
    function panelDisplay(props){
        if (props === "cardOne") {
            setCardOne('')
            setCardTwo('card-two-hide')
        } else if (props === "cardTwo") {
            setCardOne('card-one-hide')
            setCardTwo('')
        } 
    } 


// SHOW/HIDE MODULES
    const [scanModuleSwirl, setScanModuleSwirl] = useState('scan-module-swirl-hide');
    const [scanModuleResult, setScanModuleResult] = useState('scan-module-found-hide');     
    // scanner detection
    function ScannerDetectionShowHide(){
            setScanModuleSwirl('');
            setScanModuleResult('scan-module-found-hide');
        const interval = setInterval(() => {
            setScanModuleSwirl('scan-module-swirl-hide');
            setScanModuleResult('');
            setScannerId('X0Z-12D2');            
           clearInterval(interval); 
        }, 1000           
            );                   
    }       


// WARNING MESSAGE    
    // const
    const [alertCodesVersusStockMessage,setAlertCodesVersusStockMessage] = useState('');
    //useEffect
    useEffect(() => {
        var scanNumberOptionsArray = [];
        if(smartCodeData.stockQuantity>blankStockData.stockQuantity){
            setAlertCodesVersusStockMessage(`You have more smart codes (${smartCodeData.stockQuantity} units) than blank stock (${blankStockData.stockQuantity} units). You can only scan a maximum of ${blankStockData.stockQuantity} smart codes. The rest will be returned to stock. Please separate these codes before you start scanning.`);
        } else if(smartCodeData.stockQuantity<blankStockData.stockQuantity){
            setAlertCodesVersusStockMessage(`You have less smart codes (${smartCodeData.stockQuantity} units) than blank stock (${blankStockData.stockQuantity} units). The excess blank stock will be returned to the pre-live components area once matching has been activated.`);
        }
    }, [smartCodeData.stockQuantity,blankStockData.stockQuantity])


// SCANNING CODES SIMULATOR
    // const
    const [scanNumberOptions, setScanNumberOptions] = useState([]);
    const [scanNumberChoice, setScanNumberChoice] = useState('');
    const [smartCodesArray,setSmartCodesArray] = useState([]);
    const [numberOfScans, setNumberOfScans] = useState(0); 
    const [scannerId, setScannerId] = useState('');   
    // dropdown population
    useEffect(() => {
        var scanNumberOptionsArray = [];
        if(props.selectionData.noOfSmartCodesUnits>props.selectionData.noOfBlankStockUnits){
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfBlankStockUnits/8));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfBlankStockUnits/4));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfBlankStockUnits/2));
            scanNumberOptionsArray.push(props.selectionData.noOfBlankStockUnits);            
            setScanNumberOptions(scanNumberOptionsArray);
        } else if(props.selectionData.noOfSmartCodesUnits<props.selectionData.noOfBlankStockUnits){
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/8));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/4));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/2));
            scanNumberOptionsArray.push(props.selectionData.noOfSmartCodesUnits); 
            setScanNumberOptions(scanNumberOptionsArray); 
        } else if (props.selectionData.noOfSmartCodesUnits==props.selectionData.noOfBlankStockUnits){
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/8));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/4));
            scanNumberOptionsArray.push(Math.round(props.selectionData.noOfSmartCodesUnits/2));
            scanNumberOptionsArray.push(props.selectionData.noOfSmartCodesUnits);
            setScanNumberOptions(scanNumberOptionsArray);
        }
    }, [props.noOfSmartCodesUnits, props.noOfBlankStockUnits])
    // generating codes
    function CodeGenerator(){   
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var codesArray = [];
            for (let i = 0; i < scanNumberChoice; i++) {
                for (var j = 0; j < 15; j++)
                text += possible.charAt(Math.floor(Math.random() * possible.length)  
                )    
                codesArray.push({"codeNumber":text,"codeNumberId":i});
                text="";
                setSmartCodesArray(codesArray);
                setNumberOfScans(codesArray.length);
            }       
    }
    // clear scan
    function clearScan(){
        setSmartCodesArray([]);
        setNumberOfScans(0);
    } 
    
    
// DISABLED BTNS
    // consts
    const [nextBtnOne, setNextBtnOne] = useState(true); // panel 2 next btn
    const [dependencyOne, setDependencyOne] = useState(false); // detect scanner btn
    const [dependencyTwo, setDependencyTwo] = useState(false); // scan btn
    const [coDependencyOne, setCoDependencyOne] = useState(true); // panel 3 reset btn
    const [nextBtnTwo, setNextBtnTwo] = useState(true); // panel 3 next btn
    // useEffect - panel 2 and 3
    useEffect(() => {
        if (dependencyOne === true) {
            setNextBtnOne(false);
        }
    }, [dependencyOne]);
    // panel 2 - btn scanner detection
    function ScannerDetection() {           
            ScannerDetectionShowHide();
            setDependencyOne(true);
    }
    // panel 3 - btn scanner detection
    function ScanSimulator() { 
        CodeGenerator();
        setDependencyTwo(true);
        setNextBtnTwo(false);
        setCoDependencyOne(false);
    }
    //panel 3 - 
    function ClearScanSimulator() {
        clearScan();
        setDependencyTwo(false);
        setNextBtnTwo(true);
        setCoDependencyOne(true);
    }


// BACK
    function setBackHandler() {
        props.onChange({"target":"stepTwo"});
    } 


// SUBMIT
    function setSubmitHandler(smartCodeId, blankStockId) {
        props.onChange({"target":"stepFour","smartCodesArray": smartCodesArray});
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
                    <Button disabled={nextBtnTwo} className="activate-btn" onClick={() => setSubmitHandler(props.selectionData.blankStockId,props.selectionData.smartCodeId)}>Continue to Activation</Button>
                </div>                                                                                                    
            </div>              
            {/* left */}
            <div className=" row height-500">    
                <div className="col-5"> 
                    {/* card 1 - detectScannerModule */}                                   
                    <div className={`row ${cardOne}`}>
                        <div className="col-12"><h5>1 of 2 - Detect your Scanner</h5></div> 
                    </div> 
                    <div className={`row padding-bottom-20 ${cardOne}`}>
                        <div className="col-12">Please ensure you scanner is connected or your mobile App is in scan mode. Then click 'detect scanner' to confirm connection.</div>
                    </div>
                    <div className={`row inline ${cardOne}`}>
                        <div className={`col-3`}><Button disabled={dependencyOne} onClick={event => ScannerDetection()}>Detect</Button></div>
                        <div className={`col-6 ${scanModuleSwirl}`}>Checking for Scanner</div>
                        <div className={`col-3 ${scanModuleSwirl}`}><Spinner color="dark" /></div>
                        <div className={`col-9 ${scanModuleResult}`}>Scanner Found: {scannerId}</div>
                    </div>
                    {dependencyOne === true?                                     
                        <div className="row">
                            <div className={`col-12 card-btns-base right ${cardOne} ${scanModuleResult}`}> 
                                <Button className={`activate-btn`} disabled={nextBtnOne} onClick={(evt) => panelDisplay("cardTwo")}>Next</Button>
                            </div>
                        </div>
                    :null}
                    {/* card 2 - scanModule */}                                   
                    <div className={`row ${cardTwo}`}>
                        <div className="col-12 card-title"><h5>2 of 2 - Scan your Smart Codes</h5></div> 
                    </div> 
                    <div className={`row card-row-object ${cardTwo}`}>
                        <div className="col-12">Please begin your scanning. Your codes will appear as you scan in the window opposite.</div>
                    </div>  
                    <div className={`row card-row-object ${cardTwo}`}>
                        <div className="col-12">(Simulator Only)</div>
                    </div> 
                    <div className={`row card-row-object ${cardTwo}`}>
                        <div className="col-12 inline"> 
                            <Input type="select" className="step2-input-selector" name="select" onChange={event => setScanNumberChoice(event.target.value)}>
                                    <option value="NotSelected">Select Scan Quantity</option>
                                        {scanNumberOptions.map(scanNumberOption => (
                                    <option key={scanNumberOption} value={scanNumberOption}>{scanNumberOption}</option>
                                    ))}
                            </Input>&nbsp;
                            <Button className={`activate-btn`} disabled={dependencyTwo} onClick={(evt) => ScanSimulator()}>Scan Simulator</Button>&nbsp;
                            <Button disabled={coDependencyOne} onClick={(evt) => ClearScanSimulator()}>Clear</Button>
                        </div>
                    </div> 
                    <div className={`row card-row-object ${cardTwo}`}>
                        <div className="col-12"><strong>Scan Results</strong></div>
                    </div>
                    <div className={`row card-row-object ${cardTwo}`}>
                        <div className="col-12">You have currently scanned {numberOfScans} items.</div>
                    </div>                                         
                </div> 
                {/* spacer */}
                <div className="col-1"></div>
                {/* right */}  
                <div className="col-6"> 
                    <div className = "row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 card-title-bar">Code Scans</div>
                            </div>     
                            <div className="row scroller-container">
                                <div className="col-12 scroller-content-new border">
                                    <Table striped>
                                        <tbody>                                                         
                                            {(smartCodesArray)?smartCodesArray.map(smartCodes => (
                                                <tr key={smartCodes.codeNumberId} className="activation2-scrollable-codes">
                                                    <td>
                                                    {smartCodes.codeNumber}
                                                    </td>
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
        <div className="col-1" ></div>  
    </div> 
    </Container>
    </>
)

}

export default ActivationsStepThree






/* <div className={`row card-container-group ${stockModuleActive}`}> 

 

<div className={`row`}>                            
                                        <div className="col-12">
                                            {alertCodesVersusStockMessage != ''?<Alert className="in-page-alert-normal">{alertCodesVersusStockMessage}</Alert>:null}
                                        </div>
                                    </div>
                                    <div className={`row`}>
                                        <div className="col-12">
                                        <Button>Rematch</Button>&nbsp;
                                        <Button className="activate-btn" onClick={event => ScannerDetection()}>Continue</Button>
                                        </div>
                                    </div> 
                                    <div className="row">                       
                                        <div className="col-12">
                                            <h5>Smart Code Status</h5>
                                        </div> 
                                    </div>                     
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            {alertCodesVersusStockMessage != ''?alertCodesVersusStockMessage:null}
                                        </div>
                                    </div>
                                    {/* Detect Scanner - Active  
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <h5>Detect Scanner</h5>
                                        </div>
                                    </div>
                                    <div className={`row`}>                            


                                        <div className="col-4">
                                            <div className={scanModuleDetectButton}>
                                                <Button className="activate-btn" onClick={event => ScannerDetectionResults()}>Detect</Button>
                                            </div>
                                            <div className={scanModuleSwirl}>
                                            {/*  
                                            </div>
                                        </div>
                                    </div>
                                    {/* Detect Scanner - Result 
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <h5>Detect Scanner</h5>
                                        </div>
                                    </div>
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <Alert className="in-page-alert-normal"></Alert>
                                        </div>
                                    </div>
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <Button className="activate-btn" onClick={event => ScanProcess()}>Confirm and Start Scanning</Button>
                                        </div>
                                    </div>
                                    {/* Detect Scanner - Post
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <h5>Scanner Detected</h5>
                                        </div>
                                    </div>
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                        {scannerMessage} {scannerId}
                                        </div>
                                    </div>                        
                                    {/* Scanned Codes - Active
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <h5>Scanned Codes</h5>
                                        </div>
                                    </div>                        
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <Alert className="in-page-alert-normal">Please begin your scanning.</Alert>
                                        </div>
                                    </div> 
                                    {/* Scanned Codes - Results
                                    <div className={`row`}>                            
                                        <div className="col-12">
                                            <h5>Scanned Codes</h5>
                                        </div>
                                    </div>
                                   








*/