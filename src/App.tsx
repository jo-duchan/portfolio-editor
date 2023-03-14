import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";

// Pages
import Home from "pages/Home";
import Edit from "pages/Edit";

const dummyData = [
  {
    id: "get0",
    tag: "p",
    content: "Create First Component",
  },
  {
    id: "get1",
    tag: "p",
    content: "Create Second Component",
  },
  {
    id: "get2",
    tag: "p",
    content: "Create Third Component",
  },
];

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Home data={dummyData} />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
