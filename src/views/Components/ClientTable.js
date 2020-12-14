import React, { Component } from "react";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";
import { stockData } from "../../models/data";

export default class ClientTable extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    //initialize datatable
    $(document).ready(function () {
      $("#example").DataTable();
    });
  }

  render() {
    return (
      <div className="container mx-auto my-4">
        <table id="example" className="display table" data={stockData}>
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Company Name</th>
              <th>Mobile Number</th>
              <th>Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tr>
            <th>
              <input
                className="form-control"
                placeholder="Search by First Name"
              />
            </th>
            <th>
              <input
                className="form-control"
                placeholder="Search by Last Name"
              />
            </th>
            <th>
              <input
                className="form-control"
                placeholder="Search by Company Name"
              />
            </th>
            <th>
              <input
                className="form-control"
                placeholder="Search by Mobile Number"
              />
            </th>
            <th>
              <input className="form-control" placeholder="Search by Address" />
            </th>
            <th>
              <input className="form-control" placeholder="Search by Status" />
            </th>
          </tr>
          <tbody>
            {stockData.map((data, key) => {
                return(
                    <tr key={key}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td> 
                <td>{data.company}</td>
                <td>{data.mobileNumber}</td>
                <td>{data.flatNumber +',' +data.sector +'-' +data.block +', '  +data.locality}</td>
                <td>{data.type}</td>
              </tr>

                );
              
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
