import React, {useState, createContext} from 'react';
export const StockQuantityContext = createContext();


export const StockQuantityDataProvider = (props) => {


// DATA MANAGEMENT
    const [stockId, setStockId] = useState([]);            
    const [stockData, setStockData] = useState([]);
    const [stockList, setStockList] = useState([]);
    const [stockType, setStockType] = useState('');
    const [stockTotal, setStockTotal] = useState('');


// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState(''); 

    
    return (
        <StockQuantityContext.Provider value={{ stockIdObj:[stockId, setStockId], 
                                        stockDataObj:[stockData, setStockData],
                                        stockListObj:[stockList, setStockList],
                                        stockTypeObj:[stockType, setStockType],
                                        stockTotalObj:[stockTotal, setStockTotal]
                                        }}>
            {props.children}
        </StockQuantityContext.Provider>
    )
}