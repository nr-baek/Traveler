import styled from "styled-components";
import {
  CarOutlined,
  HomeOutlined,
  FileAddOutlined,
  UserOutlined,
  EnvironmentOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../redux/modules/auth';

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
    margin: 0;
  }
  li:first-child {
    border-top: 1px solid #eee;
  }
  li:last-child {
    border-bottom: 1px solid #eee;
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
  .logOut {
    width: 100%;
    margin-top: 40px;
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

const Nav = ({ history }) => {

  const { nickname }  = useSelector(({ auth }) => ({
    nickname: auth.nickname,
  }));

  const logOut = async () => {
    await window.localStorage.removeItem('persist:root');
    await history.push('/login');
  }

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
      <div className="logOut">
        <Link onClick={logOut} className="navBtn" to="/login">
          <ExportOutlined className="navIcon" />
          Log out
        </Link>
      </div>
    </StyledNav>
  );
};

export default withRouter(Nav);
