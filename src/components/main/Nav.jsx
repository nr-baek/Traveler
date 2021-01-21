import styled from "styled-components";
import {
  CarOutlined,
  HomeOutlined,
  FileAddOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledNav = styled.nav`
  width: 200px;
  height: 700px;
  background: #fff;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  ul {
    width: 100%;
  }
  .welcomeMsg {
    font-size: 1.4rem;
    margin: 10px 0 0 0;
  }
  .userMark {
    text-align: center;
  }
  .welcomeBox {
    text-align: center;
    border-bottom: 1px solid #eee;
    padding: 20px;
    color: #333;
    p {
      margin: 0;
    }
    .welcomeMsg {
      font-weight: bold;
    }
    .nickName {
      font-size: 1.2rem;
      font-weight: 500;
      color: #8a60fd;
    }
  }
  .navIcon {
    margin-right: 10px;
  }
  .navBtn {
    display: block;
    width: 100%;
    height: 45px;
    margin: 10px 0;
    padding: 10px 0 10px 30px;
    color: #444;
    background: #fff;
    border: none;
    border-radius: 3px;
    font-size: 1.1rem;
    text-align: left;
    outline: none;
    cursor: pointer;
    &:hover {
      background-color: #9e97ff;
      color: #fff;
      transition: background-color 0.3s, color 0.3s;
    }
  }
`;

const UserMark = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  border-radius: 50%;
  background: #eee;
  color: #b5a4ff;
  margin: 5px 0;
`;

const Nav = () => {

  const { nickname }  = useSelector(({ auth }) => ({
    nickname: auth.nickname,
  }))

  return (
    <StyledNav>
      <UserMark className="userMark">
        <CarOutlined />
      </UserMark>
      <div className="welcomeBox">
        <p className="welcomeMsg">Welcome</p>
        <p className="nickName">{nickname}</p>
      </div>
      <ul>
        <li>
          <Link className="navBtn" to="/">
            <HomeOutlined className="navIcon" />
            Home
          </Link>
        </li>
        <li>
          <Link className="navBtn" to="/poster">
            <FileAddOutlined className="navIcon" />
            Add
          </Link>
        </li>
        <li>
          <Link className="navBtn" to="/mypage">
            <UserOutlined className="navIcon" />
            My page
          </Link>
        </li>
        <li>
          <Link className="navBtn" to="/map">
            <EnvironmentOutlined className="navIcon" />
            Map
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
