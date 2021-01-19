import client from "./client";

// 로그인
export const login = ({ id, password }) =>
  client.get(`http://localhost:4000/users?id=${id}&password=${password}`);

// 중복계정 확인
export const checkRegister = (id) =>
  client.get(`http://localhost:4000/users?id=${id}`);

// 회원가입
export const register = ({ id, password, nickname }) =>
  client.post("http://localhost:4000/users/", {
    id,
    password,
    nickname,
  });
