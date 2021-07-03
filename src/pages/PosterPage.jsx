import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import MainTemplate from "../components/main/MainTemplate";
import PosterContainer from "../containers/PosterContainer";
import styled from "styled-components";

const H2 = styled.h2`
  margin: 8px 0 0 30px;
  padding: 0;
  font-size: 1.5rem;
  color: #afa9dd;
  position: absolute;
`;

const PosterPage = () => {
  const token = useSelector((state) => state.auth.token);
  if (token === null) {
    return <Redirect to="/login" />;
  }
  return (
    <MainTemplate>
      <H2>Poster</H2>
      <PosterContainer />
    </MainTemplate>
  );
};
export default PosterPage;
