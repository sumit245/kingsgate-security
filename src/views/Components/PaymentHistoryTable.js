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
import "pdfmake";
import $ from "jquery";
import axios from "axios";
import ChallanForm from "./ChallanForm";
import InvoiceForm from './InvoiceForm'

window.JSZip = jzip;

export default class PaymentHistoryTable extends Component {
  constructor(props) {
    super(props);
    this.state={
      stockData:[]
    }
  }
  
  componentDidMount() {
    axios.get("http://localhost:4000/kingsgate/challan/").then((res) => {
      this.setState({ stockData: res.data });
     var table= $("#challans").DataTable({
        searching: false,
        dom: "Bfrtip",
        buttons: [],
        responsive: true,
        select: true,
        scrollX: true,
      });
      table
      .on("select", function (e, dt, type, indexes) {
        // axios
        //   .get("http://localhost:4000/kingsgate/")
        //   .then((response) => {
        //     console.log(response.data[indexes]);
        //     self.setState({ userdata: response.data[indexes] });
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });

        let modal = document.getElementById("editChallanModal");
        modal.style.display = "block";
      });
      table
      .on("deselect", function (e, dt, type, indexes) {
        let modal = document.getElementById("editChallanModal");
        modal.style.display = "none";
      });
    });
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
    let modal = document.getElementById("challanModal");
    modal.style.display = "none";
  };
  addClickedEvent() {
    let modal = document.getElementById("challanModal");
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
        <table id="challans" className="display table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Client</th>
              <th>Mobile</th>
              <th>Challan Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Balance</th>
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
                    {data.challan_num}
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
                    {data.challan_date}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.grand_total}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.grand_disc}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.balance}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          id="challanModal"
          style={{ width: 1000 }}
          className="modal modal-open"
        >
          <div className="modal-content">
            <ChallanForm />
          </div>
        </div>
        
        <div id="editChallanModal" className="modal modal-open">
          <div className='modal-content'>
          <InvoiceForm />
          </div>
          
        </div>
      </div>
    );
  }
}
