import client from "./client";

export const postLoad = ({ token }) =>
  client.get(`http://localhost:4000/posts?writer=${token}`);

export const getIdLength = () => client.get(`http://localhost:4000/posts/`);

export const addPost = ({ data, writer, title, travelType, desc }) =>
  client.post("http://localhost:4000/posts/", {
    id: data,
    writer,
    title,
    travelType,
    desc,
  });
