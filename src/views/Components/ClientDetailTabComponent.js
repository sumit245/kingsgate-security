import React, { Component } from "react";

export default class ClientDetailTabComponent extends Component {
  
  
  render() {
    return (
      <>
        <form method="get" className="form-style-10" id="clientdetailform">
          <div className="section">
            <span>1</span>Personal Details
          </div>
          <div className="form-group row inner-wrap">
            <label className="col-md-6 col-form-label">
              Client Name{" "}
              <input
                type="text"
                className="col-sm-12"
                name="cname"
                value={this.props.userdata.client_name || ''}
                readOnly
              />
            </label>
            <label className="col-md-6 col-form-label">
              Mobile Number{" "}
              <input
                className="col-sm-12"
                type="text"
                required
                readOnly
                name="mobno"
                value={this.props.userdata.mobile_number || ''}
              />
            </label>
            <label className="col-md-6 col-form-label">
              Phone Number{" "}
              <input
                type="text"
                className="col-sm-12"
                name="phno"
                value={this.props.userdata.phone_number || ''}
                readOnly
              />
            </label>
           
            <label className="col-md-6 col-form-label">
              Email Address{" "}
              <input
                className="col-sm-12"
                type="email"
                name="eid"
                value={this.props.userdata.email_id || ''}
                readOnly
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
                value={this.props.userdata.sector ||''}
                readOnly
              />
            </label>
            <label className="col-md-6 col-form-label">
              Block{" "}
              <input
                className="col-sm-12"
                type="text"
                name="block"
                value={this.props.userdata.block || ''}
                readOnly
              />
            </label>
            <label className="col-md-6 col-form-label">
              Address{" "}
              <input
                className="col-sm-12"
                type="text"
                name="address"
                value={this.props.userdata.address || ''}
                readOnly
              />
            </label>
            <label className="col-md-6 col-form-label">
              Company Name{" "}
              <input
                type="text"
                name="compname"
                value={this.props.userdata.company || '' }
                readOnly
              />
            </label>
          </div>
        </form>
      </>
    );
  }
}
