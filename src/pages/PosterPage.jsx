import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Poster from "../components/post/Poster";

const PosterPage = () => {
  const token = sessionStorage.getItem("token");
  if (token === null) {
    return <Redirect to="/login" />;
  }
  console.log(token);
  return <Poster />;
};

export default PosterPage;
