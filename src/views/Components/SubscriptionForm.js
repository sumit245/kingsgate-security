import React, { Component } from "react";
import axios from "axios";

export default class SubscriptionForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeOwnerName = this.onChangeOwnerName.bind(this);
    this.onChangeFactory = this.onChangeFactory.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onChangeSubscriptionType = this.onChangeSubscriptionType.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.state = {
      ownerName: "",
      mobileNumber: "",
      client_name: "",
      mobile_number: "",
      subscriptionType: "CCTV",
      factoryName: "",
      substype: "",
      startDate: "",
      endDate: "",
      clientData: [],
    };
  }
  componentDidMount() {
    const self = this;
    axios
      .get("http://localhost:4000/kingsgate/")
      .then((res) => {
        // console.log(res.data);
        self.setState({ clientData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  closeAddModal = () => {
    let modal = document.getElementById("subscriptionModal");
    modal.style.display = "none";
  };
  showClientTable = () => {
    let modal = document.getElementById("clientsubscriptiontable");
    modal.style.display = "block";
  };
  fillData = (data) => {
    this.setState({
      mobileNumber: data.mobile_number,
      ownerName: data.client_name,
    });
    let modal = document.getElementById("clientsubscriptiontable");
    modal.style.display = "none";
  };
  onChangeOwnerName(e) {
    this.setState({ client_name: e.target.value });
  }
  onChangeMobile(e) {
    this.setState({ mobile_number: e.target.value });
  }
  onChangeFactory(e) {
    this.setState({ factoryName: e.target.value });
  }
  onChangeSubscriptionType(e) {
    this.setState({ subscriptionType: e.target.value });
  }
  onChangeStartDate(e) {
    this.setState({ startDate: e.target.value });
  }
  onChangeEndDate(e) {
    this.setState({ endDate: e.target.value });
  }
  onSubmitForm(e) {
    e.preventDefault();
    const newSubscription = {
      client_name: this.state.ownerName,
      mobile_number: this.state.mobileNumber,
      factory_name: this.state.factoryName,
      subscription_type: this.state.subscriptionType,
      start_date: this.state.startDate,
      end_date: this.state.endDate,
    };
    axios
      .post("http://localhost:4000/kingsgate/addsubs/", newSubscription)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    let modal = document.getElementById("subscriptionModal");
    modal.style.display = "none";
  }
  render() {
    return (
      <div>
        <div className="form-style-10">
          <h1>Add Subscription</h1>
          <form method="post">
            <div className="form-group row inner-wrap" id="addFactory">
              <label className="col-md-6 col-form-label">
                Client
                <input
                  type="text"
                  onClick={this.showClientTable}
                  value={this.state.ownerName}
                  // onChange={this.onChangeOwnerName}
                />
              </label>
              <label className="col-md-6 col-form-label">
                Mobile Number
                <input
                  className="col-sm-12"
                  type="text"
                  value={this.state.mobileNumber}
                  // onChange={this.state.onChangeMobile}
                  name="mobnum"
                />
              </label>
              <label className="col-md-6 col-form-label">
                Factory Name
                <input
                  className="col-sm-12"
                  type="text"
                  name="factoryname"
                  value={this.state.factoryName}
                  onChange={this.onChangeFactory}
                />
              </label>
              <label className="col-md-6 col-form-label">
                Type
                <select onChange={this.onChangeSubscriptionType}>
                  <option value="CCTV">CCTV</option>
                  <option value="Night Patrol">Night Patrol</option>
                  <option value="Both">Both</option>
                </select>
              </label>
              <label className="col-md-6 col-form-label">
                Start Date
                <input
                  className="col-sm-12"
                  type="date"
                  name="block"
                  value={this.state.startDate}
                  onChange={this.onChangeStartDate}
                />
              </label>
              <label className="col-md-6 col-form-label">
                End Date
                <input
                  className="col-sm-12"
                  type="date"
                  name="block"
                  value={this.state.endDate}
                  onChange={this.onChangeEndDate}
                />
              </label>
            </div>
          </form>
          <div className="modal-footer">
            <button
              type="submit"
              form="nameform"
              value="Submit"
              className="btn btn-primary"
              onClick={this.onSubmitForm}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={this.closeAddModal}
            >
              Close
            </button>
          </div>
        </div>
        <div
          className="modal"
          id="clientsubscriptiontable"
          tabIndex={-1}
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <table id="clientsTable" className="display table">
                <thead className="table-dark">
                  <tr>
                    <th>Client Name</th>
                    <th>Company</th>
                    <th>Mobile</th>
                    <th>Address</th>
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
                </tr>
                <tbody>
                  {this.state.clientData.map((data, key) => {
                    return (
                      <tr key={key} onClick={() => this.fillData(data)}>
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
                          {data.mobile_number}
                        </td>

                        <td
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {data.address}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
