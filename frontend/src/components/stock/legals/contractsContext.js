import React, {useState, createContext} from 'react';
export const ContractsContext = createContext();


export const ContractsProvider = (props) => {


// VIEW STATE
    const [pageViewState, setPageViewState] = useState('');
    const [clickHistory, setClickHistory] = useState('');


// DATA MANAGEMENT
    const [contractId, setContractId] = useState([]);            
    const [contractData, setContractData] = useState([]);
    const [contractList, setContractList] = useState([]);
    const [showContractList, setShowContractList] = useState('default');
    const [contractDetailsRequest, setContractDetailsRequest] = useState('');
    const [contractUpdateData, setContractUpdateData] = useState([]);
    const [crudStatus, setCrudStatus] = useState([{crudType: null}]);


// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState(''); 

    
    return (
        <ContractsContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        contractCrudStatusObj:[crudStatus, setCrudStatus],
                                        contractIdObj:[contractId, setContractId], 
                                        contractDataObj:[contractData, setContractData],
                                        contractUpdateDataObj:[contractUpdateData, setContractUpdateData],
                                        contractUpdateStatusObj: [updateStatus, setUpdateStatus],
                                        contractListObj:[contractList, setContractList],
                                        showContractListObj:[showContractList, setShowContractList],
                                        contractDetailsRequestObj:[contractDetailsRequest, setContractDetailsRequest]
                                        }}>
            {props.children}
        </ContractsContext.Provider>
    )
}