import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


const NavbarPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container-fluid">
    <Router> 
      <Navbar expand="md" className="nav-navbar">
        <NavbarBrand href="/" className="font-size-40">leasabl :</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="#" className="navlink">Scheme</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users/home" className="navlink">Audience</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/stock/" className="navlink">Stock</NavLink>
            </NavItem>            
            <NavItem>
              <NavLink href="/finances/home" className="navlink">Financials</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" className="navlink">The Marketplace</NavLink>
            </NavItem>                                                  
          </Nav>
        </Collapse>
      </Navbar>
       
    </Router>  
    </div>
  );
}

export default NavbarPage;

/*

      <Switch>
          <Route exact path="/containerTypes/:id" >
            <Containers />
          </Route>
          <Route exact path="/containerTypes">
            <ContainerTypes />
          </Route>          
          <Route exact path="/products">
            <Products />
          </Route>  
          <Route exact path="/products/:id">
            <ProductDetails/>
          </Route> 
          <Route exact path="/consumers">
            <Consumers />
          </Route>                               
          <Route exact path="/">
            <AdminHome />
          </Route>                                              
        </Switch> 

*/







/* NAV CLASS
class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  return (
    

      <Switch>
          <Route exact path="/containerTypes/:id" >
            <Containers />
          </Route>
          <Route exact path="/containerTypes">
            <ContainerTypes />
          </Route>          
          <Route exact path="/products">
            <Products />
          </Route>  
          <Route exact path="/products/:id">
            <ProductDetails/>
          </Route> 
          <Route exact path="/consumers">
            <Consumers />
          </Route>                               
          <Route exact path="/">
            <AdminHome />
          </Route>                                              
        </Switch>  
    </Router>
    );
  }
}

export default NavbarPage;





      <Navbar  bg="dark" variant="dark" expand="md">
        <Navbar.Brand><Link to="/">Suzo Admin</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown className="nav-link-suzo" title="Containers" id="basic-nav-dropdown">
              <NavDropdown.Item href="http://localhost:3000/containertypes">Container Types</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000">Containers Units</NavDropdown.Item>
            </NavDropdown>      
            <Nav.Link className="nav-link-suzo" href="http://localhost:3000/products">Products</Nav.Link>
            <Nav.Link className="nav-link-suzo" href="http://localhost:3000/suzoledger">Ledger</Nav.Link>
            <NavDropdown className="nav-link-suzo" title="Participants" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Retailers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">Manufacturers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="http://localhost:3000/consumers">Consumers</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Third Parties</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="nav-link-suzo" href="http://localhost:3000/">Statistics</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>



*/

