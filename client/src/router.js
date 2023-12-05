import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
import Movie from "./pages/Movie"
import Library from "./pages/Library";
import Profile from "./pages/Profile"
import { LIBRARY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MOVIE_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

const router = createBrowserRouter([
 {
    path: LOGIN_ROUTE,
    element: <Login/>
 },
 {
    path: REGISTRATION_ROUTE,
    element: <Registration/>
 },
 {
    path: MOVIE_ROUTE,
    element: <Movie/>
 },
 {
    path: MAIN_ROUTE,
    element: <Main/>
 },
 {
   path: LIBRARY_ROUTE,
   element: <Library />
 },
 {
   path: PROFILE_ROUTE,
   element: <Profile />
 },
])

export default router;