import React,{ Component, Fragment } from 'react';
import './App.css'
import Landing from './Components/Layouts/Landing';
import Navbar from './Components/Layouts/Navbar';
import {BrowserRouter as Router,Routes, Route,Switch} from 'react-router-dom'
import  Login  from './Components/auth/Login';
import Register from './Components/auth/Register';
import {Provider} from 'react-redux'
import store from './store';
import Alert from './Components/Layouts/Alert';
const App = ()=>{
  return(
    <Provider store = {store}>
      <Router>
    <Navbar />
      <Routes>
      <Fragment>
      <Route exact path="/" element={<Landing/>} />
      
     
  </Fragment>
      </Routes>
      <section className="container">
      <Alert />
        <Routes>
          <Route exact path = "register" element={<Register />} />
          <Route exact path="login" element={<Login />} />
        </Routes>
      </section>
    </Router>
    </Provider>
  )
}
export default App;

/*
class App extends Component{
  constructor(){
    super()
  }
  render(){
    return(
      <div>
        <h1>sdfsd</h1>
        </div>
    )
  }
}
*/
