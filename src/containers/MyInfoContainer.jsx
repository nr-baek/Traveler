import React from "react";
import MyInfo from "../components/MyInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postclose,
  postdelete,
  postopen,
  changePostloading,
  initializePostLoading
} from "../redux/modules/post";
import styled from "styled-components";
import { Link } from "react-router-dom";
import newplanBg from "../img/newplanbgImg.jpg";
import { LoadingOutlined } from '@ant-design/icons';
import LoadingBox from '../components/common/LoadingBox';

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 12px;
    height: 8px;
    background: #ffffff;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #7adcf5;
  }
  &::-webkit-scrollbar-track {
    background: #f6f5fa;
  }
`;

const NewPlanContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${newplanBg});
  background-size: cover;
`;

const NewPlanBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(4px);
`;

const NewPlanMessage = styled.h2`
  font-size: 2rem;
  margin-bottom: 50px;
`;

const MyInfoContainer = () => {
  const dispatch = useDispatch();
  
  const { posts } = useSelector(({ auth, post }) => ({
    token: auth.token,
    posts: post.getpost,
  }));

  // 게시물 삭제
  const removePost = (id) => {
    dispatch(
      postdelete(
        id,
        posts.filter((post) => post.id !== id)
      )
    );
  };

  const openPost = () => {
    dispatch(postopen());
    console.log("open");
  };

  const closePost = () => {
    dispatch(postclose());
    console.log("close");
  };

  return (
    <InfoContainer>
      {posts.length 
        ? (
        posts.map((post) => (
          <MyInfo
            openPost={openPost}
            closePost={closePost}
            removePost={removePost}
            id={post.id}
            key={post.id}
            title={post.title}
            startDate={post.startDate}
            endDate={post.endDate}
          />
        ))) 
        :
        <NewPlanContainer> 
          <NewPlanBox>
            <NewPlanMessage>Please Add Your New Travel Plan!</NewPlanMessage>
            <Link
              to="/poster"
              style={{
                borderBottom: "2px solid #8a60fd",
                borderRadius: "5px 5px 0 0",
                padding: "10px",
                fontSize: "1.1rem",
              }}
            >
              Go To Add Your New Plan
            </Link>
          </NewPlanBox>
        </NewPlanContainer>
      }
    </InfoContainer>
  );
};

export default MyInfoContainer;
