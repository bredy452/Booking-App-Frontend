import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Label,
  Icon,
} from "semantic-ui-react";
import Org_userRegister from "./Org_userRegister";
import ClientRegister from "./ClientRegister";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      clientRegister: false,
      org_userRegister: false,
    };
  }

  handleFlipClient = (e, flip) => {
    this.setState({
      clientRegister: flip,
    });
  };

  handleFlipOrg = (e, flip) => {
    this.setState({
      org_userRegister: flip,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.state.org_user) {
      fetch(this.props.baseUrl + "/users/org_user/login", {
        method: "POST",
        body: JSON.stringify({
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
          this.props.checkLogin(data.status, data.data);
        })
        .catch((error) => console.error);
    } else if (this.props.state.client_user) {
      fetch(this.props.baseUrl + "/users/client/login", {
        method: "POST",
        body: JSON.stringify({
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
          this.props.checkLogin(data.status, data.data);
        })
        .catch((error) => console.error);
    }
  };

  render() {
    return (
      <>
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="Black">
              <Icon name="calendar alternate outline" />
              <Header.Content>Booking App</Header.Content>
            </Header>
            <Form size="large" onSubmit={(e) => this.handleSubmit(e)}>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="username"
                  name="username"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.username}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.password}
                />
                <Button color="red" fluid size="large">
                  Login
                </Button>
              </Segment>
            </Form>
            {this.props.state.org_user && this.props.state.login_button && (
              <Button as="div" labelPosition="right">
                <Button
                  color="blue"
                  onClick={(e) => {
                    this.setState({
                      org_userRegister: !this.state.org_userRegister,
                    });
                  }}
                >
                  Click here to Register
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  Organization
                </Label>
              </Button>
            )}

            {this.props.state.client_user && this.props.state.login_button && (
              <Button as="div" labelPosition="right">
                <Button
                  color="blue"
                  onClick={(e) => {
                    this.setState({
                      clientRegister: !this.state.clientRegister,
                    });
                  }}
                >
                  Click here to Register
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  Client
                </Label>
              </Button>
            )}
            {this.state.clientRegister && this.props.state.login_button && (
              <ClientRegister
                clientRegister={this.state.clientRegister}
                baseUrl={this.props.baseUrl}
                handleFlipClient={(e) => {
                  this.handleFlipClient(e);
                }}
              />
            )}

            {this.state.org_userRegister && this.props.state.login_button && (
              <Org_userRegister
                org_userRegister={this.state.org_userRegister}
                baseUrl={this.props.baseUrl}
                handleFlipOrg={(e) => {
                  this.handleFlipOrg(e);
                }}
              />
            )}
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
