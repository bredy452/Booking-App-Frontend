import React, { Component } from "react";
import { Label } from "semantic-ui-react";

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  logout = (e) => {
    fetch(this.props.baseUrl + "/users/logout", {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.message);
        alert("You have successfully logged out");
      });
  };
  render() {
    return (
      <>
        <Label
          as="a"
          color="red"
          tag
          onClick={(e) => {
            this.props.logout(e);
          }}
        >
          Logout
        </Label>
      </>
    );
  }
}
