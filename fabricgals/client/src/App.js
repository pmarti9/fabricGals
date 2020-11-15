import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import Footer from "./components/Footer"

function App() {
  return (
   <Router basename={process.env.PUBLIC_URL}>
     <div>
       <div>
         <Header />
         <Switch>
           
         </Switch>
       </div>
       <Footer />
     </div>
   </Router>
  );
}

export default App;
