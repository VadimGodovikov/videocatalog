import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Main from "./pages/Main";
import Movie from "./pages/Movie"
import Library from "./pages/Library";
import Profile from "./pages/Profile";
import Person from "./pages/Person";
import Film from "./pages/Film";
import MainLayout from "./components/MainLayout";
import Podborki from "./pages/Podborki";
import NotFound from "./pages/NotFound";
import Actor from "./pages/Actor"
import { LIBRARY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, MOVIE_ROUTE, PERSON_ROUTE, FILM_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, PODBORKI_ROUTE, ACTORS_ROUTE, NOTFOUND_ROUTE } from "./utils/consts";

const router = createBrowserRouter([
 {
   path: '/',
   element: <MainLayout/>,
   children: [
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
      {
        path: PODBORKI_ROUTE,
        element: <Podborki />
      },
      {
        path: PERSON_ROUTE,
        element: <Person/>
      },
      {
        path: FILM_ROUTE,
        element: <Film/>
      },
      {
        path: ACTORS_ROUTE,
        element: <Actor/>
      }
   ]
 },
 {
   path: LOGIN_ROUTE,
   element: <Login/>
 },
 {
   path: REGISTRATION_ROUTE,
   element: <Registration/>
 },
 {
  path: NOTFOUND_ROUTE,
  element: <NotFound/>
 },

])

export default router;