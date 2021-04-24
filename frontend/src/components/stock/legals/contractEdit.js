import React, {useState, useEffect, useMemo} from "react";
import { Input, Container, Label, Alert, Button } from 'reactstrap';
import api from "../../../services/api";
import { ContractsContext } from "./contractsContext";
import ContractTypeBespoke from "./contractTypeBespoke";
import ContractTypeLeasablDiy from "./contractTypeLeasablDiy";

const ContractsEdit = (props) => {



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
    const [contractList, setSubCategoryList] = useState([]);
    const [title, setTitle] = useState('');
    const [contractType, setContractType] = useState('');
    const [contractDocument, setContractDocument] = useState('');
    const [updateStatus, setUpdateStatus] = useState('default');
    const [contractTypeValues, setContractTypeValues] = useState([]); 
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};



// PAGE DATA
    // populate
        useEffect(() => { 

            if(contractData.title && contractId != ''){setTitle(contractData.title)};
            if(contractData.contractType && contractId != ''){setContractType(contractData.contractType)};
            if(contractData.contractDocument && contractId != ''){setContractDocument(contractData.contractDocument)};
        }, [contractData]) 
    // contract type drop down   
        useEffect(() => {setContractTypeValues(["Leasabl DIY Contract","Bespoke Contract"])}, [])


// EDIT
    function submitHandler() {
            const user_id = localStorage.getItem('user');
            const contractUpdate = new FormData();  
            contractUpdate.append("title", title) 
            if(contractType){contractUpdate.append("contractType", contractType)};
            api.post(`/contracts`,contractUpdate, {headers: {user_id}})
            .then(res => {
                setContractData(res.data)
                setUpdateStatus("complete");
                const interval = setInterval(() => {
                    setUpdateStatus("default");    
                    clearInterval(interval);
                    props.updateFromChild({closeModal:true,updateList:true}) 
                }, 2000 );                               
            })
        }



// UPDATING
    const [localUpdateStatus, setLocalUpdateStatus] = useState('default');
    useEffect(() => {
        if(updateStatus) {
            setLocalUpdateStatus(updateStatus);
            if (updateStatus === "close") {
                toggle();
                setUpdateStatus("default");
                setPageViewState([{bodyComponent:"viewList"}])
            }
        }
    }, [updateStatus])




    return (
       <div> 
        <Container fluid>
            <div className="row margin-bottom-40 margin-top-20">
                <div className="col-12"><h4>Contract Overview</h4></div> 
            </div>                        
            <div className=" row margin-bottom-20">
                <div className="col-1"></div> 
                <div className="col-3"><Label value="name">Title</Label></div> 
                <div className="col-6"><Input type="text" value={title} onChange={event => setTitle(event.target.value)}/></div> 
                <div className="col-2"></div>
            </div>
            <div className="row margin-bottom-20">
                <div className="col-1"></div> 
                <div className="col-3"><Label value="name">Contract Type</Label></div> 
                <div className="col-6">
                    <Input type="select" value={contractType} onChange={event => setContractType(event.target.value)}>
                        <option key="blank" value=''></option>
                        {contractTypeValues.map(contractItemValue => (
                        <option key={contractItemValue} value={contractItemValue}>{contractItemValue}</option> 
                        ))} 
                    </Input>
                </div> 
                <div className="col-2"></div>
            </div>


            {contractType === "Leasabl DIY Contract"? 
                <div className="row margin-bottom-20">
                    <div className="col-12"><ContractTypeLeasablDiy/></div>
                </div>
            : null}

            {contractType === "Bespoke Contract"? 
                <div className="row margin-bottom-20">
                    <div className="col-12"><ContractTypeBespoke/></div>
                </div>
            : null}

            <div className = "row margin-bottom-20">
                <div className = "col-10 right">
                    { localUpdateStatus === "default"?
                    <div>
                        <Button onClick={() =>props.updateFromChild({closeModal:true,updateList:false})} size="sm">Close</Button>&nbsp;
                        <Button onClick={() => submitHandler({ updateStatus: "updating" })} variant="secondary" size="sm">Add</Button>
                    </div>
                    :null}
                    { localUpdateStatus === "updating"?<div className="col-12"><Alert color="warning" >Updaing...</Alert></div>: null}
                    { localUpdateStatus === "complete"?<div className="col-12"><Alert  color="success">Update Complete</Alert></div>: null}  
                </div>
                <div className="col-2"></div>
            </div>       
        </Container>
        </div>
    )
}

  export default ContractsEdit











    /* delete popup
    const [popupStatus, setPopupStatus] = useState('');
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};
    function popUpSetter(props) {
        if (props.popupStatus === 'delete') {
            setPopupStatus(props.popupStatus)
            toggle();
        }
    } */