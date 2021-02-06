import React from 'react';
import io from 'socket.io-client';

import './chatView.css';
import { connect } from 'react-redux';
import { getSessionInfo, getActiveUsers } from '../redux/actions';
import SingleMessage from './SigleMessage';
import TextSendBar from './TextSendBar';
import {} from '../'

const PORT = process.env.PORT || 4000;
const ENDPOINT = 'http://localhost:4000/';
// const ENDPOINT = 'https://cryptic-journey-31189.herokuapp.com/';
class ChatView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
      messageList: [],
      currentUsers: [],
      activeChatUser: '',
    };
  }

  componentDidMount() {
    if (this.props.username) {
      this.setSocketAndListen();
      this.props.getActiveUsers();
    } else {
      this.props.getSessionInfo();
    }
  }

  componentDidUpdate() {
    if (!this.socket && this.props.username) {
      this.setSocketAndListen();
      this.props.getActiveUsers();
    }
  }

  setSocketAndListen = () => {
    this.socket = io.connect(ENDPOINT, {
      query: `username=${this.props.username}&fullname=${this.props.fullname}`,
    });

    this.socket.on('message_received', (message) => {
      this.addMessage(
        message.text,
        true,
        this.getCurrentTimeString(),
        message.fromUser,
        this.props.username
      );
    });
  };

  addMessage = (text, incoming, time, fromUser, toUser) => {
    const currentMessage = {
      text,
      incoming,
      time,
      fromUser,
      toUser,
    };

    const messageList = [...this.state.messageList, currentMessage];
    this.setState({ messageList });
  };

  sendMessage = (text, toUser) => {
    console.log(
      'send Message from:',
      this.props.username,
      ' to:',
      this.state.activeChatUser
    );

    
    let src = '../piece-of-cake-611.ogg';
    let audio = new Audio(src);
    audio.play();
    this.socket.emit('message_sent', {
      text,
      toUser,
      fromUser: this.props.username,
    });
  };

  getCurrentTimeString = () => {
    var time = new Date();
    return time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };

  handleUserActivate = (activeChatUser) => {
    this.setState({ activeChatUser });
  };

  handleSend = (messageText) => {
    this.addMessage(
      messageText,
      false,
      this.getCurrentTimeString(),
      this.props.username,
      this.state.activeChatUser
    );
    this.sendMessage(messageText, this.state.activeChatUser);
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
                        {' '}
                        <i className="fa fa-search" aria-hidden="true"></i>{' '}
                      </button>
                    </span>{' '}
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                {Object.keys(this.props.activeUsers).map((user) =>
                  this.props.username !== user ? (
                    <div
                      className={
                        user === this.state.activeChatUser
                          ? 'chat_list active_chat'
                          : 'chat_list'
                      }
                      onClick={() => this.handleUserActivate(user)}
                    >
                      <div className="chat_people">
                        <div className="chat_img">
                          {' '}
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="profile image"
                          />{' '}
                        </div>
                        <div className="chat_ib">
                          <h5>
                            {this.props.activeUsers[user]}{' '}
                            <span className="chat_date">Dec 25</span>
                          </h5>
                        </div>
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
            <div className="mesgs">
              <div className="msg_history">
                {this.state.messageList.map((message) =>
                  message.fromUser === this.state.activeChatUser ||
                  message.toUser === this.state.activeChatUser ? (
                    <SingleMessage
                      text={message.text}
                      incoming={message.incoming}
                      time={message.time}
                    />
                  ) : null
                )}
              </div>
              {this.state.activeChatUser ? (
                <TextSendBar
                  sendHandler={(messageText) => this.handleSend(messageText)}
                />
              ) : null}
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
    activeUsers: state.chatReducer.activeUsers,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getSessionInfo: () => dispatch(getSessionInfo()),
  getActiveUsers: () => dispatch(getActiveUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatView);
