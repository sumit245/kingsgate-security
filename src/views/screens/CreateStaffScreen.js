import React, { Component } from "react";
import "jquery/dist/jquery";
import SideNavBar from "../Components/SideNavBar";
import Footer from "../Components/Footer";
import TopNav from "../Components/TopNav";
import $ from "jquery";
import "../../css/staffstyle.css";
import axios from "axios";
export default class CreateStaffScreen extends Component {
  constructor(props) {
    super(props);
    this.onStaffNameChanged = this.onStaffNameChanged.bind(this);
    this.onStaffMobChanged = this.onStaffMobChanged.bind(this);
    this.onStaffAddChanged = this.onStaffAddChanged.bind(this);
    this.onStaffEmailChanged = this.onStaffEmailChanged.bind(this);
    this.addStaff=this.addStaff.bind(this)
    this.state = {
      staffName: "",
      staffMob: "",
      staffAdd: "",
      staffEmail: "",
      staffData:[]
    };
  }
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();

    // Select/Deselect checkboxes
    var checkbox = $('table tbody input[type="checkbox"]');
    $("#selectAll").click(function () {
      if (this.checked) {
        checkbox.each(function () {
          this.checked = true;
        });
      } else {
        checkbox.each(function () {
          this.checked = false;
        });
      }
    });
    checkbox.click(function () {
      if (!this.checked) {
        $("#selectAll").prop("checked", false);
      }
    });
    axios
    .get('http://localhost:4000/kingsgate/staff/')
    .then((res)=>{
        this.setState({staffData:res.data})
    })
    .catch((err)=>{
        console.error(err);
    })
  }
  onStaffNameChanged(e) {
    this.setState({ staffName: e.target.value });
  }
  onStaffMobChanged(e) {
    this.setState({ staffMob: e.target.value });
  }
  onStaffAddChanged(e) {
    this.setState({ staffAdd: e.target.value });
  }
  onStaffEmailChanged(e) {
    this.setState({ staffEmail: e.target.value });
  }
  addStaff() {
    const newStaff = {
      staff_name: this.state.staffName,
      mobile_number: this.state.staffMob,
      address: this.state.staffAdd,
      email_id: this.state.staffEmail,
    };
    console.log('Added')
    axios
      .post("http://localhost:4000/kingsgate/addstaff/", newStaff)
      .then((res) => {
        // this.setState({ staff: res.data });
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <>
        <SideNavBar />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <div className="row border-bottom">
            <TopNav />
          </div>
          <div>
            <div className="container">
              <div className="table-responsive">
                <div className="table-wrapper">
                  <div className="table-title">
                    <div className="row">
                      <div className="col-sm-6">
                        <h2>
                          Manage <b>Staff</b>
                        </h2>
                      </div>
                      <div className="col-sm-6 ml-6">
                        <a
                          href="#deleteEmployeeModal"
                          className="btn btn-danger"
                          data-toggle="modal"
                        >
                          <i className="fa fa-minus-circle"></i>{" "}
                          <span>Delete</span>
                        </a>
                        <a
                          href="#addEmployeeModal"
                          className="btn btn-primary"
                          data-toggle="modal"
                        >
                          <i className="fa fa-plus-circle"></i>{" "}
                          <span>Add New Employee</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>
                          <span className="custom-checkbox">
                            <input type="checkbox" id="selectAll" />
                            <label htmlFor="selectAll" />
                          </span>
                        </th>
                        <th>Name</th>
                        <th>Mobile</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.state.staffData.map((data,key)=>{
                            return(
                                <tr key={key}>
                                <td>
                                  <span className="custom-checkbox">
                                    <input
                                      type="checkbox"
                                      id="checkbox1"
                                      name="options[]"
                                      defaultValue={1}
                                    />
                                    <label htmlFor="checkbox1" />
                                  </span>
                                </td>
                                <td>{data.staff_name}</td>
                                <td>{data.mobile_number}</td>
                                <td>{data.address}</td>
                                <td>{data.email_id}</td>
                                <td>
                                  <a href="#editEmployeeModal" data-toggle="modal">
                                    <i
                                      className="fa fa-pencil"
                                      data-toggle="tooltip"
                                      title="Edit"
                                    ></i>
                                  </a>
                                  <a href="#deleteEmployeeModal" data-toggle="modal">
                                    <i
                                      className="fa fa-trash"
                                      data-toggle="tooltip"
                                      title="Delete"
                                    ></i>
                                  </a>
                                </td>
                              </tr>
                            )
                        })}
                     
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
        <div id="addEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Add Employee</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={this.state.staffName}
                      onChange={this.onStaffNameChanged}
                    />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input
                      type="phone"
                      className="form-control"
                      required
                      value={this.state.staffMob}
                      onChange={this.onStaffMobChanged}
                    />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      required
                      value={this.state.staffAdd}
                      onChange={this.onStaffAddChanged}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      required
                      value={this.state.staffEmail}
                      onChange={this.onStaffEmailChanged}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-success"
                    defaultValue="Add"
                    onClick={this.addStaff}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="editEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Edit Employee</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Mobile</label>
                    <input type="phone" className="form-control" required />
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      required
                      defaultValue={""}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" required />
                  </div>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-info"
                    defaultValue="Save"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="deleteEmployeeModal" className="modal fade">
          <div className="modal-dialog">
            <div className="modal-content">
              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Delete Employee</h4>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete these Records?</p>
                  <p className="text-warning">
                    <small>This action cannot be undone.</small>
                  </p>
                </div>
                <div className="modal-footer">
                  <input
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    defaultValue="Cancel"
                  />
                  <input
                    type="submit"
                    className="btn btn-danger"
                    defaultValue="Delete"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
