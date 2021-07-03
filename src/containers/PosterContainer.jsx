import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  changePostFiled,
  checkPostFiled,
  contextList,
  postadd,
  changePostDate,
  changePostDay,
  initializePostDescription,
  initializePostRadioBox,
  initializePostForm,
} from "../redux/modules/post";
import Poster from "../components/Poster";
const PosterContainer = ({ history }) => {
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
  const context = useSelector((state) => state.post.setPost.context);
  const dispatch = useDispatch();
  const [startDate, endDate] = date;

  const getType = (type) => {
    for (const boolean in type) {
      // console.log(`${travelType}: ${type[travelType]}`);
      if (type[boolean] === true) {
        return boolean;
      }
    }
  };
  const travelType = getType(partyType);
  const onChange = useCallback(
    (e) => {
      if (e.keyCode === 13) return;
      const { name, value } = e.target;
      dispatch(
        changePostFiled({
          form: "setPost",
          key: name,
          value,
        })
      );
    },
    [dispatch]
  );
  // useCallback 적용하기
  function onSelectChange(_, dateStrings) {
    dispatch(changePostDate(dateStrings)); // [start, end]
    const startDay = moment(dateStrings[0]);
    const endDay = moment(dateStrings[1]);
    const days = moment.duration(endDay.diff(startDay)).asDays() + 1 + "";
    dispatch(changePostDay(days));
  }
  const onRadioChange = useCallback(
    (e) => {
      if (e.keyCode === 13) return;
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
    },
    [dispatch]
  );
  const onListAdd = useCallback(
    (e) => {
      if (desc === "") return;
      if (e.keyCode === 13) return;
      const List = [];
      List.push(desc);
      console.log(List);
      // 새로운 배열 state를 만드는 액션을 보낸다.
      dispatch(contextList(List));
      // desc redux state를 초기화 한다.
      dispatch(initializePostDescription());
    },
    [dispatch, desc]
  );
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        postadd({
          title,
          writer,
          travelType,
          startDate,
          endDate,
          days,
          context,
        })
      );

      dispatch(initializePostForm("setPost"));
    },
    [dispatch, title, writer, travelType, startDate, endDate, days, context]
  );
  useEffect(() => {
    dispatch(initializePostForm("setPost"));
  }, [dispatch]);
  return (
    <Poster
      history={history}
      title={title}
      partyType={partyType}
      desc={desc}
      context={context}
      onChange={onChange}
      onSelectChange={onSelectChange}
      onRadioChange={onRadioChange}
      onListAdd={onListAdd}
      onSubmit={onSubmit}
    />
  );
};
export default withRouter(PosterContainer);
