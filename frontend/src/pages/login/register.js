import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from "../../services/api";
import '../../App.scss';
import './login.scss';


export default function Register({history}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [addressLine3, setAddressLine3] = useState(''); 
    const [city, setCity] = useState('');
    const [county, setCounty] = useState('');               
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const handleSubmit = async evt => {
        evt.preventDefault();

        const response = await api.post('/users/register', {email, 
                                                            password, 
                                                            firstName, 
                                                            lastName, 
                                                            addressLine1, 
                                                            addressLine2, 
                                                            addressLine3,
                                                            city,
                                                            county,
                                                            country
                                                          })
        const userId = response.data._id || false;

        if(userId) {
            localStorage.setItem('user', userId);
            history.push('/');
        } else {
            const {message} = response.data;
            console.log(message);
            setErrorMessage(message);           
        }
    }

    return (

      <div class="login-background vertical-center">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            &nbsp;
          </div>
          <div class="col-sm">
          <div className="logo-box"><img src="../../../images/suzo/Logo.gif" alt="Welcome to Suzo" className="login-logo"/></div>
    <div className="login-box">
        <div className="welcome-text">Please register for your accout. Already have an account? <Link to="/"><strong>Login</strong></Link></div>   
          <div className="input-fields-container">
          {errorMessage ? (
            <div className="error-message">{errorMessage}</div>
            ): ""
            }   
            <Form onSubmit={handleSubmit} >
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="firstName" className="mr-sm-2 input-labels">First Name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={evt => setFirstName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="lastName" className="mr-sm-2 input-labels">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" onChange={evt => setLastName(evt.target.value)}/>
              </FormGroup> 
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine1" className="mr-sm-2 input-labels">Address Line 1</Label>
                <Input type="text" name="addressLine1" id="addressLine1" onChange={evt => setAddressLine1(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine2" className="mr-sm-2 input-labels">Address Line 2</Label>
                <Input type="text" name="addressLine2" id="addressLine2" onChange={evt => setAddressLine2(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine3" className="mr-sm-2 input-labels">Address Line 3</Label>
                <Input type="text" name="addressLine2" id="addressLine3" onChange={evt => setAddressLine3(evt.target.value)}/>
              </FormGroup> 
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="city" className="mr-sm-2 input-labels">City</Label>
                <Input type="text" name="city" id="city" onChange={evt => setCity(evt.target.value)}/>
              </FormGroup>  
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="county" className="mr-sm-2 input-labels">County</Label>
                <Input type="text" name="county" id="county" onChange={evt => setCounty(evt.target.value)}/>
              </FormGroup>  
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="country" className="mr-sm-2 input-labels">Country</Label>
                <Input type="text" name="country" id="country" onChange={evt => setCountry(evt.target.value)}/>
              </FormGroup>                              
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2 input-labels">Email</Label>
                <Input type="email" name="email" id="email" onChange={evt => setEmail(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="password" className="mr-sm-2 input-labels">Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={evt => setPassword(evt.target.value)}/>
              </FormGroup>
              <div className="forgotton-password"><Link to="/forgottonPassword">Forgotton your password?</Link></div>            
                <FormGroup>
                  <Button className="login-btn">Register</Button>
                </FormGroup>
            </Form>

          </div>
        </div> 
          </div>
          <div class="col-sm">
            &nbsp;
          </div>
        </div>
      </div>
    </div> 

    )
}

/*

      <Container>
      <div className="logo-box"><img src="../../../images/suzo/Logo.gif" alt="Welcome to Suzo" className="login-logo"/></div>
      <div className="login-box">
          <div className="welcome-text">Please register for your accout. Already have an account? <Link to="/"><strong>Log in</strong></Link></div>   
            <div className="input-fields-container">
            {errorMessage ? (
              <div className="error-message">User already registered with this email. Do you want to <Link to="/"><strong>login</strong></Link> instead?</div>
              ): ""
              }   
            <Form onSubmit={handleSubmit} >
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="firstName" className="mr-sm-2 input-labels">First Name</Label>
                <Input type="text" name="firstName" id="firstName" onChange={evt => setFirstName(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="lastName" className="mr-sm-2 input-labels">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" onChange={evt => setLastName(evt.target.value)}/>
              </FormGroup> 
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine1" className="mr-sm-2 input-labels">Address Line 1</Label>
                <Input type="text" name="addressLine1" id="addressLine1" onChange={evt => setAddressLine1(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine2" className="mr-sm-2 input-labels">Address Line 2</Label>
                <Input type="text" name="addressLine2" id="addressLine2" onChange={evt => setAddressLine2(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="addressLine3" className="mr-sm-2 input-labels">Address Line 3</Label>
                <Input type="text" name="addressLine2" id="addressLine3" onChange={evt => setAddressLine3(evt.target.value)}/>
              </FormGroup> 
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="city" className="mr-sm-2 input-labels">City</Label>
                <Input type="text" name="city" id="city" onChange={evt => setCity(evt.target.value)}/>
              </FormGroup>  
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="county" className="mr-sm-2 input-labels">County</Label>
                <Input type="text" name="county" id="county" onChange={evt => setCounty(evt.target.value)}/>
              </FormGroup>  
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="country" className="mr-sm-2 input-labels">Country</Label>
                <Input type="text" name="country" id="country" onChange={evt => setCountry(evt.target.value)}/>
              </FormGroup>                              
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="email" className="mr-sm-2 input-labels">Email</Label>
                <Input type="email" name="email" id="email" onChange={evt => setEmail(evt.target.value)}/>
              </FormGroup>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label for="password" className="mr-sm-2 input-labels">Password</Label>
                <Input type="password" name="password" id="examplePassword" onChange={evt => setPassword(evt.target.value)}/>
              </FormGroup>
              <div className="forgotton-password"><Link to="/forgottonPassword">Forgotton your password?</Link></div>            
                <FormGroup>
                  <Button className="login-btn">Register</Button>
                </FormGroup>
            </Form>
            </div>
          </div>          
      </Container>



*/