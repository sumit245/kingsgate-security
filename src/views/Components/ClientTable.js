import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import $ from 'jquery'; 


export default class ClientTable extends Component {
    componentDidMount() {
        //initialize datatable
        $(document).ready(function () {
            $('#example').DataTable();
        });
     }
    
    
    render() {
        return (
            <div className="container mx-auto my-4">
            <table id="example" class="display table">
            <thead className='table-dark'>
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
                    <th><input className='form-control' placeholder='Search by First Name' /></th>
                    <th><input className='form-control' placeholder='Search by Last Name' /></th>
                    <th><input className='form-control' placeholder='Search by Company Name' /></th>
                    <th><input className='form-control' placeholder='Search by Mobile Number' /></th>
                    <th><input className='form-control' placeholder='Search by Address' /></th>
                    <th><input className='form-control' placeholder='Search by Status' /></th>
                </tr>
            <tbody>

                <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                </tr>
            </tbody>
        </table>
            </div>
            
        )
    }
}
