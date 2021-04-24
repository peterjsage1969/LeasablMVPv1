import React, {useState, createContext} from 'react';
export const StockItemContext = createContext();


export const StockItemsDataProvider = (props) => {


// VIEW STATE
    const [pageViewState, setPageViewState] = useState('');
    const [clickHistory, setClickHistory] = useState('');
    const [productFilter, setProductFilter] = useState('All');


// DATA MANAGEMENT
    const [stockItemType, setStockItemType] = useState(''); 
    const [stockItemId, setStockItemId] = useState([]); 
    const [stockItemName, setStockItemName] = useState('');          
    const [stockItemData, setStockItemData] = useState([]);
    const [stockItemList, setStockItemList] = useState([]);
    const [showStockItemList, setShowStockItemList] = useState('default');
    const [stockItemDetailsRequest, setStockItemDetailsRequest] = useState('');
    const [stockItemUpdateData, setStockItemUpdateData] = useState([]);


// UPDATE STATUS
    const [crudStatus, setCrudStatus] = useState([{crudType: null}]);
    const [updateStatus, setUpdateStatus] = useState(''); 

    
    return (
        <StockItemContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        stockItemFilterObj:[productFilter, setProductFilter],
                                        stockItemCrudStatusObj:[crudStatus, setCrudStatus],
                                        stockItemUpdateStatusObj: [updateStatus, setUpdateStatus],
                                        stockItemIdObj:[stockItemId, setStockItemId], 
                                        stockItemNameObj:[stockItemName, setStockItemName],
                                        stockItemDataObj:[stockItemData, setStockItemData],                                        
                                        stockItemListObj:[stockItemList, setStockItemList],
                                        showStockItemListObj:[showStockItemList, setShowStockItemList],
                                        stockItemDetailsRequestObj:[stockItemDetailsRequest, setStockItemDetailsRequest],
                                        stockItemUpdateDataObj:[stockItemUpdateData, setStockItemUpdateData],
                                        stockItemTypeObj:[stockItemType, setStockItemType]
                                        }}>
            {props.children}
        </StockItemContext.Provider>
    )
}