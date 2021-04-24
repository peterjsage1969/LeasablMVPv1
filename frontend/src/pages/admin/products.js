import React, { useState, useEffect } from "react";
import { Link} from 'react-router-dom';
import { Container, Table, Button } from 'reactstrap';
import axios from "axios";
import NavbarPage from "../../navigation/navAdmin";
//import ProductDetail from "./productDetail"
//import {Layout} from "../../navigation";

const Products = () => {
    const [productData, setProductData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4000/products`)
        .then(res => {
            const products = res.data
            console.log(res.data)  
            setProductData(products)
        });
    }, [])

    return (
        <>
        <div>
            <NavbarPage />
        </div>
        <Container fluid>
        <div className="page-header">
            <div className="row">
                <div className="col">
                    <h2>Products</h2>
                </div>
                <div className="col add-new-btn">
                <Button variant="secondary">Add New</Button>
                </div>                
            </div>
        </div>
        <div className="page-body">
            <Table striped>
                <thead>
                    <tr className="suzo-admin-thead">
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productData.map(product => (
                    <tr key={product._id}>
                        <td className="thumbnail-image"><img src={product.imageProduct_url} alt="container"/></td>
                        <td>{product.name}</td>
                        <td>{product._id}</td>
                        <td></td>
                        <td>
                            <Link to={{
                            pathname: '/admin/products/' + product._id,
                                state: {productId: product}        
                        }} 
                        ><Button variant="secondary">Edit</Button></Link></td>
                    </tr>
                    ))} 
                </tbody>
            </Table>
        </div> 
        </Container>
        </>  
    )
}

export default Products;


/*


                         <td><Link to={{
                            pathname: '/admin/products/' + product._id,
                                state: {product: product}
                                
                        }} 
 










        <Layout>Products</Layout>

        <>
        <div>
        <Layout>Container Types</Layout>
        <Container>
            <Table striped>
                <thead>
                    <tr className="suzo-admin-thead">
                        <th></th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Colour</th>
                        <th>Lid</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {containerTypeData.map(containerType => (
                    <tr key={containerType._id}>
                        <td className="thumbnail-image"><img src={"../images/containerTypes/" + containerType.containerTypeImage} alt="container"/></td>
                        <td>{containerType.containerTypeName}</td>
                        <td>{containerType.containerTypeCategory}</td>
                        <td>{containerType.containerTypeColour}</td>
                        <td>{containerType.containerTypeLidType}</td>
                        <td><Link to={{
                            pathname: '/container/' + containerType._id,
                                state: {containerType: containerType}
                        }}><Button variant="secondary">Edit</Button></Link></td>
                    </tr>
                    ))} 
                </tbody>
            </Table> 
   </Container>
   </div>  
       </>   
*/


/*
<div>
<Layout>Products Page</Layout>
</div>
<MDBTable>
<MDBTableHead color="primary-color" textWhite>
<tr>
<th>#</th>
<th>Name</th>
<th>Size</th>
<th>Content</th>
</tr>
</MDBTableHead>
<MDBTableBody>
{productData.map(product => (
        <tr key={product._id}>
            <td>{product._id}</td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>£{product.price}</td>
        </tr>
    ))} 
</MDBTableBody>
</MDBTable> 
*/  