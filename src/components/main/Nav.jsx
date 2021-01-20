import styled from "styled-components";
import {
  CarOutlined,
  HomeOutlined,
  FileAddOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import NavBtn from "../common/NavBtn";

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
  }
  .navIcon {
    margin-right: 10px;
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
  return (
    <StyledNav>
      <UserMark className="userMark">
        <CarOutlined />
      </UserMark>
      <div className="welcomeBox">
        <p className="welcomeMsg">Welcome</p>
        <p className="nickName">narazzang</p>
      </div>
      <ul>
        <li>
          <NavBtn>
            <HomeOutlined className="navIcon" />
            Home
          </NavBtn>
        </li>
        <li>
          <NavBtn>
            <FileAddOutlined className="navIcon" />
            Add
          </NavBtn>
        </li>
        <li>
          <NavBtn>
            <UserOutlined className="navIcon" />
            My page
          </NavBtn>
        </li>
        <li>
          <NavBtn>
            <EnvironmentOutlined className="navIcon" />
            Map
          </NavBtn>
        </li>
      </ul>
    </StyledNav>
  );
};

export default Nav;
