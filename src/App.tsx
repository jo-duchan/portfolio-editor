import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";

// Pages
import Home from "pages/Home";
import Edit from "pages/Edit";

// Type
import { ContentList } from "type/contentDataType";

const dummyData: ContentList = [
  {
    id: "get0",
    sort: "TEXT",
    content: {
      text: "",
      url: "",
    },
    option: {
      size: "L",
      margin: "NONE",
    },
  },
  {
    id: "get1",
    sort: "TITLE",
    content: {
      text: "",
      url: "",
    },
    option: {
      size: "S",
      margin: "NONE",
    },
  },
  {
    id: "get2",
    sort: "IMG",
    content: {
      text: "",
      url: "",
    },
    option: {
      size: "S",
      margin: "NONE",
    },
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
