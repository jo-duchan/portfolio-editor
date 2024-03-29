import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import ContentListProvider from "context/ContentListProvider";
import GlobalStyle from "styles/common";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContentListProvider>
    <GlobalStyle />
    <App />
  </ContentListProvider>
);
