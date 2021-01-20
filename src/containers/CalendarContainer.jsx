import React from "react";
import Calendar from "../components/Calendar";
import { changeDate } from "../redux/modules/calendar";
import { useSelector } from "react-redux";

const CalendarContainer = () => {
  const date = useSelector(({ calendar }) => ({
    date: calendar.date,
  }));
  console.log(date);
  return <Calendar date={date} changeDate={changeDate} />;
  // return <div>hi</div>;
};

export default CalendarContainer;
