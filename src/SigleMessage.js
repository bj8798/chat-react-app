import React from "react";
import "./chatView.css";

const SingleMessage = (props) => {
  console.log("props.incoming:", props.incoming);
  if (props.incoming) {
    return (
      <div className="incoming_msg">
        <div className="incoming_msg_img">
          {" "}
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />{" "}
        </div>
        <div className="received_msg">
          <div className="received_withd_msg">
            <p>{props.text}</p>
            <span className="time_date">{props.time}</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="outgoing_msg">
        <div className="sent_msg">
          <p>{props.text}</p>
          <span className="time_date">{props.time}</span>{" "}
        </div>
      </div>
    );
  }
};

export default SingleMessage;
