import client from "./client";

export const postLoad = ({ token }) =>
  client.get(`http://localhost:4000/posts?writer=${token}`);
