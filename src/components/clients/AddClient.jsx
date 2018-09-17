import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//firebase redux
// import { connect } from "react-redux";
// import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//bootstrap
import {
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";

export class AddClient extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: ""
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = e => {
    e.preventDefault();

    const newClient = this.state;
    const { firestore, history } = this.props;

    if (newClient.balance === "") newClient.balance = "0";

    firestore
      .add({ collection: "clients" }, newClient)
      .then(() => history.push("/"));
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={6}>
            <Link to="/">
              <Button color="link">
                <FontAwesomeIcon icon={faArrowCircleLeft} /> Back To Dashboard
              </Button>
            </Link>
          </Col>
        </Row>
        <Card>
          <CardHeader>Add Client</CardHeader>
          <CardBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="firstName">FirstName</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter firstName"
                  minLength={2}
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">LastName</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter lastName"
                  minLength={2}
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  required
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </FormGroup>
              <FormGroup>
                <Label for="phone">Phone number</Label>
                <Input
                  type="phone"
                  name="phone"
                  id="phone"
                  minLength={10}
                  placeholder="333-333-3333"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </FormGroup>
              <FormGroup>
                <Label for="balance">Balance</Label>
                <Input
                  type="text"
                  name="balance"
                  id="balance"
                  placeholder="Enter balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                />
              </FormGroup>
              <Button block color="primary">
                Submit
              </Button>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
