import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { RadioGroup, Radio } from "react-radio-group";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "../../css/clientformstyle.css";
function addFields() {
  // Number of inputs to create
  var number = document.getElementById("member").value;
  // Container <div> where dynamic content will be placed
  var container = document.getElementById("container");
  // Clear previous contents of the container
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }
  for (var i = 0; i < number; i++) {
    // Append a node with a random text
    container.appendChild(document.createTextNode("Member " + (i + 1)));
    // Create an <input> element, set its type and name attributes
    var input = document.createElement("input");
    input.type = "text";
    input.name = "member" + i;
    container.appendChild(input);
    // Append a line break
    container.appendChild(document.createElement("br"));
  }
}
function TopNav() {
  const [show, setShow, showNotifs, setShowNotifs] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <nav
        className="navbar navbar-static-top"
        role="navigation"
        style={{ marginBottom: 0 }}
      >
        <div className="navbar-header">
          <a
            className="navbar-minimalize minimalize-styl-2 btn btn-primary "
            href="#"
          >
            <i className="fa fa-bars" />{" "}
          </a>
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
          <li className="dropdown">
            <Button variant="primary" onClick={handleShow}>
              Add
            </Button>
          </li>
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

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Body>
          <div className="form-style-10">
            <h1>Add Client</h1>
            <form method="post">
              <div className="section">
                <span>1</span>Personal Details
              </div>
              <div className="form-group row inner-wrap">
                <label className="col-md-6 col-form-label">
                  First Name{" "}
                  <input className="col-sm-12" type="text" name="fname" />
                </label>
                <label className="col-md-6 col-form-label">
                  Last Name{" "}
                  <input className="col-sm-12" type="text" name="lname" />
                </label>
                <label className="col-md-6 col-form-label">
                  Phone Number{" "}
                  <input className="col-sm-12" type="text" name="phno" />
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
                  Flat Number{" "}
                  <input className="col-sm-12" type="text" name="flatnum" />
                </label>
                <label className="col-md-6 col-form-label">
                  Sector <input className="col-sm-12" type="text" name="sect" />
                </label>
                <label className="col-md-6 col-form-label">
                  Block <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label">
                  Company Name <input type="text" name="compname" />
                  <a href="#" className="mx-2">
                    Add More Companies
                  </a>
                </label>
                <label className="col-md-6 col-form-label">
                  Payment Method{" "}
                  <input className="col-sm-12" type="email" name="paymethod" />
                  <a href="#" className="mx-2">
                    Add Method(s)
                  </a>
                </label>
                <div className="form-group row inner-wrap">
                  <label className="col-md-6 col-form-label" htmlFor='gstInput '>GST Applicable</label>
                <RadioGroup
                  aria-label="anonymous"
                  name="anonymous"
                  value={false}
                  row
                  id='gstInput'
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                    
                  />
                </RadioGroup>

                </div>
                              </div>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopNav;
