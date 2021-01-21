import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  changePostFiled,
  checkPostFiled,
  postadd,
  initializePostRadioBox,
  initializePostForm,
} from "../redux/modules/post";
import Text from "./Text";

const Poster = ({ history }) => {
  const { title, desc } = useSelector(({ post }) => ({
    title: post.setPost.title,
    desc: post.setPost.desc,
  }));

  const partyType = useSelector(({ post }) => ({
    alone: post.setPost.partyType.alone,
    friend: post.setPost.partyType.friend,
    family: post.setPost.partyType.family,
    couple: post.setPost.partyType.couple,
  }));

  const writer = useSelector((state) => state.auth.token);
  const date = useSelector((state) => state.post.setPost.date);
  const days = useSelector((state) => state.post.setPost.days);

  const dispatch = useDispatch();

  const { alone, friend, family, couple } = partyType;
  const [startDate, endDate] = date;

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changePostFiled({
        form: "setPost",
        key: name,
        value,
      })
    );
  };

  const onRadioChange = (e) => {
    const { value, checked } = e.target;

    dispatch(
      initializePostRadioBox({
        setPost: "setPost",
        type: "partyType",
      })
    );

    dispatch(
      checkPostFiled({
        form: "setPost",
        value,
        checked,
      })
    );
  };

  const getType = (type) => {
    for (const boolean in type) {
      // console.log(`${travelType}: ${type[travelType]}`);
      if (type[boolean] === true) {
        return boolean;
      }
    }
  };

  const travelType = getType(partyType);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postadd({ title, desc, writer, travelType, startDate, endDate, days })
    );
    history.push("/");
    console.log("서버로 간다간다 뿅간다~");
  };

  useEffect(() => {
    dispatch(initializePostForm("setPost"));
  }, [dispatch]);

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
        <Text />
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
        <input type="text" name="desc" />
        <br />
        <br />
        <button>ADD</button>
      </form>
    </>
  );
};

export default withRouter(Poster);
