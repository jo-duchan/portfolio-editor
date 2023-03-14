import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";

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
        <Route path="/" element={<>APP</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
