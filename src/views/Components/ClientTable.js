import React, { Component } from "react";
import "react-bootstrap";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-select-dt";
import * as jzip from "jszip";
import "pdfmake";
import { Dropdown } from "react-bootstrap";
import $ from "jquery";
import axios from "axios";

import ClientTabs from "../Components/ClientTabs";
import ClientDetailTabComponent from "../Components/ClientDetailTabComponent";
import FactoryDetailsTabComponent from "./FactoryDetailsTabComponent";
import SubscriptionTabComponent from "./SubscriptionTabComponent";
import PaymentsTabComponent from "./PaymentsTabComponent";
import ClientForm from "./ClientForm";
window.JSZip = jzip;

export default class ClientTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gstinput: true,
      client_name: "",
      mobile_number: "",
      phone_number: "",
      email_id: "",
      sector: "",
      block: "",
      address: "",
      company: "",
      gst_num: "",
      client_type: true,
      clients: [],
      rows: "",
      aivi:'',
      userdata: [],
    };
  }

  addClickedEvent() {
    let modal = document.getElementById("clientModal");
    modal.style.display = "block";
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

  componentDidMount = () => {
    const self = this;
    $("#clientTable").DataTable().destroy();
    $("#clientTable tfoot td").each(function () {
      $(this).html(
        '<input type="text" placeholder="Search" style="margin:0;width:100px;padding:0" />'
      );
    });
    axios
      .get("http://localhost:4000/kingsgate/")
      .then((response) => {
        this.setState({ clients: response.data });
        var table = $("#clientTable").DataTable({
          initComplete: function () {
            // Apply the search
            this.api().columns().every( function () {
                var that = this;
                return( $( 'input', this.footer() ).on( 'keyup change clear', function () {
                    if ( that.search() !== this.value ) {
                      
                        that
                            .search( this.value )
                            .draw();
                    }
                } )) ;
            } );
        },
          paging: true,
          searching: false,
          dom: "Bfrtip",
          responsive: true,
          buttons: [],
          select: true,
        });
        table
        .on("select", function (e, dt, type, indexes) {
          axios
            .get("http://localhost:4000/kingsgate/")
            .then((response) => {
              console.log(response.data[indexes]);
              self.setState({ userdata: response.data[indexes] });
            })
            .catch(function (error) {
              console.log(error);
            });

          let modal = document.getElementById("addClientModal");
          modal.style.display = "block";
        });
        table
        .on("deselect", function (e, dt, type, indexes) {
          let modal = document.getElementById("addClientModal");
          modal.style.display = "none";
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  closeClientModal = () => {
    let modal = document.getElementById("addClientModal");
    modal.style.display = "none";
  };

  deleteClient = () => {
    const self = this;
    axios
      .delete(
        "http://localhost:4000/kingsgate/delete_client/" +
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
      axios
      .get("http://localhost:4000/kingsgate/")
      .then((resp)=>{
        this.setState({clients:resp.data})
      })
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

        <table id="clientTable" className="display">
          <thead className="table-dark">
            <tr>
              <th>Client Name</th>
              <th>Company</th>
              <th>Mobile</th>
              <th>Sector</th>
              <th>Block</th>
              <th>Address</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {this.state.clients.map((data, key) => {
              return (
                <tr key={key}>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.client_name || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.company || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.mobile_number || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.sector || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.block || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.address || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.client_type || ""}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Active
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="table">
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
        </table>

        <div id="clientModal" className="modal modal-open">
          <ClientForm />
        </div>

        <div className="modal modal-open" id="addClientModal">
          <div className="modal-content">
            <div className="modal-body">
              <ClientTabs>
                <div label="Client Details">
                  <ClientDetailTabComponent userdata={this.state.userdata} />
                </div>
                <div label="Factories">
                  <FactoryDetailsTabComponent userdata={this.state.userdata} />
                </div>
                <div label="Subscriptions">
                  <SubscriptionTabComponent userdata={this.state.userdata} />
                </div>
                <div label="Invoice">
                  <PaymentsTabComponent userdata={this.state.userdata} />
                </div>
                <div label="Challan">
                  <PaymentsTabComponent userdata={this.state.userdata} />
                </div>
              </ClientTabs>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.closeClientModal}
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
