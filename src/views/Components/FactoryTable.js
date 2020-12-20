import React, { Component } from 'react'
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-buttons-dt";
import "datatables.net-buttons/js/buttons.html5.js";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import 'datatables.net-select-dt'
import * as jzip from "jszip";
import { Button, Modal } from "react-bootstrap";
import "pdfmake";
import $ from "jquery";
import {clientData} from '../../models/data'

import { factoryData as stockData } from "../../models/data";

window.JSZip = jzip;
const count=2
const addFields = () => {
  var container = document.getElementById("addFactory");

  container.appendChild(document.createTextNode("Factory" + count));
  var input = document.createElement("input");
  input.type = "text";
  input.name = "Factory+1";
  input.className = "col-sm-12";
  container.appendChild(input);
  container.appendChild(document.createElement("br"));
  
  count += 1;
};

export default class FactoryTable extends Component {
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
            responsive:true,
            select:true,
            scrollX:true
          });
        });
        
      }
    
      render() {
        return (
          <div className="container mx-auto my-4">
            <table id="example" className="display table" data={stockData}>
              <thead className="table-dark">
                <tr>
                  <th>Factory Name</th>
                  <th>Owner</th>
                  <th>Mobile</th>
                  <th>Sector</th>
                  <th>Block</th>
                  <th>Address</th>
            
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
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.company}</td>
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.owner}</td>
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.mobileNumber}</td>
      
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.sector}</td>
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.block}</td>
                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.flatNumber + ','+ data.locality }</td>

                      <td style={ {overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap' }} >{data.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div id="myModal" className="modal modal-open">
            <div className="form-style-10">
            <h1>Add Factory</h1>
            <form method="post">
              <div className="form-group row inner-wrap" id="addFactory">
                <label className="col-md-6 col-form-label">
                  Owner Name
                  <select>
                    {clientData.map((data,key)=>{
                      <option key={key}value={data.firstName} >{data.firstName}</option>
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
                  Sector
                  <input className="col-sm-12" type="text" name="sector" />
                </label>
                <label className="col-md-6 col-form-label">
                  Block
                  <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label">
                  Close Date
                  <input className="col-sm-12" type="text" name="block" />
                </label>
                <label className="col-md-6 col-form-label"> 
                  Address{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    name="factoryaddress"
                    id="factoryaddress"
                  />
                </label>
                
                <Button
                  name="more"
                  title="More"
                  variant="secondary"
                  className="mx-3"
                  onClick={addFields}
                  style={{width:'auto',height:30,marginTop:25}}
                >
                  Add Factory
                </Button>
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
