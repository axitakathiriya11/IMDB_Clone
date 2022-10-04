import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Movies from "./movies/Movies";
import DetailMovie from "./detailMovie/DetailMovie";
import Login from "./auth/Login";
import Register from "./auth/Register";
import NotFound from "./utils/not_found/NotFound";
import Actors from "./actors/Actors";
import CreateMovie from "./createMovie/CreateMovie";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/movies" element={<Movies />} />
      <Route path="/detail/:id" element={<DetailMovie />} />

      <Route path="/" element={isLogged ? <Movies /> : <Login />} />
      <Route
        path="/register"
        element={isLogged ? <NotFound /> : <Register />}
      />


      <Route
        path="/actor"
        element={isAdmin ? <Actors /> : <NotFound />}
      />
      <Route
        path="/create_movie"
        element={isAdmin ? <CreateMovie /> : <NotFound />}
      />
      <Route
        path="/edit_movie/:id"
        element={isAdmin ? <CreateMovie /> : <NotFound />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Pages;
