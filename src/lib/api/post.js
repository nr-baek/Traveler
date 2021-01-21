import client from "./client";

// 사용자와 일치하는 게시물을 id 기준으로 오름차순으로 정렬하여 받아온다
export const postLoad = ({ token }) =>
  client.get(`http://localhost:4000/posts?_sort=id&?writer=${token}`);

export const getIdLength = () => client.get(`http://localhost:4000/posts/`);

export const addPost = ({ data, writer, title, travelType, desc }) =>
  client.post("http://localhost:4000/posts/", {
    id: data,
    writer,
    title,
    travelType,
    desc,
  });

// 선택된 게시물 삭제
export const deletePost = (id) => {
  return client.delete(`http://localhost:4000/posts/${id}`);
};
