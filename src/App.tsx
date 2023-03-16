import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "styles/common";
import ContentDataProvider from "context/ContentDataProvider";
import CurrentItemProvider from "context/CurrentItemProvider";

// Pages
import Edit from "pages/Edit";
import Preview from "pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <ContentDataProvider>
        <CurrentItemProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Edit />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </CurrentItemProvider>
      </ContentDataProvider>
    </BrowserRouter>
  );
}

export default App;
