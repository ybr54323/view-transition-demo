import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link } from "react-router-dom";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const APage = () => {
  return (
    <div className="box box-with-menu">
      <ul>
        <li>
          <Link to="/" viewTransition>
            Home
          </Link>
        </li>
        <li>
          <Link to="/b-page" viewTransition>
            b-page
          </Link>
        </li>
        <li>
          <Link to="/e-page" viewTransition>
            e-page
          </Link>
        </li>
      </ul>

      <div>
        <Outlet />
      </div>
    </div>
  );
};
const BPage = () => {
  return (
    <div className="box box-with-menu b-page">
      <ul>
        <li>
          <Link to="/b-page/c-page" viewTransition>
            c-page
          </Link>
        </li>
        <li>
          <Link to="/b-page/d-page" viewTransition>
            d-page
          </Link>
        </li>
      </ul>

      <div className="c-page">
        <Outlet />
      </div>
    </div>
  );
};
const CPage = () => {
  return (
    <div
      className="box"
      style={{
        height: "100%",
      }}
    >
      C Page
    </div>
  );
};
const DPage = () => {
  return <div className="box">D Page</div>;
};
const EPage = () => {
  return (
    <div className="box b-page">
      <div>E Page</div>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <APage />,
    children: [
      {
        path: "b-page",
        element: <BPage />,
        children: [
          { path: "c-page", element: <CPage /> },
          { path: "d-page", element: <DPage /> },
        ],
      },
      {
        path: "e-page",
        element: <EPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
