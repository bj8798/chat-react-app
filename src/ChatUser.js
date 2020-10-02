import React from "react";
import "./chatView.css";

const ChatUser = (props) => {
  return (
    <div className="chat_list">
      <div className="chat_people">
        <div className="chat_img">
          {" "}
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />{" "}
        </div>
        <div className="chat_ib">
          <h5>
            {props.fullname} <span className="chat_date">{props.date}</span>
          </h5>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
