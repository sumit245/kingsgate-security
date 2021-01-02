import React, { Component } from "react";
import axios from "axios";

export default class PaymentsTabComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeSubscriptionType = this.onChangeSubscriptionType.bind(this);
    this.onChangeSubscriptionStartDate = this.onChangeSubscriptionStartDate.bind(
      this
    );
    this.onChangeSubscriptionAdvance = this.onChangeSubscriptionAdvance.bind(
      this
    );
    this.onChangeSubscriptionDiscount = this.onChangeSubscriptionDiscount.bind(
      this
    );
    this.onChangeSubscriptionCloseDate = this.onChangeSubscriptionCloseDate.bind(
      this
    );
    this.onChangeSubscriptionTotalPayable = this.onChangeSubscriptionTotalPayable.bind(
      this
    );
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      clients: {},
      subscoldisp: "none",
      liscoldisp: "block",
      subscriptionType: "",
      subscriptionStartDate: "",
      subscriptionCloseDate: "",
      subscriptionAdvance: "",
      subscriptionDiscount: "",
      subscriptionTotalPayable: "",
    };
  }
  onChangeSubscriptionDiscount(e) {
    this.setState({ subscriptionDiscount: e.target.value });
  }
  onChangeSubscriptionType(e) {
    this.setState({ subscriptionType: e.target.value });
  }
  onChangeSubscriptionAdvance(e) {
    this.setState({ subscriptionAdvance: e.target.value });
  }
  onChangeSubscriptionCloseDate(e) {
    this.setState({ subscriptionCloseDate: e.target.value });
  }
  onChangeSubscriptionStartDate(e) {
    this.setState({ subscriptionStartDate: e.target.value });
  }
onChangeSubscriptionTotalPayable(e){
  this.setState({subscriptionTotalPayable:e.target.value})
}
  addSubscription = () => {
    let factcol = document.getElementById("subs");
    let child = document.getElementById("factoryfield");
    factcol.innerHTML = child.outerHTML;
    this.setState({ subscoldisp: "block", liscoldisp: "none" });
  };

  submitForm = () => {
    let idofclient = this.props.userdata._id;
    const newSubscription = {
      client_name: this.props.userdata.client_name,
      mobile_number: this.props.userdata.mobile_number,
      phone_number: this.props.userdata.phone_number,
      email_id: this.props.userdata.email_id,
      sector: this.props.userdata.sector,
      block: this.props.userdata.block,
      address: this.props.userdata.address,
      company: this.props.userdata.company,
      gst_num: this.props.userdata.gst_num,
      client_type: this.props.userdata.client_type ? "Non GST" : " GST",
      factories: {
        factory_name: this.state.factoryName,
        factory_sector: this.state.factorysector,
        factory_block: this.state.factoryblock,
        factory_address: this.state.factoryaddress,
        factory_close_date: this.state.factoryclosedate,
      },
    };

    axios
      .post(
        "http://localhost:4000/kingsgate/update/" + idofclient,
        newSubscription
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    this.setState({ subscoldisp: "none", liscoldisp: "block" });
  };

  render() {
    return (
      <div className="row">
      <div
        className="list-group col"
        style={{ display: this.state.liscoldisp }}
        id="subs"
      >
        {this.props.userdata.factories.map((data, key) => {
          return (
            <a
              href="/"
              className="list-group-item list-group-item-action flex-column align-items-start"
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">
                  Subscription Type:{data.factory_name}
                </h5>
              </div>
              <h5 className="mb-1">Start Date:{data.factory_sector}</h5>
              <h5 className="mb-1">End Date:{data.factory_block}</h5>
              <h5 className="mb-1">Advance:{data.factory_address}</h5>
              <h5 className="mb-1">Discount:{data.factory_close_date}</h5>
              <h5 className="mb-1">
                Total Payable:{data.factory_close_date}
              </h5>
            </a>
          );
        })}
      </div>
      <div
        className="list-group col"
        style={{ display: this.state.subscoldisp }}
        id="factoryfield"
      >
        <label className="col-md-6 col-form-label">
          Factory
          <input
            className="col-sm-12 form-control"
            // value={this.state.subscriptionStartDate}
            // onChange={this.onChangeSubscriptionAdvance}
            type="text"
            name="sector"
          />
        </label>
        <label
          className="col-md-6 col-form-label"
          // value={this.state.subscriptionType}
          // onChange={this.onChangeSubscriptionType}
        >
          Subscription Type
          <select className="col-sm-12 form-control">
            <option>CCTV</option>
            <option>Night Patrol</option>
            <option>Both</option>
          </select>
        </label>
        <label className="col-md-6 col-form-label">
          Advance
          <input
            className="col-sm-12 form-control"
            // value={this.state.subscriptionStartDate}
            // onChange={this.onChangeSubscriptionAdvance}
            type="text"
            name="sector"
          />
        </label>
        
        <label className="col-md-6 col-form-label">
          Discount
          <input
            className="col-sm-12 form-control"
            // value={this.state.subscriptionDiscount}
            // onChange={this.onChangeSubscriptionDiscount}
            type="text"
            name="block"
          />
        </label>
        <label className="col-md-6 col-form-label">
          Tax Payable{" "}
          <input
            className="col-sm-12 form-control"
            // value={this.state.subscriptionTotalPayable}
            // onChange={this.onChangeSubscriptionTotalPayable}
            type="text"
          />
        </label>
        <label className="col-md-6 col-form-label">
          Balance
          {/* <div className="input-group date">
            <span className="input-group-addon">
              <i className="fa fa-calendar" />
            </span> */}
            <input
              type="text"
              className="form-control"
              
              // value={this.state.subscriptionStartDate}
              // onChange={this.onChangeSubscriptionStartDate}
            />
          {/* </div> */}
        </label>
        <label className="col-md-6 col-form-label">
          Due Date
          {/* <div className="input-group date">
            <span className="input-group-addon">
              <i className="fa fa-calendar" />
            </span> */}
            <input
              type="date"
              className="form-control"
              defaultValue="03/04/2014"
              // value={this.state.subscriptionCloseDate}
              // onChange={this.onChangeSubscriptionCloseDate}
            />
          {/* </div> */}
        </label>
        <button className="btn mx-3 btn-primary" onClick={this.submitForm}>
          Submit
        </button>
      </div>
      <div className="col-lg-2">
        <button type="button" className="btn btn-primary btn-lg btn-block">
          <i
            className="fa fa-plus"
            onClick={this.addSubscription}
            aria-hidden="true"
          ></i>
        </button>
        <button type="button" className="btn btn-secondary btn-lg btn-block">
          <i className="fa fa-edit" aria-hidden="true"></i>
        </button>
        <button type="button" className="btn btn-secondary btn-lg btn-block">
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>    );
  }
}
