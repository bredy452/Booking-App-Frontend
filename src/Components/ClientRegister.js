import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";

export default class ClientRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      phone_number: "",
      username: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  register = (e, flip) => {
    e.preventDefault();
    fetch(this.props.baseUrl + "/users/client/register", {
      method: "POST",
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        phone_number: this.state.phone_number,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.props.handleFlipClient(flip);
        console.log(data.message);
      })
      .catch((error) => console.error);
  };

  render() {
    return (
      <>
        <Form>
          <Form.Input
            error={{
              content: "Please enter your first name",
              pointing: "below",
            }}
            fluid
            label="First Name"
            placeholder="First Name"
            id="first_name"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.first_name}
          />
          <Form.Input
            error="Please enter your phone number"
            fluid
            label="Phone Number"
            placeholder="Phone Number"
            id="phone_number"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.phone_number}
          />
          <Form.Input
            error="Please enter your last name"
            fluid
            label="Last Name"
            placeholder="Last Name"
            id="last_name"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.last_name}
          />
          <Form.Input
            error="Please enter a username"
            fluid
            label="Username"
            placeholder="Username"
            id="username"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.username}
          />
          <Form.Input
            error="Please enter your email address"
            fluid
            label="Email Address"
            placeholder="Email Address"
            id="email"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.email}
          />
          <Form.Input
            error="Please enter a password"
            fluid
            label="Password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              this.handleChange(e);
            }}
            value={this.state.password}
          />
          <Button
            primary
            onClick={(e) => {
              this.register(e, !this.props.clientRegister);
            }}
          >
            Register
          </Button>
        </Form>
      </>
    );
  }
}
