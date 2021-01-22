import React from "react";
import MyInfo from "../components/MyInfo";
import { Empty } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postclose, postdelete, postopen } from "../redux/modules/post";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    background-color: #acadff;
  }
  &::-webkit-scrollbar-track {
    background: #f6f5fa;
  }
`;

const NewPlanContainer = styled.div`
  width: 100%;
  height: 100%;
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
  margin-bottom: 40px;
  margin-top: 10px;
  color: #666;
`;

const AddNewBtn = styled.div`
  width: 200px;
  height: 200px;
  border: 3px dashed #aba5ff;
  background: #fff;
  border-radius: 10%;
  color: #b7a7ff;
  font-size: 6rem;
  text-align: center;
  line-height: 190px;
  &:hover {
    background: #f9f7ff;
    color: #9e8af6;
    border-color: #918af6;
  }
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
      {posts.length ? (
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
            posts={posts}
          />
        ))
      ) : (
        <NewPlanContainer>
          <NewPlanBox>
            <Empty />
            <NewPlanMessage>Please Add Your New Travel Plan!</NewPlanMessage>
            <Link to="/poster">
              <AddNewBtn>+</AddNewBtn>
            </Link>
          </NewPlanBox>
        </NewPlanContainer>
      )}
    </InfoContainer>
  );
};

export default MyInfoContainer;
