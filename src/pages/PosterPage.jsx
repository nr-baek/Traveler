import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MainTemplate from "../components/main/MainTemplate";
import Poster from "../components/Poster";
const PosterPage = () => {
  const token = useSelector((state) => state.auth.token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return <Poster />;
};
export default PosterPage;
