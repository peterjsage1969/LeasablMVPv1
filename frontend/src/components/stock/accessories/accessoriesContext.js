import React, {useState, createContext} from 'react';
export const AccessoriesContext = createContext();


export const AccessoriesDataProvider = (props) => {


// VIEW STATE
    const [pageViewState, setPageViewState] = useState('');
    const [clickHistory, setClickHistory] = useState('');
    const [productFilter, setProductFilter] = useState('All');


// DATA MANAGEMENT
    const [productId, setProductId] = useState([]); 
    const [productName, setProductName] = useState('');          
    const [productData, setProductData] = useState([]);
    const [productList, setProductList] = useState([]);
    const [showProductList, setShowProductList] = useState('default');
    const [productDetailsRequest, setProductDetailsRequest] = useState('');
    const [productUpdateData, setProductUpdateData] = useState([]);
    const [crudStatus, setCrudStatus] = useState([{crudType: null}]);


// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState(''); 

    
    return (
        <AccessoriesContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        productFilterObj:[productFilter, setProductFilter],
                                        productCrudStatusObj:[crudStatus, setCrudStatus],
                                        productIdObj:[productId, setProductId], 
                                        productNameObj:[productName, setProductName],
                                        productDataObj:[productData, setProductData],
                                        productUpdateDataObj:[productUpdateData, setProductUpdateData],
                                        productUpdateStatusObj: [updateStatus, setUpdateStatus],
                                        productListObj:[productList, setProductList],
                                        showProductListObj:[showProductList, setShowProductList],
                                        productDetailsRequestObj:[productDetailsRequest, setProductDetailsRequest]
                                        }}>
            {props.children}
        </AccessoriesContext.Provider>
    )
}