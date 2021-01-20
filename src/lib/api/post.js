import client from "./client";

export const register = ({ id, password, nickname }) =>
  client.post("http://localhost:4000/users/", {
    id,
    password,
    nickname,
  });

export const addPost = ({ id, writer, type, startDate, mm, days, desc }) =>
  client.post("http://localhost:4000/posts/", {
    id,
    writer,
    type,
    startDate,
    mm,
    days,
    desc,
  });
