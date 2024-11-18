
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FormPage } from "./Components/FormPage";
import { EditPage } from "./Components/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;

