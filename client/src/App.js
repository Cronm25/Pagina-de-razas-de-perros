import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import React from 'react';
import Landing from "../src/components/landing_page.jsx"
import Home from "../src/components/Home.jsx"
import Formulario from "../src/components/Formulario.jsx"
import Detalles from "../src/components/Detalles.jsx"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path="/" element = {<Landing/>}/>
        <Route exact path="/home" element = {<Home/>}/>
        <Route path="/create" element = {<Formulario/>}/>
        <Route path="/recipe/:id" element = {<Detalles/>}/>
      </Routes>
     </div>
    </BrowserRouter>
  );
}

export default App;
