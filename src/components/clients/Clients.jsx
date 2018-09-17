import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//firebase redux
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

//bootstrap
import { Row, Col, Table, Button } from "reactstrap";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

//COMPONENTS
import Spinner from '../layout/Spinner';

export class Clients extends Component {
  state = {
    totalOwed: null,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { clients } = nextProps;

    if(clients) {
      const total = clients.reduce((total, client) => (
        total + parseFloat(client.balance.toString())
      ), 0)

      return { totalOwed: total }
    }

    return null;
  }
  

  render() {
    const { clients } = this.props;
    const { totalOwed } = this.state;

    if (clients) {
      return (
        <div>
          <Row>
            <Col md={6}>
              <h2>
                <FontAwesomeIcon icon={faUsers} /> Clients {clients.length}
              </h2>
            </Col>
            <Col md={6}>
              <h5 className="text-right text-secondary">
                Total Owed{" "}
                <span className="text-primary">
                  ${parseFloat(totalOwed).toFixed(2)}
                </span>
              </h5>
            </Col>
          </Row>
          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Balance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clients.map(
                ({ id, firstName, lastName, email, phone, balance }, i) => (
                  <tr key={id}>
                    <td>
                      {firstName} {lastName}
                    </td>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>${parseFloat(balance).toFixed(2)}</td>
                    <td>
                      <Link to={`/client/${id}`}>
                        <Button color="secondary">
                          <FontAwesomeIcon icon={faArrowCircleRight} /> Details
                        </Button>
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Clients.PropTypes = {
  firestore: PropTypes.object.isRequired,
  clients: PropTypes.array
}

export default compose(
  firestoreConnect([{collection: 'clients'}]),
  connect((state, props) => ({
    clients: state.firestore.ordered.clients
  }))
)(Clients);
