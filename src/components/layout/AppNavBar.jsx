import React, { Component } from "react";
import { Link } from "react-router-dom";

//bootstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container
} from "reactstrap";

export class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="primary" dark className="mb-4" expand="md">
          <Container>
            <Link to="/" className="navbar-brand">
              ClientPanel
            </Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link
                    to="/dashboard"
                    style={{
                      textDecoration: "none",
                      color: "#fff"
                    }}
                  >
                    Dashboard
                  </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default AppNavBar;
