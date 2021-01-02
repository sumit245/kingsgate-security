import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import axios from "axios";
import $ from "jquery";
import { Dropdown } from "react-bootstrap";
import ClientTabs from "./ClientTabs";
import 'datatables.net-dt'
import 'datatables.net-buttons-dt'
import 'datatables.net-select-dt'

class TaskTab extends Component {
  constructor(props) {
    super(props);
    this.state={
      tasks:[],
      paymentTasks:[],
      shiftoneTasks:[],
      shifttwoTasks:[]
    }
  }
  componentDidMount() {
      // Activate tooltip
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
      .get('http://localhost:4000/kingsgate/tasks/')
      .then((res)=>{
        this.setState({tasks:res.data})
        console.log(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <span className="custom-checkbox">
                  <input type="checkbox" id="selectAll" />
                  <label htmlFor="selectAll" />
                </span>
              </th>
              <th>Staff</th>
              <th>Factory</th>
              <th>Group</th>
              <th>Sector</th>
              <th>Block</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((data,key)=>{
              return(
                <tr key={key}>
                <td>
                  <span className="custom-checkbox">
                    <input
                      type="checkbox"
                      id="checkbox2"
                      name="options[]"
                      defaultValue={1}
                    />
                    <label htmlFor="checkbox2" />
                  </span>
                </td>
                <td>Rai Bahadur</td>
                <td>Ingineous</td>
                <td>XDF</td>
                <td>2</td>
                <td>B</td>
                <td>Complete</td>
                <td>
                  <span className='px-2'>
                  <a
                    href="#editEmployeeModal"
                    data-toggle="modal"
                  >
                    <i
                      className="fa fa-pencil"
                      data-toggle="tooltip"
                      title="Edit"
                    ></i>
                  </a>
                  </span>
                  <span>
                  <a
                    href="#deleteEmployeeModal"
                    // className="delete"
                    data-toggle="modal"
                  >
                    <i
                      className="fa fa-trash"
                      data-toggle="tooltip"
                      title="Delete"
                    ></i>
                  </a>
                  </span>
  
                </td>
              </tr>
                

              )
            })
          }
           
          </tbody>
        </table>
        {/* <div className="clearfix">
          <div className="hint-text">
            Showing <b>5</b> out of <b>25</b> entries
          </div>
          <ul className="pagination">
            <li className="page-item disabled">
              <a href="#">Previous</a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                1
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                2
              </a>
            </li>
            <li className="page-item active">
              <a href="#" className="page-link">
                3
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                4
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                5
              </a>
            </li>
            <li className="page-item">
              <a href="#" className="page-link">
                Next
              </a>
            </li>
          </ul>
        </div> */}

        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form>
                <div class="modal-header">
                  <h4 class="modal-title">Edit Employee</h4>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-hidden="true"
                  >
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" required />
                  </div>
                  <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" required />
                  </div>
                  <div class="form-group">
                    <label>Address</label>
                    <textarea class="form-control" required></textarea>
                  </div>
                  <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" required />
                  </div>
                </div>
                <div class="modal-footer">
                  <input
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    value="Cancel"
                  />
                  <input type="submit" class="btn btn-info" value="Save" />
                </div>
              </form>
            </div>
          </div>
        </div>
     
	<div id="deleteEmployeeModal" class="modal fade">
		<div class="modal-dialog">
			<div class="modal-content">
				<form>
					<div class="modal-header">						
						<h4 class="modal-title">Delete Employee</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div class="modal-body">					
						<p>Are you sure you want to delete these Records?</p>
						<p class="text-warning"><small>This action cannot be undone.</small></p>
					</div>
					<div class="modal-footer">
						<input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" />
						<input type="submit" class="btn btn-danger" value="Delete" />
					</div>
				</form>
			</div>
		</div>
    </div>
     </div>
    );
  }
}

export default class GroupsTable extends Component {
  constructor(props) {
    super(props);
    this.handleGroupName=this.handleGroupName.bind(this)
    this.handleStaffName=this.handleStaffName.bind(this)
    this.onAddTask=this.onAddTask.bind(this)
    this.state = {
      groupData: [],
      factoryData: [],
      staffData: [],
      groupNames: "",
      staffname:""
    };
  }
handleGroupName(e){
  this.setState({groupNames:e.target.value})
}
handleStaffName(e){
  this.setState({staffname:e.target.value})
}
onAddTask(e){
  console.log('Tassk')
}
  componentDidMount() {
    axios
      .get("http://localhost:4000/kingsgate/groups/")
      .then((res) => {
        this.setState({ groupData: res.data });
        console.log(`${this.state.groupData}`)
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/kingsgate/staff/")
      .then((res) => {
        this.setState({ staffData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onCreateTask() {
    let modal = document.getElementById("createTaskModal");
    modal.style.display = "block";
  }
  closeAddModal() {
    let modal = document.getElementById("createTaskModal");
    modal.style.display = "none";
  }

  render() {
    return (
      <div className="container mx-auto my-4">
        <div className="row mx-2" style={{ justifyContent: "flex-start" }}>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              Assign Task
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onCreateTask}>Payment</Dropdown.Item>
              <Dropdown.Item onClick={this.onCreateTask}>Shift 1</Dropdown.Item>
              <Dropdown.Item onClick={this.onCreateTask}>Shift 2</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="py-2 ">
          <ClientTabs>
            <div label="Payment">
              <TaskTab />
            </div>
            <div label="Shift 1"></div>
            <div label="Shift 2"></div>
            <div label="Pending"></div>
          </ClientTabs>
        </div>
        <div
          id="createTaskModal"
          style={{ width: 500 }}
          className="modal modal-open"
        >
          <div className="modal-content">
            <div className="modal-body px-0 py-0">
              <div className="form-style-10 ">
                <form>
                  <div className="form-group row inner-wrap" id="addFactory">
                    <label className="col-md-6 col-form-label">
                      Group
                      <select>
                        {/* {console.log(`${this.state.groupData}`)} */}
                        {/* <option><input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/></option> */}
                        
                      {this.state.groupData.map((data,key)=>{
                        return(
                          <option key={key} value={data.group_name}>{data.group_name}</option>  

                        )
                                
                      })}
                      </select>
                    </label>
                    <label className="col-md-6 col-form-label">
                      Staff
                      <select>
                        {/* {console.log(`${this.state.groupData}`)} */}
                        {/* <option><input type="text" placeholder="Search.." id="myInput" onkeyup="filterFunction()"/></option> */}
                        
                      {this.state.groupData.map((data,key)=>{
                        return(
                          <option key={key} value={data.group_name}>{data.group_name}</option>  

                        )
                                
                      })}
                      </select>
                      
                    </label>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                form="nameform"
                value="Submit"
                className="btn btn-primary"
                onClick={this.onAddTask}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.closeAddModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
