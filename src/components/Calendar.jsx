import React from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
const CalendarForm = styled.div`
  .Calendar {
    padding: 0 20px 20px 20px;
    background: #fff;
    height: 580px;
    margin: 40px 20px 20px 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    .selectMonth {
      align-self: center;
      padding: 10px 10px 0 10px;
      width: 300px;
      font-size: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #888;
      border-radius: 4px;
      button {
        cursor: pointer;
        outline: none;
        display: inline-flex;
        background: #fff;
        font-size: 1.3rem;
        padding: 4px;
        border: none;
      }
      span.showMonth {
        cursor: pointer;
        padding: 4px 12px;
        font-weight: bold;
        .month {
          font-size: 1.2rem;
          color: #7a6bff;
          margin-right: 10px;
        }
      }
    }
    .day {
      font-size: 1rem;
      color: #666;
      font-weight: bold;
      width: 100%;
      border-top: 1px solid #ddd;
      padding: 10px 0;
      margin-top: 10px;
      display: flex;
      justify-content: space-around;
    }
    .row {
      /* background: pink; */
      border-top: 1px solid #ddd;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .box.grayed {
        background: repeating-linear-gradient(
          45deg,
          #f7f7fc,
          #f7f7fc 2px,
          #ffffff 2px,
          #ffffff 14px
        );
        color: #999;
      }
      .box {
        border-left: 1px solid #ddd;
        width: 100%;
        height: 80px;
        vertical-align: bottom;
        padding: 5px;
        .text {
          font-size: 0.9rem;
          margin-left: 5px;
        }
        .marking {
          height: 20px;
          font-size: 0.8rem;
          background: #b869cc;
          color: #fff;
          position: absolute;
        }
      }
    }
    .row > div:first-child {
      border-left: none;
    }
  }
`;
const Calendar = ({ date, changeDate, markingDays }) => {
  function generate() {
    const startWeek = date.clone().startOf("month").week();
    const endWeek =
      date.clone().endOf("month").week() === 1
        ? 53
        : date.clone().endOf("month").week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = date
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");
              let isGrayed =
                current.format("MM") === date.format("MM") ? "" : "grayed";
              return (
                <div className={`box ${isGrayed}`} key={i}>
                  <span className={`text`}>{current.format("D")}</span>
                  {/* <div className="marking">
                    {week}
                    {i}
                  </div> */}
                  {markingDays(current)}
                </div>
              );
            })}
        </div>
      );
    }
    return calendar;
  }
  return (
    <CalendarForm>
      <div className="Calendar">
        <div className="selectMonth">
          <button onClick={() => changeDate(date.clone().subtract(1, "month"))}>
            <LeftOutlined />
          </button>
          <span className="showMonth">
            <span className="month">{date.format("MMM")}</span>
            {date.format("YYYY")}
          </span>
          <button onClick={() => changeDate(date.clone().add(1, "month"))}>
            <RightOutlined />
          </button>
        </div>
        <div className="body">
          <div className="day">
            <div className="box">
              <span className="text">SUN</span>
            </div>
            <div className="box">
              <span className="text">MON</span>
            </div>
            <div className="box">
              <span className="text">TUE</span>
            </div>
            <div className="box">
              <span className="text">WED</span>
            </div>
            <div className="box">
              <span className="text">THU</span>
            </div>
            <div className="box">
              <span className="text">FRI</span>
            </div>
            <div className="box">
              <span className="text">SAT</span>
            </div>
          </div>
          {generate()}
        </div>
      </div>
    </CalendarForm>
  );
};
export default Calendar;
