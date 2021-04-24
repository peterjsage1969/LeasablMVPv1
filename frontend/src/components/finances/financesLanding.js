import React from "react";
import { Container, Button } from 'reactstrap';
import SideFinancesLanding from "../../navigation/submenuComponents/side_financesLanding";
import {Link} from "react-router-dom"

const financesLanding = () => {

 
    return (
        <>
        <Container fluid>  
            <div className="row page-body-container-no-title">
                <div className="col-1"></div>
                {/*
                <div className="col-3">
                     <SideFinancesLanding/> 
                </div>  */}
                {/* main content */}
                <div className="col-10">
                    <div className="row margin-bottom-40">
                        <div className="col-4">
                            {/* place holders */}
                            <div className="row card-frame-outer backgroundGuidesGreen">
                                <div className="col-12 card-frame-inner lt-grey-panel">
                                    <div className="row height-190 top margin-bottom-20">
                                        <div className="col-12">
                                            <div className="side-menu-title"><h3>Ledger</h3></div>
                                            <div>Page UI: List of 4 columns</div>
                                            <div>Page Content: liveStock._id, transaction_date, reader_Id, status</div>
                                            <div>Page Tech: list only from Ledger_Collection.</div>
                                            <div className="side-menu-links right bottom"><Button disabled >Page Req</Button></div>                                    
                                        </div>
                                    </div> 
                                </div>
                            </div>                      
                        </div>
                        {/* main content */}
                        <div className="col-4">
                            {/* place holders */} 
                            <div className="row card-frame-outer backgroundGuidesGreen">
                                <div className="col-12 card-frame-inner lt-grey-panel">
                                    <div className="row height-190 top margin-bottom-20">
                                        <div className="col-12">
                                            <div className="side-menu-title"><h3> Your Account</h3></div>
                                            <div>2 Formats: Commercial and Personal</div>
                                            <div className="side-menu-links right bottom"><Button disabled >Page Req</Button></div>                                    
                                        </div>
                                    </div> 
                                </div>
                            </div>                      
                        </div>
                    </div> 
                    <div className="row ">
                        <div className="col-4">
                            {/* place holders */}
                            <div className="row card-frame-outer backgroundGuidesGreen">
                                <div className="col-12 card-frame-inner lt-grey-panel">
                                    <div className="row height-190 top margin-bottom-20">
                                        <div className="col-12">
                                            <div className="side-menu-title"><h3>Banking Requests</h3></div>
                                            <div>Features: Requesting deposits back, signup fees </div>
                                            <div className="side-menu-links right bottom"><Button disabled >Page Req</Button></div>                                    
                                        </div>
                                    </div> 
                                </div>
                            </div>                      
                        </div>
                        {/* main content */}
                        <div className="col-6">
                            {/* place holders
                            <div className="row card-frame-outer backgroundGuidesGreen">
                                <div className="col-12 card-frame-inner lt-grey-panel">
                                    <div className="row height-230 top margin-bottom-20">
                                        <div className="col-12">
                                            <div className="side-menu-title"><h3>Account</h3></div>
                                            <div>2 Formats: Commercial and Personal</div>
                                            <div className="side-menu-links right bottom"><Button>To go here</Button></div>                                    
                                        </div>
                                    </div> 
                                </div>
                            </div>   */}                     
                        </div>
                    </div>                                                                                                     
                </div>
                <div className="col-1"></div>   
            </div>
        </Container>
        </> 
    )
}


export default financesLanding;            