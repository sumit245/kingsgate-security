import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import * as jzip from "jszip";
import { Dropdown } from "react-bootstrap";
import axios from "axios";
import FactoryForm from "./FactoryForm";
import "pdfmake";
import $ from "jquery";

window.JSZip = jzip;

export default class FactoryTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      factoryData: [],
      userdata:[],
    };
  }

  componentDidMount() {
    const self = this;
    axios
      .get("http://localhost:4000/kingsgate/factories/")
      .then((res) => {
        this.setState({ factoryData: res.data });
        var table = $("#factoryTable").DataTable({
          searching: false,
          dom: "Bfrtip",
          buttons: [],
          responsive: true,
          select: true,
          scrollX: true,
        });
        table.on("select", function (e, dt, type, indexes) {
          axios
            .get("http://localhost:4000/kingsgate/factories/")
            .then((response) => {
              self.setState({ userdata: response.data[indexes] });
            })
            .catch(function (error) {
              console.log(error);
            });
          let modal = document.getElementById("factoryDetails");
          modal.style.display = "block";
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addClickedEvent() {
    let modal = document.getElementById("factoryModal");
    modal.style.display = "block";
  }

  deleteClient = () => {
    const self = this;
    axios
      .delete(
        "http://localhost:4000/kingsgate/delete_factory/" +
          this.state.userdata._id
      )
      .then((res) => {
        console.log("Student successfully deleted!");
        self.setState({
          clients: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="container mx-auto my-4">
        <div className="row mx-2" style={{ justifyContent: "flex-start" }}>
          <button
            title="Add"
            className="btn btn-secondary my-2"
            onClick={this.addClickedEvent}
          >
            Add{" "}
          </button>
          <Dropdown style={{ marginLeft: 2, marginTop: 8 }}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <i className="fa fa-ellipsis-v"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onSelect={this.exportData}>Export</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Import</Dropdown.Item>
              <Dropdown.Item onSelect={this.deleteClient}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <table id="factoryTable" className="display table">
          <thead className="table-dark">
            <tr>
              <th>Factory Name</th>
              <th>Owner</th>
              <th>Mobile</th>
              <th>Sector</th>
              <th>Block</th>
              <th>Address</th>
              <th>Close Date</th>
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
            <th>
              <input className="form-control" placeholder="Search..." />
            </th>
          </tr>
          <tbody>
            {this.state.factoryData.map((data, key) => {
              return (
                <tr key={key}>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.factory_name}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.client_name}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.mobile_number}
                  </td>

                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.factory_sector}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.factory_block}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.factory_address}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.factory_closedate}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div id="factoryModal" className="modal modal-open">
          <FactoryForm />
        </div>
        <div id="factoryDetails" className="modal modal-open">
          <FactoryForm userData={this.state.userdata} />
        </div>
      </div>
    );
  }
}
