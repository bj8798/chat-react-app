import React from 'react';

import './chatView.css';

class TextSendBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messageText: '',
    };
  }

  handleSend = () => {
    console.log('at handle send:', this.state.messageText);
    this.props.sendHandler(this.state.messageText);
    this.setState({ messageText: '' });
  };

  render() {
    return (
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
    );
  }
}

export default TextSendBar;
