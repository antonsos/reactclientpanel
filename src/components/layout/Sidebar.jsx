import React from "react";
import { Link } from "react-router-dom";

//fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//bootstrap
import { Button } from "reactstrap";

const Sidebar = () => {
  return (
    <Link to="/client/add">
      <Button color="success">
        <FontAwesomeIcon icon={faPlus} /> New
      </Button>
    </Link>
  );
};

export default Sidebar;
