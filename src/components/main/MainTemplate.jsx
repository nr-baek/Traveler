import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Nav from "./Nav";

const MainTemplateContainer = styled.div`
  /* 화면 전체를 채움 */
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #e3e2ff;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1506669318200-6790d9b4c014?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1578&q=80");
  /* 콘텐츠 가운데 정렬 */
  display: flex;
  justify-content: center;
  align-items: center;
  .mainContainer {
    width: 1100px;
    height: 700px;
    background: #f6f5fa;
  }
  .main {
    position: relative;
    width: 900px;
    height: 640px;
    float: right;
  }
`;

const MainTemplate = ({ children }) => {
  return (
    <MainTemplateContainer>
      <div className="mainContainer">
        <Header />
        <Nav />
        <main className="main">{children}</main>
      </div>
    </MainTemplateContainer>
  );
};

export default MainTemplate;
