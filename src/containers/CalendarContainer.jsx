import React, { useEffect, useState } from "react";
import Calendar from "../components/Calendar";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { initializeMypost, postload } from "../redux/modules/post";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingBox from "../components/common/LoadingBox";

function trasformDate(date) {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}
const CalendarContainer = () => {
  // const date = useSelector(({ calendar }) => ({
  //   date: calendar.date,
  // }));
  // const posts = [
  //   {
  //     id: 1,
  //     writer: "nara",
  //     title: "한슬이와 나라의 부산 여행",
  //     type: "친구",
  //     startDate: "2021-01-16",
  //     endDate: "2021-01-18",
  //     mm: "01",
  //     days: "3",
  //     desc: [
  //       "1일차 해운대",
  //       "2일차 광안리",
  //       "3일차 수변공원",
  //       "4일차 자갈치 시장",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     writer: "nara",
  //     title: "한슬이와 나라의 관악산 등산",
  //     type: "친구",
  //     startDate: "2021-03-01",
  //     endDate: "2021-03-15",
  //     mm: "02",
  //     days: "15",
  //     desc: ["1일차 관악산 등반"],
  //   },
  // ];
  const { posts, postloading, token } = useSelector(({ post, auth }) => ({
    posts: post.getpost,
    postloading: post.postloading,
    token: auth.token,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postload(token));
    dispatch(initializeMypost());
  }, [dispatch, token]);

  function markingDays(currDay) {
    const curr = currDay.format("YYYY-MM-DD");
    // console.log("curr", curr);
    // 2021-01-09
    // console.log("posts[0].startDate", posts[0].startDate);
    // console.log(curr === posts[0].startDate);
    for (let i = 0; i < posts.length; i++) {
      // post작성일자 Date객체로 가져옴. Thu Feb 11 2021 09:00:00 GMT+0900 (대한민국 표준시)
      const postDay = new Date(posts[i].startDate);
      // console.log("curr", curr);
      // console.log("post", postDay);
      for (let j = 0; j < +posts[i].days; j++) {
        // post작성일자 + j일 더함. (days가 3이면 +0일, +1일 +2일)
        // console.log(j);
        const logDay = new Date(
          postDay.setDate(postDay.getDate() + (j === 0 ? 0 : 1))
        );
        // console.log("log", logDay);
        // 1613001600000
        // console.log("getToday 적용 log", getToday(logDay));
        if (curr === trasformDate(logDay)) {
          // console.log("curr과 logday와 i,j", curr, trasformDate(logDay), i, j);
          // console.log(curr);
          if (j === 0) {
            if (+posts[i].days === 1 || currDay.day() === 6) {
              console.log("oneday");
              console.log(curr);

              return (
                <div
                  className={"marking oneday " + posts[i].travelType}
                  title={posts[i].title}
                >
                  {posts[i].title}
                </div>
              );
            }
            return (
              <div className={"marking startday " + posts[i].travelType}>
                {posts[i].title}
              </div>
            );
          }
          console.log(currDay.day() === 0, j < posts[i].days - 1);
          if (currDay.day() === 0 && j < posts[i].days - 1) {
            return (
              <div className={"marking startday " + posts[i].travelType}>
                {posts[i].title}
              </div>
            );
          }
          // console.log(curr, trasformDate(logDay));
          return <div className={"marking plus " + posts[i].travelType}></div>;
        }
      }
    }
  }
  const [date, setDate] = useState(moment());
  function changeMonth(newMonth) {
    setDate(newMonth);
  }
  return postloading ? (
    <Calendar date={date} changeDate={changeMonth} markingDays={markingDays} />
  ) : (
    <LoadingBox>
      <LoadingOutlined
        style={{
          fontSize: "80px",
          color: "#8a60fd",
          filter: "drop-shadow(0 0 0.5rem #af93fa)",
        }}
      />
    </LoadingBox>
  );
  // return <div>hi</div>;
};
export default CalendarContainer;
