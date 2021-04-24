import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login/login';
import Register from './pages/login/register';
import ForgottonPassword from '././pages/login/forgottonPassword'
import AdminHome from './pages/admin/home';
// files
import CategoriesHome from './pages/stock/products/cateroriesHome';
import RepositoryHome from './pages/stock/repository/repositoryHome';
import LiveStockHome from './pages/stock/liveStock/liveStockHome';
import ActivationHome from "./pages/stock/activation/activationHome";
import ContactsHome from "./pages/contacts/contactsHome";
import FinancesHome from "./pages/finances/financeHome"
import ProductsHome from "./pages/stock/products/productsHome"
import StockHome from "./pages/stock/stockHome"

export default function Routes() {



    return (
        <Switch>  
            {/* nb nav set in 3 other areas - pageHomes, main nav plus top area Nav*/}  
            <Route path="/stock/" component={StockHome}/> 
            <Route path="/stock/liveStock" exact component={LiveStockHome}/>      
            <Route path="/stock/repository" exact component={RepositoryHome}/>
            <Route path="/stock/activation/" component={ActivationHome}/>       
            <Route path="/stock/categories/" component={CategoriesHome}/>
            
            <Route path="/users/home" component={ContactsHome}/>
            
            <Route path="/finances/home" component={FinancesHome}/>





           









            {/*
            <Route path="/stock/prelive" exact component={PreLive}/>

            <Route path="/stock/prelive" exact component={PreLive}/>
            
            <Route path="/stock/prelive/activation/steptwo" exact component={PreLive}/>
            <Route path="/stock/prelive/activation/stepthree" exact component={PreLive}/>
            <Route path="/stock/prelive/activation/stepfour" exact component={PreLive}/>

                <Route path="/leasableitem/:id" exact component={CategoryItemDetail}/>
            */}


            
            
            


            



            {/* LOGIN */}
            <Route path="/" exact component={Login}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/forgottonPassword" exact component={ForgottonPassword}/>

            {/* ADMIN HOME */}
            <Route path="/admin/home" exact component={AdminHome}/>

            {/* PREVIOUS
            <Route path="/leasable/batches" exact component={LeasableBatches}/>
            <Route path="/leasable/batch/:id" exact component={LeasableBatchDetail}/>
            <Route path="/pendingItems/batches" exact component={IdentifierBatches}/>
            <Route path="/admin/products" exact component={Products}/>
            <Route path="/admin/products/:id" exact component={ProductDetail}/> */}
        </Switch>
    )
}










// PRODUCT DETAILS
//import Products from './pages/admin/products';
//import ProductDetail from './pages/admin/productDetail';*
// LEASABLES
//import LeasableBatches from './pages/leasables/batches';
//import LeasableBatchDetail from './pages/leasables/batchDetail';
// IDETIFIERS
//import IdentifierBatches from './pages/leasables/pendingItems';