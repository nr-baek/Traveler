import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MainTemplate from "../components/main/MainTemplate";
import CalendarContainer from "../containers/CalendarContainer";

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <MainTemplate>
      <CalendarContainer />
    </MainTemplate>
  );
};

export default Home;
