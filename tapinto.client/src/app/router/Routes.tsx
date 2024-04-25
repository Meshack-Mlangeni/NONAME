import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Settings from "../../features/pages/settings/Settings";
import AccountPage from "../../features/pages/account/AccountPage";
import AboutPage from "../../features/pages/about/AboutPage";
import HomePage from "../../features/pages/home/Homepage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/settings", element: <Settings /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
]);
