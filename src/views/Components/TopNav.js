import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/clientformstyle.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Switch } from "@material-ui/core";
import {clientData} from '../../models/data'

function TopNav() {
  const [show, setShow] = useState(false);
  const [showFactory, setShowFactory] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShowFactory = () => setShowFactory(true);
  const handleCloseFactory = () => setShowFactory(false);
  var count = 2;
  const addFields = () => {
    var container = document.getElementById("addFactory");

    container.appendChild(document.createTextNode("Factory" + count));
    var input = document.createElement("input");
    input.type = "text";
    input.name = "Factory+1";
    input.className = "col-sm-12";
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
    
    count += 1;
  };

  return (
    <>
      <nav
        className="navbar navbar-static-top"
        role="navigation"
        style={{ marginBottom: 0 }}
      >
        <div className="navbar-header">
          <form
            role="search"
            className="navbar-form-custom"
            action="search_results.html"
          >
            <div className="form-group">
              <input
                type="text"
                placeholder="Search for something..."
                className="form-control"
                name="top-search"
                id="top-search"
              />
            </div>
          </form>
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
              href="#"
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
        <Modal.Body>
          <div className="form-style-10">
            <h1>Add Client</h1>
            <form method="post">
              <div className="section">
                <span>1</span>Personal Details
              </div>
              <div className="form-group row inner-wrap">
                <label className="col-md-6 col-form-label">
                  Client Name{" "}
                  <input className="col-sm-12" type="text" name="cname" />
                </label>
                <label className="col-md-6 col-form-label">
                  Phone Number{" "}
                  <input className="col-sm-12" type="text" name="phno" />
                </label>
                <label className="col-md-6 col-form-label">
                  Mobile Number{" "}
                  <input className="col-sm-12" type="text" name="mobno" />
                </label>
                <label className="col-md-6 col-form-label">
                  Email Address{" "}
                  <input className="col-sm-12" type="email" name="eid" />
                </label>
              </div>
              <div className="section">
                <span>2</span>Billing Details
              </div>
              <div className="form-group row inner-wrap">
                <label className="col-md-6 col-form-label">
                  Sector{" "}
                  <input className="col-sm-12" type="text" name="flatnum" />
                </label>
                <label className="col-md-6 col-form-label">
                  Block <input className="col-sm-12" type="text" name="sect" />
                </label>
                <label className="col-md-6 col-form-label">
                  Address<input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label">
                  Company Name <input type="text" name="compname" />
                </label>
                <label className="col-md-6 col-form-label">
                  GST Applicable
                  <Switch onChange={()=>{document.getElementById('gstinput').disabled=false}} />
                </label>
                <label className="col-md-6 col-form-label">
                  GST Number{" "}
                  <input className="col-sm-12" disabled type="text" id='gstinput' name="gstnum" />
                </label>
                
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showFactory} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="form-style-10">
            <h1>Add Factory</h1>
            <form method="post">
              <div className="form-group row inner-wrap" id="addFactory">
                <label className="col-md-6 col-form-label">
                  Owner Name
                  <select>
                    {clientData.map((data,key)=>{
                      <option key={key}value={data.firstName} >{data.firstName}</option>
                    }
                    )}
                    
                  </select>
                </label>
                <label className="col-md-6 col-form-label">
                  Mobile Number
                  <input className="col-sm-12" type="text" name="mobnum" />
                </label>
                <label className="col-md-6 col-form-label">
                  Factory Name
                  <input className="col-sm-12" type="text" name="factoryname" />
                </label>
                <label className="col-md-6 col-form-label">
                  Sector
                  <input className="col-sm-12" type="text" name="sector" />
                </label>
                <label className="col-md-6 col-form-label">
                  Block
                  <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label">
                  Close Date
                  <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label"> 
                  Address{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    name="factoryaddress"
                    id="factoryaddress"
                  />
                </label>
                
                <Button
                  name="more"
                  title="More"
                  variant="secondary"
                  className="mx-3"
                  onClick={addFields}
                  style={{width:'auto',height:30,marginTop:25}}
                >
                  Add Factory
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFactory}>
            Reset
          </Button>
          <Button variant="primary" onClick={handleCloseFactory}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleCloseFactory}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopNav;
