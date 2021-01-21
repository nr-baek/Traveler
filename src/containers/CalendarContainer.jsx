import React, { useState } from "react";
import Calendar from "../components/Calendar";
import moment from "moment";

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
    // console.log("posts[0].startDate", posts[0].startDate);
    // console.log(curr === posts[0].startDate);
    for (let i = 0; i < posts.length; i++) {
      const postDay = posts[i].startDate;
      for (let j = 0; j < posts[i].days; j++) {
        // postDay + j + "" 이렇게 2021-02-01 + 1 하는 방법 없나..
        if (curr === postDay) {
          console.log("is true day");
          return <div className="marking">{posts[i].title}</div>;
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
