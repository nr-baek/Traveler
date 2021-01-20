import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";

const Poster = ({ history }) => {
  const [text, setText] = useState({
    title: "",
    desc: "",
  });

  const [partyType, setPartyType] = useState({
    alone: false,
    friend: false,
    family: false,
    couple: false,
  });

  const { title, desc } = text;
  const { alone, friend, family, couple } = partyType;

  const writer = useSelector((state) => state.auth.token);

  const onChange = (e) => {
    const { name, value } = e.target;
    setText({
      ...text,
      [name]: value,
    });
  };

  const onRadioChange = (e) => {
    const { value, checked } = e.target;
    const initalState = {
      alone: false,
      friend: false,
      family: false,
      couple: false,
    };
    setPartyType({
      ...initalState,
      [value]: checked,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:4000/posts?writer=${writer}`
      );
      const id = res.data.length + 1;
      await axios.post("http://localhost:4000/posts/", {
        id,
        writer,
        title,
        type: partyType,
        desc,
      });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
    console.log("서버로 간다간다 뿅간다~");
  };

  return (
    <>
      <h2>poster</h2>
      <form onSubmit={onSubmit}>
        <input
          name="title"
          type="text"
          placeholder="title"
          value={title}
          onChange={onChange}
        />
        <br />
        <br />
        <label>
          <input
            type="radio"
            name="partyType"
            value="alone"
            checked={alone}
            onChange={onRadioChange}
          />
          Alone
        </label>
        <label>
          <input
            type="radio"
            name="partyType"
            value="friend"
            checked={friend}
            onChange={onRadioChange}
          />
          Friends
        </label>
        <label>
          <input
            type="radio"
            name="partyType"
            value="family"
            checked={family}
            onChange={onRadioChange}
          />
          Family
        </label>
        <label>
          <input
            type="radio"
            name="partyType"
            value="couple"
            checked={couple}
            onChange={onRadioChange}
          />
          Couple
        </label>
        <br />
        <br />
        <textarea
          name="desc"
          id=""
          cols="70"
          rows="2"
          onChange={onChange}
          value={desc}
        />
        <br />
        <br />
        <button>ADD</button>
      </form>
    </>
  );
};

export default withRouter(Poster);
