import client from "./client";

export const postLoad = ({ token }) =>
  client.get(`http://localhost:4000/posts?writer=${token}`);

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

