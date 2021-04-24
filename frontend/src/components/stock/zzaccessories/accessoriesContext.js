import React, {useState, useEffect, createContext} from 'react';
import { useHistory } from 'react-router-dom';
import api from "../../../services/api";
export const AccessoriesContext = createContext();


export const AccessoriesProvider = (props) => {


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
                history.push('/stock/accessories/details')
            }
            if(clickHistory[0].clickTarget === "delete" ) {
                history.push('/stock/accessories/list')
            }            
        }
    }, [clickHistory])



// DATA MANAGEMENT   
    // view by id (for details) 
    const [accessoryId, setAccessoryId] = useState('');
    const [accessoryData, setAccessoryData] = useState('');     
    useEffect(() => {        
        console.log(pageViewState[0].bodyComponent)
        if ((pageViewState[0].bodyComponent === `viewEdit`) && accessoryId[0] !=[]) { 
            const user_id = localStorage.getItem('user');
            console.log("1010")
            api.get(`/accessories/${accessoryId[0].accessoryId}`,{headers: {user_id}})
            .then(res => {
                setAccessoryData(res.data);
                });
        }
    }, [accessoryId])
    // view all (for list)
    const [accessoriesList, setAccessoriesList] = useState([]);
    const [showAccessoriesList, setShowAccessoriesList] = useState('default');
    const [crudStatus, setCrudStatus] = useState([{crudType: null}]);
    const [accessoryUpdateData, setAccessoryUpdateData] = useState([]);
    useEffect(() => { 
      //  if (pageViewState[0].bodyComponent === `viewList`) {  
                api.get(`/accessories`)
                .then(res => {
                    setAccessoriesList(res.data) 
            }, []) 
     //   }
    }, [pageViewState, accessoryData])       
    // update by id
    useEffect(() => { 
        if (crudStatus[0].crudType === `edit`) {
            const user_id = localStorage.getItem('user');
            const accessoryUpdate = new FormData();  
            accessoryUpdate.append("name", accessoryUpdateData[0].name) 
            accessoryUpdate.append("category", accessoryUpdateData[0].category) 
            accessoryUpdate.append("description", accessoryUpdateData[0].description) 
            if (accessoryUpdateData[0].thumbnail){accessoryUpdate.append("thumbnail", accessoryUpdateData[0].thumbnail) }
                            api.post(`/accessories/update/${accessoryId[0].accessoryId}`,accessoryUpdate, {headers: {user_id}})
                            .then(res => {
                                setAccessoryData({
                                    name: res.data.name,
                                    category: res.data.category,
                                    description: res.data.description,
                                    thumbnail_url: res.data.thumbnail_url
                                })
                                setUpdateStatus([{updateStatus:"complete"}]);
                                const interval = setInterval(() => {
                                    setUpdateStatus([{updateStatus:"default"}]);    
                                    clearInterval(interval);
                                }, 2000 );                                
                            })
        }
    }, [crudStatus]) 
  






// UPDATE STATUS
    const [updateStatus, setUpdateStatus] = useState([]); 


    
    return (
        <AccessoriesContext.Provider value={{pageStateViewObj: [pageViewState, setPageViewState], 
                                        clickHistoryObj: [clickHistory, setClickHistory],
                                        accessoriesBodyComponentObj:[bodyComponent, setBodyComponent],
                                        accessoriesUpdateStatusObj: [updateStatus, setUpdateStatus],
                                        accessoriesListObj: [accessoriesList, setAccessoriesList],
                                        showAccessoriesListObj: [showAccessoriesList, setShowAccessoriesList],
                                        accessoryIdObj: [accessoryId, setAccessoryId],
                                        accessoryDataObj: [accessoryData, setAccessoryData],
                                        accessoryCrudStatusObj:[crudStatus, setCrudStatus],
                                        accessoryUpdateStatusObj:[updateStatus, setUpdateStatus],
                                        accessoryUpdateDataObj:[accessoryUpdateData, setAccessoryUpdateData]
                                        }}>
            {props.children}
        </AccessoriesContext.Provider>
    )
}
