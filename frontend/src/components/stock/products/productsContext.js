import React, {useState, createContext} from 'react';
export const ProductsContext = createContext();


export const ProductDataProvider = (props) => {


// VIEW STATE
    const [pageViewState, setPageViewState] = useState('');
    const [clickHistory, setClickHistory] = useState('');


// DATA MANAGEMENT
    const [productId, setProductId] = useState([]);            
    const [productData, setProductData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [showProductList, setShowProductList] = useState('default');
    const [productDetailsRequest, setProductDetailsRequest] = useState('');
    const [productUpdateData, setProductUpdateData] = useState([]);
    const [crudStatus, setCrudStatus] = useState([{crudType: null}]);


// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState(''); 

    
    return (
        <ProductsContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        //productBodyComponentObj:[bodyComponent, setBodyComponent],
                                        productCrudStatusObj:[crudStatus, setCrudStatus],
                                        productIdObj:[productId, setProductId], 
                                        productDataObj:[productData, setProductData],
                                        productUpdateDataObj:[productUpdateData, setProductUpdateData],
                                        productUpdateStatusObj: [updateStatus, setUpdateStatus],
                                        productListObj:[productList, setProductList],
                                        showProductListObj:[showProductList, setShowProductList],
                                        productDetailsRequestObj:[productDetailsRequest, setProductDetailsRequest]
                                        }}>
            {props.children}
        </ProductsContext.Provider>
    )
}