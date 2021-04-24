import React, {useState, useEffect } from "react";
import { Container, Fade } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';
import SideLegals from "../../../navigation/submenuComponents/side_legals";
import ContractsList from "../../../components/stock/legals/contractsList";
import ContractEdit from "../../../components/stock/legals/contractEdit"
import { ContractsContext } from "../../../components/stock/legals/contractsContext";



const LegalsHome = () => {


// HISTORY
const history = useHistory();


// LOCATION
const location = useLocation(); 


// CONTEXT
const { pageStateViewObj, 
    clickHistoryObj,
    contractCrudStatusObj,
    contractIdObj,
    contractDataObj,
    contractUpdateDataObj,
    contractUpdateStatusObj,
    showContractListObj,
    contractDetailsRequestObj
    } = React.useContext(ContractsContext);
const [pageViewState, setPageViewState] = pageStateViewObj
const [clickHistory, setClickHistory] = clickHistoryObj
const [crudStatus, setCrudStatus] = contractCrudStatusObj
const [contractId, setContractId] = contractIdObj
const [contractData, setContractData] = contractDataObj
const [contractUpdateData, setContractUpdateData] = contractUpdateDataObj
const [updateStatus, setUpdateStatus] = contractUpdateStatusObj;
const [showContractList, setShowContractList] = showContractListObj;
const [contractDetailsRequest, setContractDetailsRequest] = contractDetailsRequestObj;


// LOCALE
const [bodyContent,setBodyContent] = useState('contracts');
const [fadeInList, setFadeInList] = useState(true);
const [fadeInEdit, setFadeInEdit] = useState(true);



// CLICK HISTORY - USED
useEffect(() => { 
    console.log(clickHistory)
    if (clickHistory) {
        /* if(clickHistory === "add") {
            history.push('/stock/legals/contracts/add')
            setClickHistory('');
            setPageViewState('add');
        } */
        if(clickHistory === "edit" ) {
            history.push('/stock/legals/contracts/details')
            setClickHistory('');
            setPageViewState('edit');
        }            
        if(clickHistory === "list" ) {
            history.push('/stock/legals/contracts/list')
            setClickHistory('');

        }            
    }
}, [clickHistory])



    return (
        <>
        <Container fluid>
            <div className="row page-top-spacer-60">
                <div className="col-12"></div>
            </div>
            {/* main body */} 
            <div className="row">
                <div className="col-1"></div> 
                <div className="col-10">
                    <div className="row">
                        {/* side menu */} 
                        <div className="col-2 side-menu-holder"><SideLegals/></div>  
                        <div className="col-1"></div>
                        {/* content */} 
                        <div className="col-9 contents-holder">
                            <div className="col-12 contents-holder">
                                {location.pathname === "/stock/legals/contracts/details"?
                                <Fade in={fadeInEdit} className="mt-3">
                                    <ContractEdit/>                                  
                                </Fade>
                                : null}                            
                                {location.pathname === "/stock/legals/contracts/list"?
                                <Fade in={fadeInList} className="mt-3">
                                    <ContractsList/>
                                </Fade>
                                : null}
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


export default LegalsHome;            