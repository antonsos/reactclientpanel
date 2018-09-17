import React from "react";

//COMPONENTS
import Sidebar from "./Sidebar";
import Clients from "../clients/Clients";

//bootstrap
import { Row, Col } from "reactstrap";

const Dashboard = () => {
  return (
    <Row>
      <Col md={10}>
        <Clients />
      </Col>
      <Col md={2}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Dashboard;
