import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [state, setState] = useState({ id: "", pw: "" });

  const createToken = () => Math.random();

  const onSubmit = async (e) => {
    e.preventDefault();
    setState({ id: "", pw: "" });

    const res = await axios.get(`http://localhost:4000/users?id=${state.id}`);

    if (res.data.length === 0) return;

    const token = createToken();
    window.sessionStorage.setItem("token", token);

    console.log(res);
  };

  const onChange = ({ target }) => {
    if (target.type === "text") {
      setState({ ...state, id: target.value });
    } else {
      setState({ ...state, pw: target.value });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="loginId">아이디</label>
        <input id="loginId" type="text" onChange={onChange} value={state.id} />
        <label htmlFor="loginPw" onChange={onChange}>
          비밀번호
        </label>
        <input
          id="loginPw"
          type="password"
          onChange={onChange}
          value={state.pw}
        />
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;
