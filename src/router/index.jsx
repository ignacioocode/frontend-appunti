import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import DetailsNote from "../pages/detailsNote/DetailsNote";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import NotFound from '../pages/notFound/NotFound'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Login/>
            },
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/details/:id',
                element: <DetailsNote/>
            },
            {
                path: '/:username',
                element: <Profile/>
            }
        ]
    }
])