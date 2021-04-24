import React, {useState} from "react";
import { Container } from "reactstrap";

const ActivationStepper = ({match}) => {


    const [stepTitle, setStepTitle] = useState('Welcome To Activation'); 
    const [stepOneSetUp, setStepOneSetUp] = useState('col-sm-3 setUp');
    const [stepTwoSetUp, setStepTwoSetUp] = useState('col-sm-3');
    const [stepThreeSetUp, setStepThreeSetUp] = useState('col-sm-3'); 
    const [stepFourSetUp, setStepFourSetUp] = useState('col-sm-3');






    return (
        <Container fluid> 
        <div className="row page-body-container-no-title">
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
        </Container>
    )

}

export default ActivationStepper;
