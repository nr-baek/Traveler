import React from "react";
import styled from "styled-components";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import moment from "moment";

const CalendarForm = styled.div`
  .Calendar {
    padding: 0 20px 20px 20px;
    background: #fff;
    height: 580px;
    margin: 40px 20px 20px 20px;
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.05);

    .selectMonth {
      float: left;
      padding: 10px;
      width: 200px;
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
        background: linear-gradient(-45deg, #f3f3f8 50%, #fafaff 50%);
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
        }
      }
    }
  }
`;

const Calendar = (props) => {
  function generate() {
    // today를 props.date로 변경합니다.
    const today = moment();
    const startWeek = props.date.clone().startOf("month").week();
    const endWeek =
      props.date.clone().endOf("month").week() === 1
        ? 53
        : props.date.clone().endOf("month").week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((n, i) => {
              let current = props.date
                .clone()
                .week(week)
                .startOf("week")
                .add(n + i, "day");
              let isToday =
                today.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "today"
                  : "";
              let isSelected =
                props.date.format("YYYYMMDD") === current.format("YYYYMMDD")
                  ? "selected"
                  : "";
              let isGrayed =
                current.format("MM") === props.date.format("MM")
                  ? ""
                  : "grayed";

              // .box에 changeDate 이벤트를 달아줍니다.
              return (
                <div
                  className={`box ${isSelected} ${isGrayed} ${isToday}`}
                  key={i}
                  onClick={() => props.changeDate(current)}
                >
                  <span className={`text`}>{current.format("D")}</span>
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
          <button>
            <LeftOutlined />
          </button>
          <span className="showMonth">Jan 2021</span>
          <button>
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
