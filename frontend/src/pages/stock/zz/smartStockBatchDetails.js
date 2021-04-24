import React from "react";
import { Container, Button } from 'reactstrap';
import NavbarPage from "../../navigation/navAdmin"
import { Link} from 'react-router-dom';
import SmartStockBatchDetailsEdit from "../../components/SmartStockBatchDetailsEdit";


const LeasableItemsDetail = () => {
  
    return (
        <>
        <div>
            <NavbarPage />
        </div>
        <Container fluid>
        <div className="page-header">
            <div className="row">
                <div className="col">
                    <h2>Leasables | Smart Stock | </h2>
                </div>
                <div className="col add-new-btn">
                <Link to="/leasable/pending"><Button>Back</Button></Link>
                </div>                
            </div>
        </div>   

        <SmartStockBatchDetailsEdit/>             

        </Container>           
       </>   
   )
}

export default LeasableItemsDetail;