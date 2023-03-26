import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "styles/common";
import TopVisualProvider from "context/TopVisualProvider";
import ContentListProvider from "context/ContentListProvider";
import CurrentItemProvider from "context/CurrentItemProvider";

// Pages
import Home from "pages/Home";
import Edit from "pages/Edit";
import Preview from "pages/Preview";

function App() {
  return (
    <BrowserRouter>
      <ContentListProvider>
        <TopVisualProvider>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/edit"
              element={
                <CurrentItemProvider>
                  <Edit />
                </CurrentItemProvider>
              }
            />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </TopVisualProvider>
      </ContentListProvider>
    </BrowserRouter>
  );
}

export default App;
