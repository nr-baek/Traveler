import React from "react";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
const InfoBlock = styled.div`
  position: relative;
  margin: 10px 10px 10px 30px;
  width: 250px;
  height: 193px;
  background: #e3e2ff;
  border: 1px solid #c9c7ff; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const InfoContentBlock = styled.div`
  margin-top: 10px;
`

const InfoTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;
const InfoDate = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;
const ShortcutButton = styled.button`
  margin-top: 10px;
  padding: 5px;
  background: #ccc;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    background: #ccc
  }
`;
const MyInfo = ({
  removePost,
  openPost,
  closePost,
  id,
  title,
  startDate,
  endDate,
}) => {
  return (
    <InfoBlock>
      <CloseOutlined
        onClick={() => removePost(id)}
        style={{
          position: 'absolute',
          right: "4%",
          top: "4%",
          fontSize: "1.3rem",
          color: "#444",
          cursor: "pointer",
          outline: "none",
        }}
      />
      <InfoContentBlock>
        <InfoTitle>{title}</InfoTitle>
        <InfoDate>{startDate} ~ {endDate}</InfoDate>
        <ShortcutButton onClick={openPost}>상세 내용 보기</ShortcutButton>
      </InfoContentBlock>
    </InfoBlock>
  );
};
export default MyInfo;
