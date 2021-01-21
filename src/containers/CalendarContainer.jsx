import React, { useState } from "react";
import Calendar from "../components/Calendar";
import moment from "moment";
function getToday(date) {
  let year = date.getFullYear();
  let month = ("0" + (1 + date.getMonth())).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  return year + "-" + month + "-" + day;
}
const CalendarContainer = () => {
  // const date = useSelector(({ calendar }) => ({
  //   date: calendar.date,
  // }));
  const posts = [
    {
      id: 1,
      writer: "nara",
      title: "한슬이와 나라의 부산 여행",
      type: "친구",
      startDate: "2021-02-11",
      endDate: "2021-02-14",
      mm: "02",
      days: "4",
      desc: [
        "1일차 해운대",
        "2일차 광안리",
        "3일차 수변공원",
        "4일차 자갈치 시장",
      ],
    },
    {
      id: 2,
      writer: "nara",
      title: "한슬이와 나라의 관악산 등산",
      type: "친구",
      startDate: "2021-03-01",
      endDate: "2021-03-01",
      mm: "02",
      days: "1",
      desc: ["1일차 관악산 등반"],
    },
  ];
  function markingDays(currDay) {
    const curr = currDay.format("YYYY-MM-DD");
    // console.log("curr", curr);
    // 2021-01-09
    // console.log("posts[0].startDate", posts[0].startDate);
    // console.log(curr === posts[0].startDate);
    for (let i = 0; i < posts.length; i++) {
      // post작성일자 Date객체로 가져옴. Thu Feb 11 2021 09:00:00 GMT+0900 (대한민국 표준시)
      const postDay = new Date(posts[i].startDate);
      // console.log("post", postDay);
      for (let j = 0; j < posts[i].days; j++) {
        // post작성일자 + j일 더함. (days가 3이면 +0일, +1일 +2일)
        const logDay = new Date(postDay.setDate(postDay.getDate() + j));
        console.log("log", logDay);
        // 1613001600000
        console.log("getToday 적용 log", getToday(logDay));
        console.log("curr과 logday", curr, getToday(logDay));
        if (curr === getToday(logDay)) {
          if (j === 0) {
            return <div className="marking">{posts[i].title}</div>;
          }
          console.log("is true day");
          return <div className="marking"></div>;
        }
      }
    }
  }
  const [date, setDate] = useState(moment());
  function changeMonth(newMonth) {
    setDate(newMonth);
  }
  return (
    <Calendar date={date} changeDate={changeMonth} markingDays={markingDays} />
  );
  // return <div>hi</div>;
};
export default CalendarContainer;
