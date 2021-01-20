import React from "react";
import MyInfo from "../components/MyInfo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postload } from "../redux/modules/post";

const MyInfoContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(({ auth }) => ({
    token: auth.token,
  }));

  const onClick = () => {
    dispatch(postload(token));
  };

  return (
    // {posts.map(post => (
    //   <MyInfo onClick={onClick} />
    // ))}
    <MyInfo onClick={onClick} />
  );
};

export default MyInfoContainer;
