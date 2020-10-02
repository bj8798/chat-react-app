import React from "react";
import { Redirect } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import "./LoginView.css";
import { connect } from "react-redux";
import { doSignUp } from "./redux/actions";

class SignUpView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      fullname: "",
    };
  }

  render() {
    if (this.props.fullname) {
      console.log("full name setted:", this.props.fullname);
      return <Redirect to="/chat" />;
    }

    return (
      <div className="form-div">
        <Container fluid="md">
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={this.state.email}
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                value={this.state.fullname}
                onChange={(event) => {
                  this.setState({ fullname: event.target.value });
                }}
                placeholder="Enter Full Name"
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() =>
                this.props.doSignUp(
                  this.state.email,
                  this.state.password,
                  this.state.fullname
                )
              }
              onTouchStart={() =>
                this.props.doSignUp(
                  this.state.email,
                  this.state.password,
                  this.state.fullname
                )
              }
            >
              Sign Me Up !!
            </Button>{" "}
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fullname: state.loginReducer.fullname,
});

const mapDispatchToProps = (dispatch) => ({
  doSignUp: (username, password, fullname) =>
    dispatch(doSignUp(username, password, fullname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpView);
