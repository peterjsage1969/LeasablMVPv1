import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import api from "../../services/api";
//import '../../App.scss';
import './login.scss';

export default function Login({history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault();

        //console.log("heyho")

        const response = await api.post('/login', {email, password})
        const userId = response.data._id || false;

        if(userId) {
            localStorage.setItem('user',userId);
            history.push('../admin/home');
        } else {
            const {message} = response.data;
            setErrorMessage(message);
        }
    }

    return (

      <div className="login-background vertical-center">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              &nbsp;
            </div>
            <div className="col-sm">
            <div className="logo-box"><img src="../../../images/suzo/Logo.gif" alt="Welcome to Suzo" className="login-logo"/></div>
      <div className="login-box">
          <Form>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Input type="select" name="select" id="exampleSelect">
                <option>Suzo Admin</option>
                <option>Fetchem From The Cupboard (Retailer)</option>
                <option>HISBE (Retailer)</option>
                <option>John Doe (Customer)</option>
                <option>Amina Khanom (Customer)</option>
              </Input>                 
              </FormGroup>     
          </Form>
          <div className="welcome-text">Please login to your accout. Don't have an account? <Link to="/register"><strong>Register</strong></Link></div>   
            <div className="input-fields-container">
            {errorMessage ? (
              <div className="error-message">{errorMessage}</div>
              ): ""
              }   
            <Form onSubmit={handleSubmit} >       
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
                  <Button className="login-btn">Submit</Button>
                </FormGroup>
            </Form>
            </div>
          </div> 
            </div>
            <div className="col-sm">
              &nbsp;
            </div>
          </div>
        </div>
      </div>

    )
}


