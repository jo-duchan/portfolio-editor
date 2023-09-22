import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PortfolioListPage, {
  loader as PortfolioListLoader,
} from "pages/PotfolioList";
import CreatePage, { loader as CreateLoader } from "pages/Create";
import EditPage, { loader as EditLoader } from "pages/Edit";
import PreviewPage, { loader as PreviewLoader } from "pages/Preview";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <div>임시 에러 페이지</div>,
      children: [
        {
          index: true,
          element: <PortfolioListPage />,
          loader: PortfolioListLoader,
        },
        {
          path: "edit",
          children: [
            {
              path: ":portfolioId/front",
              element: <CreatePage />,
              loader: CreateLoader,
            },
            {
              path: ":portfolioId/content",
              element: <EditPage />,
              loader: EditLoader,
            },
          ],
        },
        {
          path: "preview/:portfolioId",
          element: <PreviewPage />,
          loader: PreviewLoader,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
