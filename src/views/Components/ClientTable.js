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
import $ from "jquery";
import { Button,DropdownButton} from "react-bootstrap";
import { Switch } from "@material-ui/core";

import { clientData as stockData } from "../../models/data";
import { DropDownMenu } from "material-ui";
window.JSZip = jzip;
export default class ClientTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    $(document).ready(function () {
      var events=$('#events');
     var table= $("#example").DataTable({
        searching: false,
        dom: "Bfrtip",
        buttons: [
          {
            text: "Add",
            action: function (e, dt, node, config) {
              let modal = document.getElementById("myModal");
              modal.style.display = "block";
            },
          },
          {
            text: '<i class="fa fa-ellipsis-v" aria-hidden="true"></i>',
            action: function (e, dt, node, config) {
              
            },
          },
        ],
        responsive: true,
        select: true,
        scrollX: true,
      });
      table
      .on( 'select', function ( e, dt, type, indexes ) {
        var rowData = table.rows( indexes ).data().toArray();
        events.prepend( '<div><b>'+JSON.stringify( rowData )+'</div>' );
    } )
    });
  }

  render() {
    return (
      <div className="container mx-auto my-4">
        <div id="events"></div>
        <table id="example" className="display table" data={stockData}>
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
                    {data.firstName + " " + data.lastName}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.company}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.mobileNumber}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.sector}
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
                    {data.flatNumber +
                      ", " +
                      data.locality}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.type}
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

        <div id="myModal" className="modal modal-open">
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
                  <input className="col-sm-12" type="text" required name="mobno" />
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
                  Address <input className="col-sm-12" type="text" name="block" />
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
            <Button variant="secondary">
            Reset
          </Button>
          <Button variant="primary" >
            Save Changes
          </Button>
          <Button variant="danger" >
            Cancel
          </Button>
            </div>

          

        </div>
      </div>
    );
  }
}
