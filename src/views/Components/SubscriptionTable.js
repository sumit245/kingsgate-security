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
import { Button, Modal } from "react-bootstrap";
import {clientData} from '../../models/data'

import { subscriptionData as stockData } from "../../models/data";

window.JSZip = jzip;



export default class SubscriptionTable extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    showsubscription: false,
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
    $(document).ready(function () {
      $("#example").DataTable({
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
    });
    
  }

  render() {
    return (
      <div className="container mx-auto my-4">
        <table id="example" className="display table" data={stockData}>
          <thead className="table-dark">
            <tr>
              <th>Client Name</th>
              <th>Mobile</th>
              <th>Advance</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
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
                    {data.firstName+ ' ' + data.lastName}
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >{data.mobileNumber}
                    
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
                    {data.start }
                  </td>
                  <td
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {data.end}
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

        <div id="myModal" style={{overflow:'hidden'}} className="modal modal-open">
            <div className="form-style-10">
            <h1>Add Subscription</h1>
            <form method="post">
              <div className="form-group row inner-wrap" id="addFactory">
                <label className="col-md-6 col-form-label">
                  Client
                  <select>
                    {clientData.map((data,key)=>{
                      <option key={key} value={data.firstName} >{data.firstName}</option>
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
                  Type
                  <select>
                      <option>CCTV</option>
                      <option>Night Patrol</option>
                      <option>Both</option>

                    </select>
                </label>
                <label className="col-md-6 col-form-label">
                  Start Date
                  <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label">
                  End Date
                  <input className="col-sm-12" type="text" name="block" />
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
