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
