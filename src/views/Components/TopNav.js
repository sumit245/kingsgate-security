import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../../css/clientformstyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ClientForm from '../Components/ClientForm'
import FactoryForm from "./FactoryForm";

function TopNav() {
  const [show, setShow] = useState(false);
  const [showFactory, setShowFactory] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowFactory = () => setShowFactory(true);
 

  return (
    <>
      <nav
        className="navbar navbar-static-top"
        role="navigation"
        style={{ marginBottom: 0 }}
      >
        <div className="navbar-header">
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li style={{ padding: "20px" }}>
            <span className="m-r-sm text-muted welcome-message">
              Welcome to KingsGate Security.
            </span>
          </li>
          <DropdownButton
            className="dropdown"
            title="Add"
            style={{ marginTop: 14 }}
          >
            <Dropdown.Item onClick={handleShow}>Client</Dropdown.Item>
            <Dropdown.Item onClick={handleShowFactory}>Factory</Dropdown.Item>
            <Dropdown.Item href="/">Subscription</Dropdown.Item>
          </DropdownButton>
          <li className="dropdown">
            <a
              className="dropdown-toggle count-info"
              data-toggle="dropdown"
              href="/"
            >
              <i className="fa fa-bell" />{" "}
              <span className="label label-primary">8</span>
            </a>
          </li>
          <li>
            <a href="/fornotfor">
              <i className="fa fa-sign-out" /> Log out
            </a>
          </li>
        </ul>
      </nav>

      <Modal show={show} onHide={handleClose} size="lg" >
       <ClientForm />
      </Modal>

      <Modal show={showFactory} onHide={handleClose} size="lg">
        <FactoryForm></FactoryForm>
      </Modal>
    </>
  );
}

export default TopNav;
