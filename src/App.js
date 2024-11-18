import React from "react";
import { Routes, Route,BrowserRouter } from "react-router-dom";
import { Form } from "./Components/Form/index.jsx";
import {  View } from "./Components/View/index.jsx"; 

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/users" element={<View />} />
    </Routes>
    </BrowserRouter>
);
}

export default App;
