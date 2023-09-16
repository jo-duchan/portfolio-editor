import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "pages/Create";
import Edit, { loader as EditLoader } from "pages/Edit";
import Preview from "pages/Preview";

const router = createBrowserRouter(
  [
    {
      path: "/",
      errorElement: <div>임시 에러 페이지</div>,
      children: [
        { index: true, element: <Create /> },
        { path: "edit/:portfolioId", element: <Edit />, loader: EditLoader },
        { path: "preview", element: <Preview /> },
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
