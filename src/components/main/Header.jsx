import styled from "styled-components";
import { ScheduleOutlined } from "@ant-design/icons";

const StyledHeader = styled.header`
  width: 900px;
  height: 60px;
  background: #fff;
  border-left: 2px solid #f6f5fa;
  float: right;
  h1 {
    color: #444;
    float: right;
    margin: 20px 30px 0 0;
    font-size: 1.3rem;
    font-weight: bold;
  }
  .logo {
    color: #8684ff;
    margin-right: 10px;
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1>
        <ScheduleOutlined className="logo" />
        Traveler
      </h1>
    </StyledHeader>
  );
};

export default Header;
