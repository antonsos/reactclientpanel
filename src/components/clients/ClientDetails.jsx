import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//firebase redux
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

//bootstrap
import {
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { faWrench } from "@fortawesome/free-solid-svg-icons";
//COMPONENTS
import Spinner from "../layout/Spinner";

export class ClientDetails extends Component {

  state = {
    showBalanceUpdate: false,
    balanceUpdateAmount: ''
  }

  onChange = (e) => this.setState({[e.target.name]: e.target.value})

  balanceSubmit = (e) => {
    e.preventDefault();

    const { client, firestore } = this.props;
    const { balanceUpdateAmount } = this.state;

    const clientUpdate = {
      balance: parseFloat(balanceUpdateAmount)
    }

    firestore.update({collection: 'clients', doc: client.id}, clientUpdate)
  }

  onDeleteClient = () => {
    const { client, firestore, history } = this.props;
    firestore.delete({collection: 'clients', doc: client.id})
      .then(() => history.push('/'))
  }

  render() {

    const { client } = this.props;
    const { showBalanceUpdate, balanceUpdateAmount } = this.state;

    let balanceForm = '';

    //balance form display
    if(showBalanceUpdate) {
      balanceForm = (
        <Form onSubmit={this.balanceSubmit}>
          <FormGroup>
            <Row>
              <Col md={8} sm={8}>
                <Input
                  type="text"
                  name="balanceUpdateAmount"
                  id="balanceUpdateAmount"
                  placeholder="Enter new balance"
                  value={balanceUpdateAmount}
                  onChange={this.onChange}
                />
              </Col>
              <Col md={4} sm={4}>
                <Button type="submit" size='mb' color="dark">
                  Update
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      );
    } else {
      balanceForm = null;
    }

    if(client) {
      return (
        <div>
          <Row className="mb-4">
            <Col md={6}>
              <Link to="/">
                <Button color="link">
                  <FontAwesomeIcon icon={faArrowCircleLeft} /> Back To Dashboard
                </Button>
              </Link>
            </Col>
            <Col md={6}>
              <Link to={`/client/edit/${client.id}`}>
                <Button color="group" className="float-right">
                  Edit
                </Button>
              </Link>
              <Button
                color="danger"
                className="float-right"
                onClick={this.onDeleteClient}
              >
                Delete
              </Button>
            </Col>
          </Row>
          <Card>
            <CardHeader>{client.firstName} {client.lastName}</CardHeader>
            <CardBody>
              <Row>
                <Col md={8} sm={8}>
                  <CardTitle>
                    Claent ID:{' '}<span>{client.id}</span>
                  </CardTitle>
                </Col>
                <Col md={4} sm={4}>
                  <CardSubtitle className='card-text'>
                    Balance: <span className={
                      client.balance > 0 ? 'text-danger' : 'text-success'
                    }>${parseFloat(client.balance).toFixed(2)}</span>
                    <Button
                      size="sm"
                      color="link"
                      onClick={() => this.setState({
                        showBalanceUpdate: !showBalanceUpdate
                      })}
                    >
                      <FontAwesomeIcon icon={faWrench} />
                    </Button>
                  </CardSubtitle>
                  {showBalanceUpdate && balanceForm}
                </Col>
              </Row>
              <ListGroup>
                <ListGroupItem>Contact Email:{' '} {client.email}</ListGroupItem>
                <ListGroupItem>Contact Phone:{' '} {client.phone}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

ClientDetails.propTypes = {
  firebase: PropTypes.object.isRequired
}

export default compose(
  firestoreConnect(props => [
    { collection: "clients", storeAs: "client", doc: `${props.match.params.id}` }
  ]),
  connect(({firestore: {ordered}}, props) => ({
    client: ordered.client && ordered.client[0]
  }))
)(ClientDetails);
