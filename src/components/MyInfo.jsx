import React from 'react';
import styled from 'styled-components';

const InfoWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InfoContainer = styled.div`
  width: 1000px;
  height: 600px;
  padding: 25px 50px;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-wrap: wrap;
`

const InfoBlock = styled.div`
  margin: 10px 10px;
  width: 280px;
  height: 180px;
  background: #fceecc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const InfoTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`

const InfoDate = styled.p`
  font-size: 1rem;
  font-weight: 500;
`


const MyInfo = ({ onClick }) => {
  return (
    <InfoWrapper>
      <InfoContainer>
        <InfoBlock>
          <InfoTitle>한슬이와 나라의 부산 여행</InfoTitle>
          <InfoDate>2021-01-19 ~ 2021-01-21</InfoDate>
          <button onClick={onClick}>게시물 요청</button>
        </InfoBlock>
      </InfoContainer>
    </InfoWrapper>
    
  );
};

export default MyInfo;