import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const InfoBlock = styled.div`
  position: relative;
  margin: 10px 10px 10px 30px;
  width: 250px;
  height: 193px;
  background: linear-gradient(45deg, #e3e2ff, #e0d5e3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const InfoTitle = styled.h2`
  margin: 0;
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: 600;
`

const InfoDate = styled.p`
  font-size: 1rem;
  font-weight: 500;
`

const ShortcutButton = styled.button`
  margin-top: 20px;
  padding: 5px;
  /* background: linear-gradient(45deg, #8aeddd, #e0d5e3); */
  background: #ccc;
  border: none;
  cursor: pointer;
  outline: none;
  &:hover {
    /* transition: 0.5s; */
    background: linear-gradient(45deg, #8aeddd, #e0d5e3)
  }
`

const MyInfo = ({ removePost, openPost, closePost, id, title, startDate, endDate }) => {
  return (
    <InfoBlock>
      <CloseOutlined 
        onClick={() => removePost(id)} 
        style={{position: 'absolute', right: '3%', top: '3%', fontSize: '1.3rem', color: '#990db5', cursor: 'pointer', outline: 'none'}}
      />
      <InfoTitle>{title}</InfoTitle>
      <InfoDate>{startDate} ~ {endDate}</InfoDate>
      <ShortcutButton onClick={openPost}>상세 내용 보기</ShortcutButton>
    </InfoBlock>
  );
};

export default MyInfo;