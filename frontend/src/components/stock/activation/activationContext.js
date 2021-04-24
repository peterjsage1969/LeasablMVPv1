import React, {useState, useEffect, createContext} from 'react';
import { useHistory } from 'react-router-dom';
import api from "../../../services/api";
export const ActivationContext = createContext();


export const ActivationProvider = (props) => {


// VIEW STATE
    const [pageViewState, setPageViewState] = useState([{bodyComponent: "viewList"}]);
    const [bodyComponent, setBodyComponent] = useState([]);
    useEffect(() => { 
        setBodyComponent(pageViewState[0].bodyComponent);
    }, [pageViewState])





// CLICK HISTORY
    const history = useHistory();
    const [clickHistory, setClickHistory] = useState([]);
    useEffect(() => { 
        if (clickHistory[0]) {
            if(clickHistory[0].clickTarget === "add" || clickHistory[0].clickTarget === "edit" ) {
                history.push('/stock/products/details')
            }
            if(clickHistory[0].clickTarget === "delete" ) {
                history.push('/stock/products/list')
            }            
        }
    }, [clickHistory])



// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState([]); 

    
    return (
        <ActivationContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        productBodyComponentObj:[bodyComponent, setBodyComponent],
                                        productUpdateStatusObj: [updateStatus, setUpdateStatus]
                                        }}>
            {props.children}
        </ActivationContext.Provider>
    )
}