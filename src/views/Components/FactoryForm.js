import React, { Component } from "react";
import axios from "axios";
import { Toast } from "bootstrap";

export default class FactoryForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeFactoryName = this.onChangeFactoryName.bind(this);
    this.onChangeFactorySector = this.onChangeFactorySector.bind(this);
    this.onChangeFactoryBlock = this.onChangeFactoryBlock.bind(this);
    this.onChangeFactoryAddress = this.onChangeFactoryAddress.bind(this);
    this.onChangeFactoryCloseDate = this.onChangeFactoryCloseDate.bind(this);
    this.onDateChanged = this.onDateChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      clientData: [],
      factories: [],
      mobileNumber: "",
      ownerName: "",
      factoryName: "",
      factorysector: "",
      factoryblock: "",
      factoryaddress: "",
      factoryclosedate: "",
      factorygroup: "",
      groupData: [],
    };
  }
  onChangeFactoryAddress(e) {
    this.setState({ factoryaddress: e.target.value });
  }
  onChangeFactoryName(e) {
    this.setState({ factoryName: e.target.value });
  }
  onChangeFactoryBlock(e) {
    this.setState({ factoryblock: e.target.value });
  }
  onChangeFactoryCloseDate(e) {
    this.setState({ factoryclosedate: e.target.value });
  }
  onChangeFactorySector(e) {
    this.setState({ factorysector: e.target.value });
  }
  onDateChanged(e) {
    this.setState({ factoryclosedate: e.target.value });
  }
  onGroupChanged(e) {
    this.setState({ factorygroup: e.target.value });
  }
  submitForm = (e) => {
    e.preventDefault();
    const newFactory = {
      client_name: this.state.ownerName,
      mobile_number: this.state.mobileNumber,
      factory_name: this.state.factoryName,
      factory_sector: this.state.factorysector,
      factory_block: this.state.factoryblock,
      factory_address: this.state.factoryaddress,
      factory_closedate: this.state.factoryclosedate,
      factory_group: this.state.factorygroup,
    };
    axios
      .post("http://localhost:4000/kingsgate/addfactory", newFactory)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    let modal = document.getElementById("factoryModal");
    modal.style.display = "none";
  };

  componentDidMount() {
    console.log(`${this.props.userdata}`);
    const self = this;
    axios
      .get("http://localhost:4000/kingsgate/")
      .then((res) => {
        self.setState({ clientData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:4000/kingsgate/factories/")
      .then((res) => {
        self.setState({ factories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/kingsgate/groups/")
      .then((res) => {
        self.setState({ groupData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closeAddModal = () => {
    let modal = document.getElementById("factoryModal");
    modal.style.display = "none";
  };
  showClientTable = () => {
    let modal = document.getElementById("clienttable");
    modal.style.display = "block";
  };
  fillData = (data) => {
    this.setState({
      mobileNumber: data.mobile_number,
      ownerName: data.client_name,
    });
    let modal = document.getElementById("clienttable");
    modal.style.display = "none";
  };
  render() {
    return (
      <>
        <div className="modal-content">
          <div className="form-style-10">
            <h1>Add Factory</h1>
            <form method="post">
              <div className="form-group row inner-wrap" id="addFactory">
                <label className="col-md-6 col-form-label">
                  Owner Name
                  <input
                    type="text"
                    onClick={this.showClientTable}
                    value={this.state.ownerName}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Mobile Number
                  <input
                    className="col-sm-12"
                    type="text"
                    name="mobnum"
                    value={this.state.mobileNumber}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Factory Name
                  <input
                    className="col-sm-12"
                    value={this.state.factoryName}
                    onChange={this.onChangeFactoryName}
                    type="text"
                    name="factoryname"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Sector
                  <input
                    className="col-sm-12"
                    value={this.state.factorysector}
                    onChange={this.onChangeFactorySector}
                    type="text"
                    name="sector"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Block
                  <input
                    className="col-sm-12"
                    value={this.state.factoryblock}
                    onChange={this.onChangeFactoryBlock}
                    type="text"
                    name="block"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Address{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    value={this.state.factoryaddress}
                    onChange={this.onChangeFactoryAddress}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Group
                  <select className="form-label">
                    {this.state.groupData.map((data, key) => {
                      return (
                        <option
                          key={key}
                          value={data.group_name}
                          onChange={this.onGroupChanged}
                        >
                          {data.group_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
                <label className="col-md-6 col-form-label">
                  Close Date
                  <input
                    type="date"
                    className="col-sm-12"
                    value={this.state.factoryclosedate}
                    onChange={this.onDateChanged}
                  />
                </label>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              form="nameform"
              value="Submit"
              className="btn btn-primary"
              onClick={this.submitForm}
            >
              Save changes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onFocus={this.closeAddModal}
            >
              Close
            </button>
          </div>
        </div>

        <div className="modal" id="clienttable" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <table id="clientTable" className="display table">
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
                          {data.company}
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
      </>
    );
  }
}
