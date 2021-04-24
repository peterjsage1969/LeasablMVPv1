import React, { useState, useEffect } from "react";
import { Button, Container } from 'reactstrap';
import api from '../../../services/api';
import { AccessoriesContext } from "../accessories/accessoriesContext";
import { CategoriesContext } from "./../products/categories/categoriesContext";

const AccessoriesList = (props) => {


// CONTEXT ACCESSORIES
    const {accessoriesListObj,
            showAccessoriesListObj,
            pageStateViewObj, 
            accessoryDataObj,
            clickHistoryObj,
            accessoryIdObj
            } = React.useContext(AccessoriesContext);
    const [accessoriesList, setAccessoriesList] = accessoriesListObj;
    const [showAccessoriesList, setShowAccessoriesList] = showAccessoriesListObj;
    const [pageViewState, setPageViewState] = pageStateViewObj;
    const [clickHistory, setClickHistory] = clickHistoryObj;
    const [accessoryId, setAccessoryId] = accessoryIdObj;
    const [accessoryData, setAccessoryData] = accessoryDataObj;
    // data collection
        const [localAccessoriesList, setLocalAccessoriesList] = useState([])
        useEffect(() => {
            setShowAccessoriesList("active");
        }, []) 
        useEffect(() => {
            if(accessoriesList != []) {setLocalAccessoriesList(accessoriesList);}
        }, [accessoriesList]) 
    


// CONTEXT ACESSORIES SET
    // go to pages
    function setContext(props) {
        setPageViewState([{bodyComponent:props[0].bodyComponent }]); 
        setAccessoryId([{accessoryId:props[0].accessoryId}]);
        setClickHistory([{clickTarget: props[0].clickTarget}])
        if(props[0].bodyComponent === "viewAdd") {setAccessoryData({})}
    }


// CONTEXT CATEGORIES
    const {categoryIdObj, 
        categoriesListObj,
        showCategoriesListObj,
        closeModalObj,
        categoryTypeObj
        } = React.useContext(CategoriesContext);
    const [categoryId, setCategoryId] = categoryIdObj;
    const [categoriesList, setCategoriesList] = categoriesListObj;
    const [showCategoriesList, setShowCategoriesList] = showCategoriesListObj;
    const [closeModal, setCloseModal] = closeModalObj;
    const [categoryType, setCategoryType] = categoryTypeObj;



// INITIAL VIEWSTATE
    const [productFilter, setProductFilter] = useState(''); 
    useEffect(() => {
        setProductFilter('All');
    }, [])         



// CATEGORY
        // filter
        const [accessoriesViewData, setAccessoriesViewData] = useState([]); 
        useEffect(() => {         
            // state array update
            if (productFilter !== 'All') {
                const accessoriesView = [];
                for (let i=0; i < localAccessoriesList.length; i++) {
                    if (localAccessoriesList[i].category === productFilter) {
                        accessoriesView.push(localAccessoriesList[i]);  
                    }
                }
                setAccessoriesViewData(accessoriesView);
            } else {
                setAccessoriesViewData(localAccessoriesList);
            }
        }, [productFilter,localAccessoriesList]) 
        // dropdown
        useEffect(() => {
            setCategoryType("products");
        }, [])  




        const [allCategoryData, setAllCategoryData] = useState([]);      
        useEffect(() => {
            api.get(`/categories`)
            .then(res => {
                setAllCategoryData(res.data)          
            });
        }, []) 



return (
    <>
    <Container fluid>  
        <div className="row  margin-0">
            <div className="col-12">                    
                <h4 className="contents-top-title">Accessories</h4>
                <div className="row margin-0">
                    <div className="col-6 padding-0">                      
                    </div>                                
                    <div className="col-6 right padding-0">
                           <Button variant="secondary" onClick={(event) => setContext([{accessoryId:null, 
                                                                                        bodyComponent: "viewAdd",
                                                                                        clickTarget: "add"                                                                           
                                                                                        }])} size="sm">Add New</Button>                                                                                                
                    </div>                                
                </div>                               
                <div className="row header-dk">
                    <div className="col-2"></div>
                    <div className="col-4">Name</div> 
                    <div className="col-4 center">Quantity</div>
                    <div className="col-2"></div>
                </div>
                {localAccessoriesList.map(accessoryItem => (
                    <div key={accessoryItem._id} className= "row list-rows striped-list inline height-150">
                        <div className="col-2 center"><img  className="preLive-image1-pending" src={accessoryItem.thumbnail_url} alt="uploaded" /></div>
                <div className="col-4 left"><strong>{accessoryItem.name}</strong><br/>
                                        {accessoryItem.description}</div> 
                        <div className="col-4 center">{accessoryItem.quantity}</div>
                        <div className="col-2 right  padding-0">
                           <Button variant="secondary" onClick={(event) => setContext([{accessoryId:accessoryItem._id, 
                                                                                        name:accessoryItem.name,
                                                                                        thumbnail_url: accessoryItem.thumbnail_url,
                                                                                        bodyComponent: "viewEdit",
                                                                                        clickTarget: "edit"                                                                                     
                                                                                        }])} size="sm">Details</Button>                                                                                                
                        </div>
                    </div>                                
                ))} 
            </div>
        </div>                                                                                                                 
     </Container>

    </>
    )
}

export default AccessoriesList;