import React, { Component } from "react";
import io from "socket.io-client";

const addMessage = function(data) {
  console.log(data);
  this.setState({ messages: [...this.state.messages, data] });
  console.log(this.state.messages);
};

class Interactive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      message: "",
      messages: []
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", this.state.message);
    };

    this.socket = io("http://127.0.0.1:5000/");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });
  }

  render() {
    return (
      <div className="container">
        <div>
          <div>
            <div>
              <div>
                <div>Global Chat</div>
                <hr />
                <div>
                  {this.state.messages.map(message => {
                    return (
                      <div>
                        {message.author}: {message.message}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={ev =>
                      this.setState({ username: ev.target.value })
                    }
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Message"
                    value={this.state.message}
                    onChange={ev => this.setState({ message: ev.target.value })}
                  />
                  <br />
                  <button onClick={this.sendMessage}>Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Interactive;
