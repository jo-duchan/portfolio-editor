import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";
import ContentDataProvider from "context/ContentDataProvider";

// Pages
import Home from "pages/Home";
import Edit from "pages/Edit";

function App() {
  return (
    <BrowserRouter>
      <ContentDataProvider>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </ContentDataProvider>
    </BrowserRouter>
  );
}

export default App;
