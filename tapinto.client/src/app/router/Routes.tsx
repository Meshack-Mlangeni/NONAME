import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Settings from "../../features/pages/settings/Settings";
import AboutPage from "../../features/pages/about/AboutPage";
import HomePage from "../../features/pages/homepage/HomePage";
import Tests from "../../features/pages/homepage/subs/tests/tests";
import Results from "../../features/pages/homepage/subs/results/results";
import Login from "../../features/pages/account/login";
import Register from "../../features/pages/account/register";
import School from "../../features/pages/homepage/subs/myschool/mySchool";
import Live from "../../features/pages/live/live";
import Groups from "../../features/pages/homepage/subs/groups/Groups";
import MobileProfilePage from "../../features/pages/account/mobileProfilePage";
import ShowActivitiesOnHomePage from "../../features/pages/homepage/subs/activity/showActivitiesOnHomepage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
        children: [
          { path: "/home/activity", element: <ShowActivitiesOnHomePage /> },
          { path: "/home/groups", element: <Groups /> },
          { path: "/home/tests", element: <Tests /> },
          { path: "/home/results", element: <Results /> },
          { path: "/home/live/:id", element: <Live /> },
        ],
      },
      { path: "/settings", element: <Settings /> },

      { path: "/myschool", element: <School /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/mobprofile", element: <MobileProfilePage /> },
    ],
  },
]);
