import React from "react";
import { Card, Header } from "semantic-ui-react";

const Homepage = (props) => {
  return (
    <>
      <Header as="h1" color="blue" textAlign="center">
        Welcome to Booking
      </Header>
      <Card.Group centered>
        <Card
          onClick={(e) => {
            props.org_Login(e);
          }}
          color="blue"
          style={{ width: "40vw" }}
        >
          <Card.Content textAlign="center">
            <Card.Header>Organization Login</Card.Header>
            <Card.Description>
              Click here if you are an Organization
            </Card.Description>
          </Card.Content>
        </Card>
        <Card
          onClick={(e) => {
            props.client_Login(e);
          }}
          color="blue"
          style={{ width: "40vw" }}
        >
          <Card.Content textAlign="center">
            <Card.Header>Client Login</Card.Header>
            <Card.Description>
              Click here if you are a customer
            </Card.Description>
          </Card.Content>
        </Card>
      </Card.Group>
    </>
  );
};

export default Homepage;
