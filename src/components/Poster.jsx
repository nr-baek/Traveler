import React, { useState } from "react";
import { DatePicker, Space, Modal } from "antd";
import styled from "styled-components";
import "antd/dist/antd.css";
import { CheckSquareOutlined, PlusCircleOutlined } from "@ant-design/icons";
const PosterTemp = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin: 40px 20px 20px 20px;
    box-shadow: 0 15px 50px rgb(0 0 0 / 5%);
  }
  .form-container {
    height: 310px;
    /* position: relative; */
  }
  .poster-btn {
    position: absolute;
    top: 2px;
    right: 20px;
    z-index: 200;
    /* margin: 8px 0 0 30px; */
    padding: 0 20px;
    color: #8a60fd;
    outline: none;
    font-size: 20px;
    border: none;
    cursor: pointer;
    /* border: 2px solid #8a60fd; */
    /* border-radius: 3px */
    background: transparent;
    /* background: #8a60fd; */
    /* color: #fff; */
    /* padding: 0.5rem; */
    transition: 0.3s;
    /* &:hover {
      background: #8a60fd;
    } */
  }
  .title-container,
  .radio-container,
  .date-container,
  .list-container {
    display: flex;
    justify-content: center;
    padding: 2rem 2rem;
    padding-right: 5rem;
    border-bottom: 1px solid lightgray;
    position: relative;
  }
  /* h1 {
    padding: 0;
    font-size: 1.5rem;
    color: #afa9dd;
    position: absolute;
  } */
  .title-container h2,
  .date-container h2,
  .radio-container h2,
  .list-container h2 {
    margin: 0;
    flex-grow: 1;
    padding-left: 3rem;
    font-size: 20px;
    color: #999;
  }
  .title-container input,
  .list-container input {
    flex-grow: 2;
    border: 2px solid lightgrey;
    border-radius: 5px;
    width: 50px;
    height: 40px;
    padding: 5px;
    outline: none;
  }
  .list-container input {
    margin-right: 2.7rem;
    margin-top: 2px;
  }
  .select-form {
    padding-right: 1.2rem;
  }
  .select-container {
    height: 50px;
    width: 400px;
    box-shadow: -10px -10px 15px rgba(255, 255, 255, 0.55),
      10px 10px 15px rgba(70, 70, 70, 0.12);
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: auto;
    border-radius: 50px;
  }
  .radio-container h2 {
    padding-top: 10px;
  }
  input[type="radio"] {
    display: none;
  }
  input[type="radio"]:checked + label {
    box-shadow: inset -10px -10px 15px rgba(255, 255, 255, 0.55),
      inset 10px 10px 15px rgba(70, 70, 70, 0.12);
  }
  .select-container label {
    font-family: "Poppins", sans-serif;
    font-size: 17px;
    padding: 10px 25px;
    font-weight: 600;
    color: #303030;
    border-radius: 25px;
  }
  .list-container {
    position: relative;
  }
  .list-container .add-list-btn {
    position: absolute;
    top: 1.9rem;
    right: 4.5rem;
    border-radius: 30px;
    border: 1px solid #fff;
    background: transparent;
    overflow: hidden;
    margin: -1px;
  }
  .show-container {
    height: 170px;
    width: 100%;
  }
  .show-container .show-ul {
    position: relative;
    /* background-color: #f6f5fb; */
    background-color: #fff;
    height: 170px;
    overflow: auto;
  }
  .show-container .show-li {
    list-style: none;
    padding: 10px;
    width: 100%;
    /* background-color: #f6f5fb; */
    background-color: #fff;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
    transition: transform 0.5s;
    padding-left: 5rem;
  }
  /* .show-container .show-li:hover {
    transform: scale(1.1);
    z-index: 100;
    background-color: #e3e2ff;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    color: #999;
  } */
  .show-container .show-li .show-number-span {
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background: #e3e2ff;
    color: #fff;
    display: inline-block;
    border-radius: 50%;
    margin-right: 10px;
    font-size: 1rem;
  }
  .show-container .show-li .show-des-span {
    font-size: 1rem;
    padding-left: 3rem;
  }
`;

const Poster = ({
  title,
  partyType,
  desc,
  context,
  onChange,
  onSelectChange,
  onRadioChange,
  onListAdd,
  onSubmit,
  history,
}) => {
  const { RangePicker } = DatePicker;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    history.push("/");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <PosterTemp>
      <div className="container">
        <div className="form-container">
          <form onSubmit={onSubmit}>
            <div className="title-container">
              <h2>Travel Title</h2>
              <input
                name="title"
                type="text"
                placeholder="Tell me the name of your trip"
                value={title}
                onChange={onChange}
                // maxLength="16"
                autoComplete="off"
              />
            </div>
            <div className="date-container">
              <h2>Date</h2>
              <div class="select-form">
                <Space direction="vertical" size={12}>
                  <RangePicker onChange={onSelectChange} />
                </Space>
              </div>
            </div>
            <div className="radio-container">
              <h2>Check me</h2>
              <div className="select-container">
                <input
                  type="radio"
                  name="partyType"
                  value="alone"
                  checked={partyType.alone}
                  onChange={onRadioChange}
                  id="aloneId"
                />
                <label htmlFor="aloneId">Alone</label>
                <input
                  type="radio"
                  name="partyType"
                  value="friend"
                  checked={partyType.friend}
                  onChange={onRadioChange}
                  id="friendId"
                />
                <label htmlFor="friendId">Friends</label>
                <input
                  type="radio"
                  name="partyType"
                  value="family"
                  checked={partyType.family}
                  onChange={onRadioChange}
                  id="familyId"
                />
                <label htmlFor="familyId">Family</label>
                <input
                  type="radio"
                  name="partyType"
                  value="couple"
                  checked={partyType.couple}
                  onChange={onRadioChange}
                  id="coupleId"
                />
                <label htmlFor="coupleId">Couple</label>
              </div>
            </div>
            <button className="poster-btn" onClick={showModal}>
              + <span>Add Post</span>
            </button>
            <Modal
              title="Basic Modal"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Go to Home Page?</p>
            </Modal>
          </form>
        </div>
        <div className="list-container">
          <h2>Planner</h2>
          <input
            className="add-list-input"
            type="text"
            name="desc"
            onChange={onChange}
            value={desc}
            autoComplete="off"
            placeholder="Please write your plan"
          />
          <button
            className="add-list-btn"
            style={{
              outline: "none",
              // border: "1px solid lightgray",
            }}
            onClick={onListAdd}
            type="button"
          >
            <CheckSquareOutlined
              style={{
                fontSize: "43px",
                color: "lightgray",
                outline: "none",
              }}
            />
          </button>
        </div>
        <div className="show-container">
          <ul class="show-ul">
            {context.map((desc, key) => (
              <li key={key} className="show-li">
                <span className="show-number-span">{key + 1}</span>
                <span className="show-des-span">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PosterTemp>
  );
};
export default Poster;
