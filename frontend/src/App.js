import React from 'react';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <Router>
      <Routes/> 
    </Router>
  );
}

export default App;
