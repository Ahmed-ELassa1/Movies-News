import {
  createBrowserRouter,
  createHashRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import MasterLayout from "./componet/masterLayout/masterLayout";
import Home from "./componet/home/Home";
import Movies from "./componet/movies/movies";
import TvShow from "./componet/tv-show/tvshow";
import People from "./componet/people/people";
import Networks from "./componet/networks/networks";
import Login from "./componet/login/login";
import Register from "./componet/register/register";
import NotFound from "./componet/not-found/notfound";
import UserContextProvider from "./api/user";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import MovieDetails from "./componet/movie-details/movie-details";
import TvDetails from "./componet/tv-details/tv-details";
import PeopleDetails from "./componet/people-details/people-details";
export default function App() {
  let [user, setUser] = useState(null);
  function logOut() {
    localStorage.clear("token");
    setUser(null);
    return <Navigate to={"/login"} />;
  }
  function saveUserData() {
    let token = localStorage.getItem("token");
    const data = jwt_decode(token);
    setUser(data.email);
  }
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      console.log("hello");
      saveUserData();
    }
  }, []);

  function ProtectedRouter(props) {
    if (localStorage.getItem("token") == null) {
      return <Navigate to="/login" />;
    } else {
      return props.children;
    }
  }
  const routers = createHashRouter([
    {
      path: "/",
      element: <MasterLayout user={user} logOut={logOut} />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "/movies",
          element: (
            <ProtectedRouter>
              <Movies />
            </ProtectedRouter>
          ),
        },
        {
          path: "/moviedetails/:id/:type",
          element: (
            <ProtectedRouter>
              <MovieDetails />
            </ProtectedRouter>
          ),
        },
        {
          path: "/tvdetails/:id/:type",
          element: (
            <ProtectedRouter>
              <TvDetails />
            </ProtectedRouter>
          ),
        },
        {
          path: "/peopledetails/:id/:type",
          element: (
            <ProtectedRouter>
              <PeopleDetails />
            </ProtectedRouter>
          ),
        },
        {
          path: "/tvshow",
          element: (
            <ProtectedRouter>
              <TvShow />
            </ProtectedRouter>
          ),
        },
        {
          path: "/people",
          element: (
            <ProtectedRouter>
              <People />
            </ProtectedRouter>
          ),
        },
        {
          path: "/networks",
          element: (
            <ProtectedRouter>
              <Networks />
            </ProtectedRouter>
          ),
        },
        {
          path: "/login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "*",
          element: (
            <ProtectedRouter>
              <NotFound />
            </ProtectedRouter>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={routers} />
      </UserContextProvider>
    </>
  );
}
