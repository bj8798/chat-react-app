import React from "react";
import io from "socket.io-client";

import "./chatView.css";
import { connect } from "react-redux";
import { doLogin } from "./redux/actions";
import SingleMessage from "./SigleMessage";

const ENDPOINT = "http://localhost:4000/";
class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: "",
      messageList: [
        {
          text: "Demo message",
          incoming: true,
          time: "10:00 PM",
        },
        {
          text: "Demo message1",
          incoming: false,
          time: "10:00 PM",
        },
        {
          text: "Demo message2",
          incoming: true,
          time: "10:00 PM",
        },
      ],
    };
  }

  componentDidMount() {
    this.socket = io.connect(ENDPOINT, {
      query: `username=${this.props.username}`,
    });

    this.socket.on("message_received", (message) => {
      this.addMessage(message.text, true, "12:00");
    });
  }

  addMessage = (text, incoming, time) => {
    const currentMessage = {
      text,
      incoming,
      time,
    };

    const messageList = [...this.state.messageList, currentMessage];
    this.setState({ messageList });
  };

  sendMessage = (text, toUser) => {
    console.log("indsie sendMessage");
    this.socket.emit("message_sent", {
      text,
      toUser,
      fromUser: this.props.username,
    });
  };

  handleSend = () => {
    this.addMessage(this.state.messageText, false, "10:10 PM");
    this.sendMessage(this.state.messageText, "nikunj");
    this.setState({ messageText: "" });
  };

  render() {
    return (
      <div className="container">
        <h3 className="text-center">Quick Chat</h3>
        <div className="messaging">
          <div className="inbox_msg">
            <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search"
                    />
                    <span className="input-group-addon">
                      <button type="button">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true"></i>{" "}
                      </button>
                    </span>{" "}
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                <div className="chat_list active_chat">
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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>

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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
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
                        {this.props.fullname}{" "}
                        <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {this.state.messageList.map((message) => (
                  <SingleMessage
                    text={message.text}
                    incoming={message.incoming}
                    time={message.time}
                  />
                ))}
              </div>

              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    onChange={(event) => {
                      this.setState({ messageText: event.target.value });
                    }}
                    value={this.state.messageText}
                  />
                  <button
                    className="msg_send_btn"
                    type="button"
                    onClick={this.handleSend}
                  >
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fullname: state.loginReducer.fullname,
    username: state.loginReducer.username,
  };
};

const mapDispatchToProps = (dispatch) => ({
  doLogin: (username, password) => dispatch(doLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
