import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Link, useOutlet } from "react-router-dom";
import "./index.css";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const APage = () => {
  const outlet = useOutlet();
  return (
    <div className="box box-with-menu">
      <ul>
        <li>
          <Link to="/" viewTransition>
            Home
          </Link>
        </li>
        <li>
          <Link to="/1-1" viewTransition>
            1-1
          </Link>
        </li>
        <li>
          <Link to="/1-2" viewTransition>
            1-2
          </Link>
        </li>
      </ul>

      {outlet || (
        <div className="box b-page">
          <h4 style={{ gridColumn: "1 / -1" }}>Welcome to A Page</h4>
        </div>
      )}
    </div>
  );
};
const BPage = () => {
  return (
    <div
      className="box box-with-menu b-page"
      style={{
        gridTemplateRows: "50px 1fr",
      }}
    >
      <h4 style={{ gridColumn: "1 / -1" }}>Welcome to B Page</h4>
      <ul>
        <li>
          <Link to="/1-1/1" viewTransition>
            1-1/1
          </Link>
        </li>
        <li>
          <Link to="/1-1/2" viewTransition>
            1-1/2
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
  return <div className="box">C Page</div>;
};
const DPage = () => {
  return <div className="box">D Page</div>;
};
const EPage = () => {
  return (
    <div className="box b-page">
      <h4 style={{ gridColumn: "1 / -1" }}>Welcome to E Page</h4>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <APage />,
    children: [
      {
        path: "1-1",
        element: <BPage />,
        children: [
          { path: "1", element: <CPage /> },
          { path: "2", element: <DPage /> },
        ],
      },
      {
        path: "1-2",
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
