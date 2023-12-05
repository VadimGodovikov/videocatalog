//export const authRoutes = [
//    {
//        path: ''
//    }
//]

import Auth from "./pages/Auth";
import Main from "./pages/Main";
import Movie from "./pages/Movie"
import { LOGIN_ROUTE, MAIN_ROUTE, MOVIE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const publicRoutes = [
 {
    path: LOGIN_ROUTE,
    Component: Auth
 },
 {
    path: REGISTRATION_ROUTE,
    Component: Auth
 },
 {
    path: MOVIE_ROUTE,
    Component: Movie
 },
 {
    path: MAIN_ROUTE,
    Component: Main
 },
]