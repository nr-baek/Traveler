import styled from "styled-components";

const NavBtn = styled.button`
  width: 100%;
  height: 45px;
  margin: 10px 0;
  padding: 0 0 0 30px;
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
`;

export default NavBtn;
