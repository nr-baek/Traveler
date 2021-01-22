import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import MainTemplate from "../components/main/MainTemplate";
import CalendarContainer from "../containers/CalendarContainer";

const H2 = styled.h2`
  margin: 8px 0 0 30px;
  padding: 0;
  font-size: 1.5rem;
  color: #afa9dd;
  position: absolute;
`;

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <MainTemplate>
      <H2>Calendar</H2>
      <CalendarContainer />
    </MainTemplate>
  );
};

export default Home;
