import React, { Component } from "react";
import axios from "axios";

export default class FactoryDetailsTabComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeFactoryName = this.onChangeFactoryName.bind(this);
    this.onChangeFactorySector = this.onChangeFactorySector.bind(this);
    this.onChangeFactoryBlock = this.onChangeFactoryBlock.bind(this);
    this.onChangeFactoryAddress = this.onChangeFactoryAddress.bind(this);
    this.onChangeFactoryCloseDate = this.onChangeFactoryCloseDate.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      clients: {},
      factcoldisp: "none",
      liscoldisp: "block",
      factoryName: "",
      factorysector: "",
      factoryblock: "",
      factoryaddress: "",
      factoryclosedate: "",
      userdata:props.userdata,
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

  addFactory = () => {
    let factcol = document.getElementById("facts");
    let child = document.getElementById("factoryfield");
    factcol.innerHTML = child.outerHTML;
    this.setState({ factcoldisp: "block", liscoldisp: "none" });
  };

  submitForm = () => {
    let idofclient = this.props.userdata._id;
    const newFactory = {
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
      .post("http://localhost:4000/kingsgate/update/" + idofclient, newFactory)
      .then((res) => {
        console.log(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("http://localhost:4000/kingsgate/")
      .then((resp)=>{
        this.setState({userdata:resp.data})
      })
    this.setState({ factcoldisp: "none", liscoldisp: "block"});

  };

  render() {
    return (
      <div className="row">
        <div
          className="list-group col"
          style={{ display: this.state.liscoldisp }}
          id="facts"
        >
          {this.state.userdata.factories.map((data, key) => {
            return (
              <a
                href="/"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">Factory Name:{data.factory_name}</h5>
                </div>
                <h5 className="mb-1">Sector:{data.factory_sector}</h5>
                <h5 className="mb-1">Block:{data.factory_block}</h5>
                <h5 className="mb-1">Address:{data.factory_address}</h5>
                <h5 className="mb-1">Close Date:{data.factory_close_date}</h5>
              </a>
            );
          })}
        </div>
        <div
          className="form-group col"
          style={{ display: this.state.factcoldisp }}
          id="factoryfield"
        >
          <label className="col-md-6 col-form-label">
            Factory Name
            <input
              className="col-sm-12 form-control"
              type="text"
              value={this.state.factoryName}
              onChange={this.onChangeFactoryName}
              name="factoryname"
            />
          </label>
          <label className="col-md-6 col-form-label">
            Sector
            <input
              className="col-sm-12 form-control"
              value={this.state.factorysector}
              onChange={this.onChangeFactorySector}
              type="text"
              name="sector"
            />
          </label>
          <label className="col-md-6 col-form-label">
            Block
            <input
              className="col-sm-12 form-control "
              value={this.state.factoryblock}
              onChange={this.onChangeFactoryBlock}
              type="text"
              name="block"
            />
          </label>
          <label className="col-md-6 col-form-label">
            Address{" "}
            <input
              className="col-sm-12 form-control"
              value={this.state.factoryaddress}
              onChange={this.onChangeFactoryAddress}
              type="text"
            />
          </label>
          <label className="col-md-6 col-form-label">
            Close Date
              <input
                type="date"
                className="form-control"
                defaultValue="03/04/2014"
                value={this.state.factoryclosedate}
                onChange={this.onChangeFactoryCloseDate}
              />
          </label>
          <label className="col-md-6 col-form-label">
            Assign Group
              <select className='form-control'>
                <option>A
                </option>
                <option>B
                </option>
              </select>
          </label>


          <button className="btn mx-3 btn-primary" onClick={this.submitForm}>
            Submit
          </button>
        </div>
        <div className="col-lg-2">
          <button type="button" className="btn btn-primary btn-lg btn-block">
            <i
              className="fa fa-plus"
              onClick={this.addFactory}
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
      </div>
    );
  }
}
