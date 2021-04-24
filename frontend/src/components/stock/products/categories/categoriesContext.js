import React, {useState, createContext} from 'react';
import { useHistory } from 'react-router-dom';
import api from "../../../../services/api";
export const CategoriesContext = createContext();


export const CategoriesProvider = (props) => {

    //const [crudStatus, setCrudStatus] = useState('');
    const [updateStatus, setUpdateStatus] = useState('default');
    const [pageViewState, setPageViewState] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryUpdateId, setCategoryUpdateId] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [subCategoryUpdateId, setSubCategoryUpdateId] = useState('');
    const [subCategoryUpdateData, setSubCategoryUpdateData] = useState({}); 
    const [closeModal, setCloseModal] = useState(false);  
    const [showCategoryList, setShowCategoryList] = useState('');
    const [subCategoriesList, setSubCategoriesList] = useState([]); 


    
    // in use
    const [categoryType, setCategoryType] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [categoryUpdateData, setCategoryUpdateData] = useState({}); 
    const [subCategoryData, setSubCategoryData] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]); 


    return (
        <CategoriesContext.Provider value={{pageStateViewObj:[pageViewState, setPageViewState],
                                            updateStatusObj: [updateStatus, setUpdateStatus],
                                            categoryIdObj: [categoryId, setCategoryId],
                                            categoryUpdateIdObj: [categoryUpdateId, setCategoryUpdateId],
                                            subCategoryIdObj: [subCategoryId, setSubCategoryId],
                                            subCategoryUpdateIdObj: [subCategoryUpdateId, setSubCategoryUpdateId],
                                            categoryDataObj:[categoryData, setCategoryData],
                                            subCategoryDataObj: [subCategoryData, setSubCategoryData],
                                            categoryUpdateDataObj: [categoryUpdateData, setCategoryUpdateData],
                                            subCategoryUpdateDataObj:[subCategoryUpdateData, setSubCategoryUpdateData], 
                                            categoriesListObj:[categoriesList, setCategoriesList],
                                            showCategoriesListObj:[showCategoryList, setShowCategoryList],
                                            closeModalObj:[closeModal, setCloseModal],
                                            categoryTypeObj: [categoryType, setCategoryType],
                                            subCategoriesListObj: [subCategoriesList, setSubCategoriesList]
                                            }}>
            {props.children}
        </CategoriesContext.Provider>
    )
}
