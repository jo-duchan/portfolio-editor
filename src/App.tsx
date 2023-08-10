import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "styles/common";
import ContentListProvider from "context/ContentListProvider";
import CurrentItemProvider from "context/CurrentItemProvider";

// Pages
import Create from "pages/Create";
import Edit from "pages/Edit";
import Preview from "pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route
          path="/edit/:portfolioId"
          element={
            <ContentListProvider>
              <CurrentItemProvider>
                <Edit />
              </CurrentItemProvider>
            </ContentListProvider>
          }
        />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
