import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MainTemplate from "../components/main/MainTemplate";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return <MainTemplate></MainTemplate>;
};

export default Home;
