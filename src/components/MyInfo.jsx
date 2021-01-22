import React, { useState } from "react";
import styled from "styled-components";
import { CloseOutlined, PushpinOutlined, CarOutlined } from "@ant-design/icons";
import Modal from "./common/Modal";

const ModalPopup = styled.div`
  .modalTitle {
    font-size: 1.5rem;
    font-weight: bold;
    color: #5626c5;
    margin-top: 20px;
  }
  .modalDate {
    font-size: 1.3rem;
  }
  .descBox {
    font-size: 1.4rem;
    width: 600px;
    display: flex;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-left: 1rem;
  }
  .postDesc {
    margin-left: 10px;
  }
`;

const InfoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  text-align: center;
  flex-direction: column;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  margin: 10px 10px 10px 30px;
  width: 250px;
  height: 193px;
  background: #fff;

  cursor: pointer;
  &:hover {
    background: #ececff;
    transition: background-color 0.2s;
  }
`;

const InfoContentBlock = styled.div`
  margin-bottom: 30px;
`;

const PinIcon = styled.div`
  margin: 20px 20px 10px 20px;
  font-size: 1.5rem;
  color: #724fe7;
`;

const InfoTitle = styled.h2`
  margin: 0 0 10px 0;
  font-size: 1.2rem;
  font-weight: 900;
  color: #555;
`;
const InfoDate = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;
const MyInfo = ({ removePost, posts, id, title, startDate, endDate }) => {
  const [visible, setVisible] = useState(false);
  const showPost = () => {
    setVisible(true);
  };
  const hidePost = () => {
    setVisible(false);
    console.log("hide");
  };
  // const showkPostDays = posts.filter(post => post.id === id)[0].days;
  const showPostDescs = posts.filter((post) => post.id === id)[0].desc;
  // console.log(showkPostDays);
  console.log(showPostDescs);

  return (
    <>
      <InfoBlock onClick={showPost}>
        <PinIcon>
          <PushpinOutlined />
        </PinIcon>

        <CloseOutlined
          onClick={() => removePost(id)}
          style={{
            position: "absolute",
            right: "4%",
            top: "4%",
            fontSize: "1.3rem",
            color: "#444",
            cursor: "pointer",
            outline: "none",
          }}
        />
        <InfoContentBlock>
          <InfoTitle>
            <i class="fas fa-shuttle-van"></i>
            {title}
          </InfoTitle>
          <InfoDate>
            {startDate} ~ {endDate}
          </InfoDate>
        </InfoContentBlock>
      </InfoBlock>
      {visible && (
        <Modal>
          <ModalPopup>
            <div
              style={{
                width: "100vw",
                height: "100vh",
                background: "rgba(62, 60, 70, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
            >
              <div
                style={{
                  width: "800px",
                  height: "500px",
                  zIndex: "100",
                  padding: "30px",
                  background: "#fff",
                  position: "relative",
                  overflowY: "auto",
                  color: "#444",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CloseOutlined
                  className="closeBtn"
                  onClick={hidePost}
                  style={{
                    border: "none",
                    background: "none",
                    outline: "none",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    padding: "20px",
                    paddingTop: "0",
                    position: "absolute",
                    color: "#783dff",
                    right: "0",
                  }}
                />
                <p className="modalTitle">
                  <CarOutlined style={{ marginRight: "10px" }} />
                  {title}
                </p>
                <p className="modalDate">
                  날짜: {startDate} ~ {endDate}
                </p>
                {showPostDescs.map((showPostDesc, index) => (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div className="descBox">
                      <div className="dayIndex">{index + 1} 일차 : </div>
                      <div className="postDesc">{showPostDesc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ModalPopup>
        </Modal>
      )}
    </>
  );
};
export default MyInfo;
