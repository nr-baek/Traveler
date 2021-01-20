import React from 'react';
import { useSelector } from 'react-redux';

const MyPage = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <div>
      마이 페이지
    </div>
  );
};

export default MyPage;