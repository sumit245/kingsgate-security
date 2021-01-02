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
import { Dropdown } from "react-bootstrap";
import axios from 'axios'
import SubscriptionForm from './SubscriptionForm'

window.JSZip = jzip;

export default class SubscriptionTable extends Component {
  state = {
    showsubscription: false,
    stockData:[]
  };
  handleCloseSubscription = () => {
    this.setState({ showSubscription: false });
  };
  handleShowSubscription = () => {
    this.setState({
      showSubscription: true,
    });
  };
  componentDidMount() {
    axios.get('http://localhost:4000/kingsgate/subscription/')
    .then((res)=>{
      this.setState({stockData:res.data})
      $("#subscriptionTable").DataTable({
        searching: false,
        dom: "Bfrtip",
        buttons: [],
        responsive: true,
        select: true,
        scrollX: true,
      });

    })
     
  }
  exportData = () => {
    var filename = "Kingsgate";
    var downloadurl;
    var dataFileType = "application/vnd.ms-excel";
    var tableSelect = $("#clientTable").DataTable();
    var tableHTMLData = tableSelect.rows().data().toArray();
    tableHTMLData = JSON.stringify(tableHTMLData);
    // Specify file name
    filename = filename ? filename + ".xls" : "export_excel_data.xls";

    // Create download link element
    downloadurl = document.createElement("a");

    document.body.appendChild(downloadurl);

    if (navigator.msSaveOrOpenBlob) {
      var blob = new Blob(["\ufeff", tableHTMLData], {
        type: dataFileType,
      });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadurl.href = "data:" + dataFileType + ", " + tableHTMLData;

      // Setting the file name
      downloadurl.download = filename;

      //triggering the function
      downloadurl.click();
    }
  };
  closeAddModal = () => {
    let modal = document.getElementById("subscriptionModal");
    modal.style.display = "none";
  };
  addClickedEvent() {
    let modal = document.getElementById("subscriptionModal");
    modal.style.display = "block";
  }
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
              <Dropdown.Item>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <table
          id="subscriptionTable"
          className="display table"
        >
          <thead className="table-dark">
            <tr>
              <th>Client Name</th>
              <th>Mobile</th>
              <th>Factory</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              
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
            {this.state.stockData.map((data, key) => {
              return (
                <tr key={key}>
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
                    {data.factory_name}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.subscription_type}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.start_date}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.end_date}
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          id="subscriptionModal"
          style={{ overflow: "hidden" }}
          className="modal modal-open"
        >
          <SubscriptionForm />
        </div>
      </div>
    );
  }
}
