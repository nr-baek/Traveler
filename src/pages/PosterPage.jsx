import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Poster from "../components/Poster";

const PosterPage = () => {
  const token = useSelector((state) => state.auth.token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  console.log(token);
  return <Poster />;
};

export default PosterPage;
