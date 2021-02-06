import React from "react";
import { Redirect } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import "../index.css";
import { connect } from "react-redux";
import { doLogin } from "../redux/actions";

class LoginView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      redirect: null,
    };
  }

  goToSignIn = () => {
    this.setState({ redirect: "/signup" });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    if (this.props.fullname) {
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
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() =>
                this.props.doLogin(this.state.email, this.state.password)
              }
              onTouchStart={() =>
                this.props.doLogin(this.state.email, this.state.password)
              }
            >
              Let me in :)
            </Button>{" "}
            <Button
              variant="outline-info"
              onClick={this.goToSignIn}
              onTouchStart={() => this.setState({ count: "Its clicked" })}
            >
              I am New Here !
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  fullname: state.loginReducer.fullname,
});

export const mapDispatchToProps = (dispatch) => ({
  doLogin: (username, password) => dispatch(doLogin(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
