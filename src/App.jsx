import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {

  render(){
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
