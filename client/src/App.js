import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, BrowserRouter} from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Footer from "./components/Footer/Footer"
import Navtabs from "./components/Navtabs/Navtabs"
import Login from "./components/Login/Login"
import Home from "./components/Home/Home"
import About from "./components/About/About"

function App() {
  return (
   <Router basename={process.env.PUBLIC_URL}>
     <div>
       <div>
         <Navtabs />
         <Route exact path="/" component={Home} />
         <Route exact path="/Home" component={Home} />
         <Route exact path="/Login" component={Login} />
         <Route exact path="/About" component={About} />
       </div>
       <Footer />
     </div>
   </Router>
  );
}

export default App;
