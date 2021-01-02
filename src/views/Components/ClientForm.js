import React, { Component } from "react";
import { Switch } from "@material-ui/core";
import axios from "axios";

export default class ClientForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeClientName = this.onChangeClientName.bind(this);
    this.onChangeMobileNum = this.onChangeMobileNum.bind(this);
    this.onChangePhoneNum = this.onChangePhoneNum.bind(this);
    this.onChangeEmailId = this.onChangeEmailId.bind(this);
    this.onChangeSector = this.onChangeSector.bind(this);
    this.onChangeBlock = this.onChangeBlock.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeGstNum = this.onChangeGstNum.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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
      groupData: [],
    };
  }
  onChangeClientName(e) {
    this.setState({ client_name: e.target.value });
  }

  onChangeMobileNum(e) {
    if (!Number(e.target.value)) {
      e.target.value = "Only Numbers Allowed";
      e.target.style = "color:red";
    } else {
      e.target.style = "color:black";
      this.setState({ mobile_number: e.target.value });
    }
  }
  onChangePhoneNum(e) {
    this.setState({ phone_number: e.target.value });
  }
  onChangeEmailId(e) {
    this.setState({ email_id: e.target.value });
  }
  onChangeSector(e) {
    this.setState({ sector: e.target.value });
  }
  onChangeBlock(e) {
    this.setState({ block: e.target.value });
  }
  onChangeAddress(e) {
    this.setState({ address: e.target.value });
  }
  onChangeCompany(e) {
    this.setState({ company: e.target.value });
  }
  onChangeGstNum(e) {
    this.setState({ gst_num: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newClient = {
      client_name: this.state.client_name,
      mobile_number: this.state.mobile_number,
      phone_number: this.state.phone_number,
      email_id: this.state.email_id,
      sector: this.state.sector,
      block: this.state.block,
      address: this.state.address,
      company: this.state.company,
      gst_num: this.state.gst_num,
      client_type: this.state.client_type ? "Non GST" : " GST",
    };
    axios
      .post("http://localhost:4000/kingsgate/add", newClient)
      .then((res) => {
        console.log(res.data);
        window.location.href='/client'
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({
      client_name: "",
      mobile_number: "",
      phone_number: "",
      email_id: "",
      sector: "",
      block: "",
      address: "",
      company: "",
      gst_num: "",
    });
    let modal = document.getElementById("clientModal");
    modal.style.display = "none";
  }
  closeAddModal = () => {
    let modal = document.getElementById("clientModal");
    modal.style.display = "none";
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/kingsgate/groups")
      .then((res) => {
        this.setState({ groupData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div className="modal-content">
          <div className="form-style-10">
            <h1>Add Client</h1>
            <form>
              <div className="section">
                <span>1</span>Personal Details
              </div>
              <div className="form-group row inner-wrap">
                <label className="col-md-6 col-form-label">
                  Client Name{" "}
                  <input
                    type="text"
                    className="col-sm-12"
                    value={this.state.client_name}
                    onChange={this.onChangeClientName}
                    name="cname"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Mobile Number{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    value={this.state.mobile_number}
                    onChange={this.onChangeMobileNum}
                    required={true}
                    name="mobno"
                    placeholder="Must Fill This"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Phone Number{" "}
                  <input
                    type="text"
                    className="col-sm-12"
                    value={this.state.phone_number}
                    onChange={this.onChangePhoneNum}
                    name="phno"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Email Address{" "}
                  <input
                    className="col-sm-12"
                    type="email"
                    value={this.state.email_id}
                    onChange={this.onChangeEmailId}
                    name="eid"
                  />
                </label>
              </div>
              <div className="section">
                <span>2</span>Billing Details
              </div>
              <div className="form-group row inner-wrap">
                <label className="col-md-6 col-form-label">
                  Sector{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    name="sector"
                    value={this.state.sector}
                    onChange={this.onChangeSector}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Block{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    value={this.state.block}
                    onChange={this.onChangeBlock}
                    name="block"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Address{" "}
                  <input
                    className="col-sm-12"
                    type="text"
                    value={this.state.address}
                    onChange={this.onChangeAddress}
                    name="address"
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Company Name{" "}
                  <input
                    type="text"
                    name="compname"
                    value={this.state.company}
                    onChange={this.onChangeCompany}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  GST Applicable
                  <Switch
                    onChange={() => {
                      this.setState((prevstate) => ({
                        gstinput: !prevstate.gstinput,
                        client_type: !prevstate.client_type,
                      }));
                    }}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  GST Number{" "}
                  <input
                    className="col-sm-12"
                    disabled={this.state.gstinput}
                    type="text"
                    // id="gstinput"
                    name="gstnum"
                    value={this.state.gst_num}
                    onChange={this.onChangeGstNum}
                  />
                </label>
                <label className="col-md-6 col-form-label">
                  Group
                  <select className="form-label">
                    {this.state.groupData.map((data, key) => {
                      return (
                        <option key={key} value={data.group_name}>
                          {data.group_name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              type="submit"
              value="Submit"
              className="btn btn-primary"
              onClick={this.onSubmit}
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
      </div>
    );
  }
}
