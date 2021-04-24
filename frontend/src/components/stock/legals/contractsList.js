import React, { useState, useEffect } from "react";
import { Button, Container, Modal, ModalHeader, ModalBody} from 'reactstrap';
import api from '../../../services/api';
import { ContractsContext } from "./contractsContext";
import ContractAdd from "./contractAdd"


const ContractsList = (props) => {



// CONTEXT
    const { pageStateViewObj, 
        clickHistoryObj,
        contractDataObj,
        contractIdObj
        } = React.useContext(ContractsContext);
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [contractData, setContractData] = contractDataObj;
    const [contractId, setContractId] = contractIdObj;



// LOCALE
    const [contractList, setContractList] = useState([]);
    const [updateList, setUpdateList] = useState('');
    const [contractViewData, setContractViewData] = useState([]); 
    const [contractFilter, setContractFilter] = useState('All');
    const [contractType, setContractType] = useState('standard');
    const [popupStatus, setPopupStatus] = useState(false);
    const [modal, setModal] = useState(false);
    const toggle = (props) => {setModal(!modal);};



// PAGE DATA
    useEffect(() => { 
            const user_id = localStorage.getItem('user');   
            api.get(`/contracts`)
            .then(res => {
                setContractList(res.data);          
            })
            setContractFilter('All');
    }, [])     



// STATE UPDATE
    useEffect(() => {
        if (updateList === true) {
            setUpdateList(false);
            if (popupStatus === "addContract") {
                const newContractList = contractList.slice();
                newContractList.push(contractData);
                setContractList(newContractList);              
            }
        }
    }, [updateList])



// SUBMIT HANDLER
    function submitHandler(updateProps) {
        if(updateProps.popupStatus === "addContract" ) {
            setPopupStatus("addContract");
            toggle();
        }
        if(updateProps.popupStatus === "editContract" ) {
            setContractId (updateProps.contractId);
            const user_id = localStorage.getItem('user');
            api.get(`/contractbyid/${updateProps.contractId}`,{headers: {user_id}})
            .then(res => {
                setContractData(res.data);
            });
            setClickHistory(updateProps.clickHistory);
        }        
    } 
   

// UPDATE FROM CHILD
    function updateFromChild(props) {
        if (props.closeModal === true) { toggle(); }
        setUpdateList(props.updateList);
    }            


return (
    <>   
    {/* POPUP STATE */}
    {popupStatus != ""?
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true} >
            <ModalHeader toggle={toggle}>
                {popupStatus === "addContract"?`Add Contract`:null}
            </ModalHeader>
            <ModalBody>
                {popupStatus === "addContract"?<ContractAdd updateFromChild={updateFromChild}/>:null} 
            </ModalBody>
        </Modal>
    </div>:
    <div>
        <Modal isOpen={modal} toggle={toggle} centered={true}>
            <ModalHeader toggle={toggle}>
                Error
            </ModalHeader>
            <ModalBody>
                No Popup Status Selected.
            </ModalBody>
        </Modal>
    </div>
    }  
    <Container fluid>  
        <div className="row margin-bottom-60">
            <div className="col-9">                    
                <h4 className="margin-0 padding-0">Contract List</h4> 
            </div>                              
            <div className="col-3 right">
                        <Button variant="secondary" className="margin-right-10" onClick={(event) => submitHandler({contractId:'', 
                                                                                        title: '',
                                                                                        clickHistory: "add",
                                                                                        popupStatus: "addContract"                                                                          
                                                                                        })} size="sm">Add New</Button>                                                                                                
            </div>                                
        </div>                               
        <div className="row header-dk">
            <div className="col-5">Title</div> 
            <div className="col-3 left">Contract Type</div>
            <div className="col-2 left">Status</div>
            <div className="col-2"></div>
        </div>
        {contractList.map(contractItem => (
        <div key={contractItem._id} className= "row list-rows striped-list inline">
            <div className="col-5 left"><strong>{contractItem.title}</strong></div> 
            <div className="col-3 left">{contractItem.contractType}</div>
            <div className="col-2 left"></div>
            <div className="col-2 right padding-right-20">
                <Button variant="secondary" onClick={(event) => submitHandler({contractId:contractItem._id,
                                                                            clickHistory: "edit",
                                                                            popupStatus: "editContract", 
                                                                            title: contractItem.title                                                                                   
                                                                            })} size="sm">Details</Button>                                                                                                
            </div>
        </div>                                
        ))}                                                                                                               
     </Container>

    </>
    )
}

export default ContractsList;