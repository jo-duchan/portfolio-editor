import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PortfolioListPage, {
  loader as PortfolioListLoader,
} from "pages/PotfolioList";
import Create, { loader as CreateLoader } from "pages/Create";
import Edit, { loader as EditLoader } from "pages/Edit";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <div>임시 에러 페이지</div>,
      children: [
        {
          index: true,
          // path: "list",
          element: <PortfolioListPage />,
          loader: PortfolioListLoader,
        },
        {
          path: "edit",
          children: [
            {
              path: ":portfolioId/front",
              element: <Create />,
              loader: CreateLoader,
            },
            {
              path: ":portfolioId/content",
              element: <Edit />,
              loader: EditLoader,
            },
          ],
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
