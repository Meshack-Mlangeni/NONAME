import { createBrowserRouter } from "react-router-dom";
import HomePage from "../../features/pages/home/HomePage";
import App from "../../App";

export const routes = createBrowserRouter([{
    path: '/',
    element: <App />,
    children: [
        { path: '/home', element: <HomePage /> }
    ]
}]);