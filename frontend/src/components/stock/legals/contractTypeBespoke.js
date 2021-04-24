import React, {useState, useEffect, useMemo} from "react";
import { Input, Container, Label, Button } from 'reactstrap';
import { ContractsContext } from "./contractsContext";
import FileUploader from '../../../services/fileUploader'



const ContractTypeBespoke = () => {



// CONTEXT
const { pageStateViewObj, 
    clickHistoryObj,
    contractCrudStatusObj,
    contractIdObj,
    contractDataObj,
    contractUpdateDataObj,
    showContractListObj,
    contractDetailsRequestObj
    } = React.useContext(ContractsContext);
const [pageViewState, setPageViewState] = pageStateViewObj
const [clickHistory, setClickHistory] = clickHistoryObj
const [crudStatus, setCrudStatus] = contractCrudStatusObj
const [contractId, setContractId] = contractIdObj 
const [contractData, setContractData] = contractDataObj
const [contractUpdateData, setContractUpdateData] = contractUpdateDataObj
const [showContractList, setShowContractList] = showContractListObj;
const [contractDetailsRequest, setContractDetailsRequest] = contractDetailsRequestObj;



// LOCALE
    const [leaseDuration, setLeaseDuration] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [timeUnitValues, setTimeUnitValues] = useState([]);
    const [timeUnit, setTimeUnit] = useState('');
    const [lateReturnPenaltyValues, setLateReturnPenaltyValues] = useState([]);
    const [lateReturnPenalty, setLateReturnPenalty] = useState('');
    const [thumbnailPreview, setThumbnailPreview] =  useState(null);
    const [imageSwitch,setImageSwitch] = useState('default');    
    const [thumbnail_url, setThumbnail_url] = useState(null);

    

// PAGE DATA
    // contract type drop down   
    useEffect(() => {setTimeUnitValues(["Minutes","Hours","Days","Weeks"])}, [])
    // late returns drop down   
    useEffect(() => {setLateReturnPenaltyValues(["No penalty","Deposit Reduction","Extra Charge"])}, [])
    // thumbnail image
    const preview = useMemo(() => {
        return thumbnailPreview ? URL.createObjectURL(thumbnailPreview) : null;        
    },[thumbnailPreview])  
    const onFileSelect = (props) => {
        setThumbnailPreview(props);
        setImageSwitch('preview')      
    }



return (
    <>

    <Container fluid>     
        <div className="row margin-bottom-40 margin-top-20">
            <div className="col-12">
                <h5 className="margin-0 padding-0">Core Leasabl Details</h5>
            </div>                                                                                               
        </div>
        {/* lease duration */}
        <div className=" row margin-bottom-20">
            <div className="col-1"></div> 
            <div className="col-3"><Label value="name">Lease Duration: </Label></div> 
            <div className="col-2"><Input type="text" value="" onChange={event => setLeaseDuration(event.target.value)}/></div> 
            <div className="col-2">
                <Input type="select" value={timeUnit} onChange={event => setTimeUnit(event.target.value)}>
                    <option key="blank" value=''></option>
                    {timeUnitValues.map(timeUnitValue => (
                    <option key={timeUnitValue} value={timeUnitValue}>{timeUnitValue}</option> 
                    ))} 
                </Input>               
            </div>
            <div className="col-2"></div>
        </div> 
        {/* deposit amount */}
        <div className=" row margin-bottom-20">
            <div className="col-1"></div> 
            <div className="col-3"><Label value="name">Deposit Amount: </Label></div> 
            <div className="col-2"><Input type="number" value={depositAmount} onChange={event => setDepositAmount(event.target.value)}/></div> 
            <div className="col-2 padding-top-5"> UK £</div>
            <div className="col-2"></div>
        </div> 
        {/* late return */}
        <div className=" row margin-bottom-20">
            <div className="col-1"></div> 
            <div className="col-3"><Label value="name">Late Return Clause: </Label></div> 
            <div className="col-4">
                <Input type="select" value={lateReturnPenalty} onChange={event => setLateReturnPenalty(event.target.value)}>
                    <option key="blank" value=''></option>
                    {lateReturnPenaltyValues.map(lateReturnPenaltyValue => (
                    <option key={lateReturnPenaltyValue} value={lateReturnPenaltyValue}>{lateReturnPenaltyValue}</option> 
                    ))} 
                </Input>                  
                </div> 
            <div className="col-2"></div>
        </div> 
        <div className="row margin-bottom-20 margin-top-50">
            <div className="col-12">
                <h5 className="margin-0 padding-0">Bespoke Highlights</h5>
            </div>                                                                                               
        </div>
        <div className="row margin-bottom-40 margin-top-50">
            <div className="col-6">
                You currently have no clauses highlighted. These will ensure that you and your client have both agreed to these terms.
            </div>   
            <div className="col-6">
                <Button size="sm">Add highlight</Button>
            </div>                                                                                                         
        </div>        
        <div className="row margin-bottom-40 margin-top-50">
            <div className="col-12">
                <h5 className="margin-0 padding-0">Bespoke Contract Document</h5>
            </div>                                                                                               
        </div>    



        <div className="col-6 padding-0">
                    <div className="row margin-0">
                        <div className="col-12">                
                            <div className="height-230 margin-top-45 margin-bottom-20 center">
                                {imageSwitch === "preview"?
                                <img id="thumbnail" className="width-220 border" src={preview} alt="uploaded" /> 
                                : null}
                                {imageSwitch === "default" && pageViewState === "edit"?
                                <img className="width-220 border" src={thumbnail_url} alt="uploaded" /> 
                                : null} 
                            </div>
                        </div>
                    </div>
                    <div className="row margin-0">
                        <div className="col-12 padding-0 right">
                            {pageViewState === "edit" ?
                            <FileUploader onFileSelect = {onFileSelect} btnText = "Edit Image"/>:
                            <FileUploader onFileSelect = {onFileSelect} btnText = "Add Image"/>}
                        </div> 
                    </div>                        
                </div>



    </Container>

    </>
    )
}

export default ContractTypeBespoke;



