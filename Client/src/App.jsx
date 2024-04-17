
import React from 'react'
import {BrowserRouter, Route,Routes} from "react-router-dom";
import {LoginPage, SignUpPage} from './Routes';


const App = () => {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/login" element={<LoginPage/>} />
    <Route path='/signup' element={<SignUpPage/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
};

export default App

