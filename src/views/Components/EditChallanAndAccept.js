import React, { Component } from "react";

export default class EditChallanAndAccept extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: true,
    };
  }

  render() {
    const isPressed=this.state.check
    let extradata
    if(isPressed){
       extradata= <DisplayPaymentForm />
    }
    else{
       extradata= <AcceptPaymentForm />
    }  
    return (
      <>
        <div className="container mx-auto my-4">
          <div
            className="row mx-2"
            style={{ justifyContent: "flex-start" }}
          ></div>

          <ul class="nav justify-content-end">
            <li class="nav-item">
              <button
                className="btn btn-primary nav-link"
                onClick={() =>
                  this.setState((prevState) => ({
                    check: !prevState.check,
                  }))
                }
              >
                Payment
              </button>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i className="fa fa-pencil"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i className="fa fa-trash"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fa fa-print" aria-hidden="true"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="fa fa-download" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
          <div class="row">
            <div class="col-sm-8">
              <div class="container">
                <p>
                  <b>
                    Challan No.: <big className="text-primary">20DE2013</big>
                  </b>{" "}
                  <b style={{ position: "absolute", marginLeft: 50, right: 0 }}>
                    Challan Date:{" "}
                    <big className="text text-primary">20-Dec-2012</big>
                  </b>
                  <br />
                  Amit Mishra, Srp Edutech
                  <br />
                  Sector: A, Block: B, Address: Panipat
                  <br />
                  <b>M:</b> 987350
                </p>
                <hr></hr>

                <table className="table table-borderless">
                  <tbody>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Unit Cost</th>
                      <th>Discount</th>
                      <th>Sub Total</th>
                    </tr>
                    <tr>
                      <td style={{ whiteSpace: "nowrap", width: "1%" }}>
                        CCTV This i want to check for length
                      </td>
                      <td>2</td>
                      <td>&#8377; 1500</td>
                      <td>&#8377;100</td>
                      <td>
                        <span>&#8377;3000</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}> </td>
                      <td colSpan={2}>Total</td>
                      <td>
                        <div id="total">&#8377;3000</div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}> </td>
                      <td colSpan={2}>Discount</td>
                      <td className="total-value">&#8377; 100</td>
                    </tr>
                    <tr>
                      <td colSpan={2}> </td>
                      <td colSpan={2}>Grand Total</td>
                      <td className="total-value">&#8377; 2900</td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="blank">
                        {" "}
                      </td>
                      <td colSpan={2} className="total-line">
                        Amount Paid
                      </td>
                      <td className="total-value">&#8377; 300</td>
                    </tr>
                    <tr style={{ height: 2 }}>
                      <td colSpan={2} className="blank">
                        {" "}
                      </td>
                      <td colSpan={2} className="total-line balance">
                        Balance Due
                      </td>
                      <td className="total-value balance">
                        <div className="due">&#8377;2700</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="col-sm-4">
                {extradata}
            </div>
          </div>
        </div>
      </>
    );
  }
}
class AcceptPaymentForm extends Component {
  render() {
    return (
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Amount"
            />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Mode" />
          </div>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Method" />
          </div>
          <div class="form-group justify-content-space-between">
            <input type="date" class="form-control" placeholder="Date" />
          </div>
          <button type="submit" class="btn btn-primary mr-2">
            Accept
          </button>
          <button type="submit" class="btn btn-secondary">
            Close
          </button>
        </form>
      </div>
    );
  }
}
class DisplayPaymentForm extends Component {
  render() {
    return (
      <>
        <div className="container">
          <table class="table">
            <thead>
              <tr>
                <th style={{ whiteSpace: "nowrap", width: "1%" }}>Date</th>
                <th style={{ whiteSpace: "nowrap", width: "1%" }}>Amt</th>
                <th style={{ whiteSpace: "nowrap", width: "1%" }}>Mode</th>
                <th style={{ whiteSpace: "nowrap", width: "1%" }}>Method</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ whiteSpace: "nowrap", width: "1%" }}>
                  2-Dec-2020
                </td>
                <td style={{ whiteSpace: "nowrap", width: "1%" }}>500</td>
                <td style={{ whiteSpace: "nowrap", width: "1%" }}>Cash</td>
                <td style={{ whiteSpace: "nowrap", width: "1%" }}>Advace</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
