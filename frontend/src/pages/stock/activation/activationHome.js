import React, { useState, useEffect} from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container, Fade } from 'reactstrap';
import NavbarPage from "../../../navigation/navAdmin";
import TopStockHome from "../../../navigation/submenuComponents/topMenu_stock";
import ActivationStepOne from "../../../components/stock/activation/activationStep1";
import ActivationStepTwo from "../../../components/stock/activation/activationStep2";
import ActivationStepThree from "../../../components/stock/activation/activationStep3";
import ActivationStepFour from "../../../components/stock/activation/activationStep4";
import {Link} from "react-router-dom";
import {ProductDataProvider} from "../../../components/stock/products/productsContext";
import ActivationStepper from "./../../../components/stock/activation/activationStepper";
import ActivationOneSelectProduct from "../../../components/stock/activation/activationOneSelectProduct"
import ActivationOneSelectSmartTags from "../../../components/stock/activation/activationOneSelectSmartTag"


const ActivationHome = ({match}) => {
    

// HISTORY
    const history = useHistory();


// LOCATION
    const location = useLocation();    


// PAGE FADES
    const [fadeInList, setFadeInList] = useState(true);
    const [fadeInEdit, setFadeInEdit] = useState(true);    


    return (
        <>
        <Container fluid>
            <div className=" row padding-0 margin-0">
                <div className="col-1"></div>
                <div className="col-5">
                    <div>
                        <h4>Smart Tagging | Welcome</h4>
                    </div>               
                </div>
                <div className="col-5">
                    <ActivationStepper/>               
                </div> 
                <div className="col-1"></div>       
            </div>             
            <div className="row">
            <div className="col-1"></div>  
                <div className="col-10">
                    <div className="row">
                        <div className="col-12 contents-holder">
                            {location.pathname === "/stock/activation/step1a" ?
                                <Fade in={fadeInEdit} className="mt-3">
                                    <ProductDataProvider> 
                                        <ActivationOneSelectProduct/>  
                                    </ProductDataProvider>                                
                                </Fade>
                            : null}
                            {location.pathname === "/stock/activation/step1b" ?
                                <Fade in={fadeInEdit} className="mt-3">
                                    <ProductDataProvider> 
                                        <ActivationOneSelectSmartTags/>
                                    </ProductDataProvider>                                
                                </Fade>
                            : null}                            
                        </div>
                    </div>                
                </div>
                <div className="col-1"></div>
            </div>
        </Container>
        </> 





/* URL STATE UPDATES
    const [stepTitle, setStepTitle] = useState('Welcome To Activation'); 
    const [stepOneSetUp, setStepOneSetUp] = useState('col-sm-3 setUp');
    const [stepTwoSetUp, setStepTwoSetUp] = useState('col-sm-3');
    const [stepThreeSetUp, setStepThreeSetUp] = useState('col-sm-3'); 
    const [stepFourSetUp, setStepFourSetUp] = useState('col-sm-3');
    setStepOneSetUp('');
    setStepTwoSetUp('');
    setStepThreeSetUp('');
    setStepFourSetUp('');
    setStepTitle('');     
    progress bar, page title
    useEffect(() => {
        if(match.params.step === "welcome") {           
        
        } else if(match.params.step === "stepOne") {            
            setStepOneSetUp('setUp');
            setStepTwoSetUp('');
            setStepThreeSetUp('');
            setStepFourSetUp('');
            setStepTitle('Step 1 - Select Stock'); 
            setComponentState("stepOne");          
        } else if(match.params.step === "stepTwo") {
            setStepOneSetUp('done');
            setStepTwoSetUp('setUp');
            setStepThreeSetUp('');
            setStepFourSetUp('');
            setStepTitle('Step 2 - Tagging Your Items'); 
            setComponentState("stepTwo");                     
        }  else if(match.params.step === "stepThree") {
            setStepOneSetUp('done');
            setStepTwoSetUp('done');
            setStepThreeSetUp('setUp');
            setStepFourSetUp('');
            setStepTitle('Step 3 - Regsitering into the System'); 
            setComponentState("stepThree");
        }  else if(match.params.step === "stepFour") {
            setStepOneSetUp('done');
            setStepTwoSetUp('done');
            setStepThreeSetUp('done');
            setStepFourSetUp('setUp');
            setStepTitle('Activate and Make Live');
            setComponentState("stepFour");
        }
    }, [match.params.step]) */


/* TO CHILD UPDATES
    const [smartCodesArray, setSmartCodesArray] = useState([]);  
    const [blankStockId, setBlankStockId] = useState('');
    const [smartCodeId, setSmartCodeId] = useState('');     
    const [associatedLeasableCategoryThumb, setAssociatedLeasableCategoryThumb] = useState('');
    const [associatedLeasableCategoryName, setAssociatedLeasableCategoryName] = useState(''); */


/* FROM CHILD UPDATES
    const [stateUpdateFromChild, setStateUpdateFromChild] = useState('');
    const [selectedType, setSelectedType] = useState('');  
    const [noOfBlankStockUnits, setNoOfBlankStockUnits] = useState(0); 
    const [noOfSmartCodesUnits, setNoOfSmartCodesUnits] = useState();     
    // url history and data
    useEffect(() => {
        if(stateUpdateFromChild.target === "stepOne") {
            history.push("/stock/activation/stepOne");   
            setSelectedType(stateUpdateFromChild.selectedType); 
         } else if(stateUpdateFromChild.target === "stepTwo") {
            history.push("/stock/activation/stepTwo"); 
            setBlankStockId(stateUpdateFromChild.blankStockId);
            setSmartCodeId(stateUpdateFromChild.smartCodeId); 
            setAssociatedLeasableCategoryThumb(stateUpdateFromChild.associatedLeasableCategoryThumb);
            setAssociatedLeasableCategoryName(stateUpdateFromChild.associatedLeasableCategoryName); 
         }  else if(stateUpdateFromChild.target === "stepThree") {
            history.push("/stock/activation/stepThree");           
            setSmartCodesArray(stateUpdateFromChild.smartCodesArray);
            setNoOfBlankStockUnits(stateUpdateFromChild.noOfBlankStockUnits);
            setNoOfSmartCodesUnits(stateUpdateFromChild.noOfSmartCodesUnits);
         }  else if(stateUpdateFromChild.target === "stepFour") {
            history.push("/stock/activation/stepFour");
            setSmartCodesArray(stateUpdateFromChild.smartCodesArray);
         };  
    }, [stateUpdateFromChild])*/























        /* NAV BAR
        <Container fluid> 
            <div className="row page-body-container-no-title">
                <div className="col-1"></div>
                <div className="col-10">
                    <div className="row">
                    <div className="col-8 padding-top-10"><h4>{stepTitle}</h4></div>   
                    <div className="col-4 padding-right-30">
                         match.params.step === 'stock'? <Button onClick={(evt) => setComponentState('stepZero')}>Activate Stock »</Button>:
                            <div className="row">
                                <div className="col-12">
                                    <div className="row center">
                                        <div className={`col-sm-3 border-grey-top ${stepOneSetUp}`}>Select</div>
                                        <div className={`col-sm-3 border-grey-top ${stepTwoSetUp}`}>Tag</div>
                                        <div className={`col-sm-3 border-grey-top ${stepThreeSetUp}`}>Regsiter</div>
                                        <div className={`col-sm-3 border-grey-top ${stepFourSetUp}`}>Activate</div>
                                    </div>
                                    <div className="row center">
                                        <div className={`col-sm-3 border-grey-bottom ${stepOneSetUp}`}>1</div>
                                        <div className={`col-sm-3 border-grey-bottom ${stepTwoSetUp}`}>2</div>
                                        <div className={`col-sm-3 border-grey-bottom ${stepThreeSetUp}`}>3</div>
                                        <div className={`col-sm-3 border-grey-bottom ${stepFourSetUp}`}>4</div>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                </div>                           
            </div>
            
            <ActivationWelcome onChange={value => {setStateUpdateFromChild(value)}}/>

            {  step components}
                { match.params.step === 'welcome'?
                    <ActivationWelcome onChange={value => {setStateUpdateFromChild(value)}}/>:null
                }                               
                { match.params.step === 'stepOne'?
                    <ActivationStepOne selectionData={{"blankStockId":blankStockId,"smartCodeId":smartCodeId,"selectedType":selectedType}} 
                    onChange={value => {setStateUpdateFromChild(value)}}/>:null
                }
                { match.params.step === 'stepTwo'?
                    <ActivationStepTwo selectionData={{"blankStockId":blankStockId,"smartCodeId":smartCodeId,"associatedLeasableCategoryThumb":associatedLeasableCategoryThumb,"associatedLeasableCategoryName":associatedLeasableCategoryName}} 
                    onChange={value => {setStateUpdateFromChild(value)}}/>:null
                } 
                { match.params.step === 'stepThree'?
                    <ActivationStepThree selectionData={{"blankStockId":blankStockId,
                                                            "smartCodeId":smartCodeId, 
                                                            "smartCodesArray":smartCodesArray,
                                                            "associatedLeasableCategoryThumb":associatedLeasableCategoryThumb,
                                                            "associatedLeasableCategoryName":associatedLeasableCategoryName,
                                                            "noOfBlankStockUnits":noOfBlankStockUnits,
                                                            "noOfSmartCodesUnits":noOfSmartCodesUnits
                                                        }} 
                    onChange={value => {setStateUpdateFromChild(value)}}/>:null
                } 
                { match.params.step === 'stepFour'?
                    <ActivationStepFour selectionData={{"blankStockId":blankStockId,"smartCodeId":smartCodeId, "smartCodesArray":smartCodesArray}} 
                    onChange={value => {setStateUpdateFromChild(value)}}/>:null
                }              
        </Container>
        </> */ 
    )
}

export default ActivationHome;