import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";
import ContentDataProvider from "context/ContentDataProvider";

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
      text: "text",
      url: "",
    },
    option: {
      size: "L",
      margin: "NONE",
      aline: "LEFT",
    },
  },
  {
    id: "get1",
    sort: "TITLE",
    content: {
      text: "타이틀",
      url: "",
    },
    option: {
      size: "S",
      margin: "S",
      aline: "LEFT",
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
      aline: "LEFT",
    },
  },
];

function App() {
  const [contentData, setContentData] = useState<ContentList>(dummyData);

  return (
    <BrowserRouter>
      <ContentDataProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home data={contentData} />} />
          <Route
            path="/edit"
            element={
              <Edit data={contentData} setContentData={setContentData} />
            }
          />
        </Routes>
      </ContentDataProvider>
    </BrowserRouter>
  );
}

export default App;
