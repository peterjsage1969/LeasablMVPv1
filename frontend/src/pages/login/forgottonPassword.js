import React, {useState} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
//import api from "../../services/api";
import '../../App.scss';
import './login.scss';

export default function ForgottonPassword({history}) {

    const [email, setEmail] = useState('');
//    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault();

  //      const response = await api.post('/login', {email})
  //      const userId = response.data._id || false;

        if(email) {
            history.push('../admin/home');
        } else {
           // const {message} = response.data;
           // console.log(message);
           // setErrorMessage(message);
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
                <div className="welcome-text">Forgotton Your Password? Please enter your email and we will email you a link to reset it.</div>   
                <div className="input-fields-container">               
                  <Form onSubmit={handleSubmit}>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                      <Label for="exampleEmail" className="mr-sm-2 input-labels">Email</Label>
                      <Input type="email" name="email" id="exampleEmail" onChange={evt => setEmail(evt.target.value)}/>
                    </FormGroup>           
                    <FormGroup>
                      <Button className="login-btn">Email me reset link</Button>
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