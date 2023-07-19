import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Exel from "./page/Exel";
import Header from "./page/Header";
import Home from "./page/component/Home";
import Contact from "./page/component/Contact";
import About from "./page/component/About";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Header />

        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/" element={<Exel />} />
        </Routes>
      </React.Fragment>
    </Router>
  );
}

export default App;
