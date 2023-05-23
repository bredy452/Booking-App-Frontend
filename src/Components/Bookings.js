import React, { Component } from "react";
import { Header, Table } from "semantic-ui-react";

export default class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        {this.props.clients.map((item, color) => {
          return (
            <Table color={"red"} celled padded>
              <Table.Header>
                <Table.Row key={item._id}>
                  <Table.HeaderCell singleLine>
                    Client's First Name
                  </Table.HeaderCell>
                  <Table.HeaderCell>Client's Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Client's Phone Number</Table.HeaderCell>
                  <Table.HeaderCell>Client's Email</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {item.first_name}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{item.last_name}</Table.Cell>
                  <Table.Cell singleLine>{item.phone_number}</Table.Cell>
                  <Table.Cell textAlign="right">{item.email}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          );
        })}
      </>
    );
  }
}
