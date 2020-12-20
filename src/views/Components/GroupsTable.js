import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import * as jzip from "jszip";
import "pdfmake";
import $ from "jquery";
import { Button } from "react-bootstrap";
import { clientData } from "../../models/data";

import { groupData as stockData } from "../../models/data";

window.JSZip = jzip;

export default class GroupsTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(document).ready(function () {
      $("#example").DataTable({
        searching: false,
        dom: "Bfrtip",
        buttons: [
          {
            text: "Assign Group",
            action: function (e, dt, node, config) {
              let modal = document.getElementById("myModal");
              modal.style.display = "block";
            },
          },
          {
            text: '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>',
            action: function (e, dt, node, config) {},
          },
        ],
        responsive: true,
        select: true,
        scrollX: true,
      });
    });
  }

  render() {
    return (
      <div className="container mx-auto my-4">
        <table id="example" className="display table" data={stockData}>
          <thead className="table-dark">
            <tr>
              <th>Group Name</th>
              <th>Members</th>
              <th>Staff</th>
              <th>Task</th>
              <th>Sector</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
          </tr>
          <tbody>
            {stockData.map((data, key) => {
              return (
                <tr key={key}>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.groupName}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.firstName + " " + data.lastName}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {"Ram Singh"}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <select>
                      <option>CCTV</option>
                      <option>Night Patrol</option>
                      <option>Both</option>

                    </select>
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.block}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          id="myModal"
          style={{ overflow: "hidden" }}
          className="modal modal-open"
        >
          <div className="form-style-10">
            <h1>Assign Group</h1>
            <form method="post">
              <div className="form-group row inner-wrap" id="addFactory">
                <label className="col-md-6 col-form-label">
                  Client
                  <select>
                    {clientData.map((data, key) => {
                      <option key={key} value={data.firstName}>
                        {data.firstName}
                      </option>;
                    })}
                  </select>
                </label>
                <label className="col-md-6 col-form-label">
                  Mobile Number
                  <input className="col-sm-12" type="text" name="mobnum" />
                </label>
                <label className="col-md-6 col-form-label">
                  Staff
                  <select>
                    <option>Ram Bahadur</option>
                    <option>Shyam Prakash</option>
                    <option>Nathu Singh</option>
                    <option>Abdul Malik</option>
                  </select>
                </label>

                <label className="col-md-6 col-form-label">
                  Task
                  <select>
                    <option>CCTV</option>
                    <option>Night Patrol</option>
                    <option>Both</option>
                  </select>
                </label>
                <label className="col-md-6 col-form-label">
                  Group
                  <select>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                  </select>
                </label>
              </div>
            </form>
            <Button variant="secondary">Reset</Button>
            <Button variant="primary">Save Changes</Button>
            <Button variant="danger">Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}
