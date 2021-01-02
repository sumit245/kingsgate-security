import React, { Component } from "react";
import "../../../src/css/invoicestyle.css";
import "../../../src/css/print.css";
import $ from "jquery";
import axios from "axios";

export default class ChallanForm extends Component {
  constructor(props) {
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);
    this.onQtyChanged = this.onQtyChanged.bind(this);
    this.onChangeCost = this.onChangeCost.bind(this);
    this.onChangeDiscount = this.onChangeDiscount.bind(this);
    this.state = {
      clientData: [],
      ownerName: "",
      mobileNumber: "",
      address: "",
      itemName: "",
      quantity: "",
      itemcost: "",
      company: "",
      printstate: false,
      discount: "",
      stockData: [],
    };
  }

  onItemChanged(e) {
    this.setState({ itemName: e.target.value });
  }
  onQtyChanged(e) {
    this.setState({ quantity: e.target.value });
  }
  onChangeCost(e) {
    this.setState({ itemcost: e.target.value });
  }
  onChangeDiscount(e) {
    this.setState({ discount: e.target.value });
  }

  componentDidMount() {
    const self = this;
    axios
      .get("http://localhost:4000/kingsgate/")
      .then((res) => {
        self.setState({ clientData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
    function print_today() {
      var now = new Date();
      var months = new Array(
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      );
      var date = (now.getDate() < 10 ? "0" : "") + now.getDate();
      function fourdigits(number) {
        return number < 1000 ? number + 1900 : number;
      }
      var today =
        months[now.getMonth()] + " " + date + ", " + fourdigits(now.getYear());
      return today;
    }

    // from http://www.mediacollege.com/internet/javascript/number/round.html
    function roundNumber(number, decimals) {
      var newString; // The new rounded number
      decimals = Number(decimals);
      if (decimals < 1) {
        newString = Math.round(number).toString();
      } else {
        var numString = number.toString();
        if (numString.lastIndexOf(".") == -1) {
          // If there is no decimal point
          numString += "."; // give it one at the end
        }
        var cutoff = numString.lastIndexOf(".") + decimals; // The point at which to truncate the number
        var d1 = Number(numString.substring(cutoff, cutoff + 1)); // The value of the last decimal place that we'll end up with
        var d2 = Number(numString.substring(cutoff + 1, cutoff + 2)); // The next decimal, after the last one we want
        if (d2 >= 5) {
          // Do we need to round up at all? If not, the string will just be truncated
          if (d1 == 9 && cutoff > 0) {
            // If the last digit is 9, find a new cutoff point
            while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
              if (d1 != ".") {
                cutoff -= 1;
                d1 = Number(numString.substring(cutoff, cutoff + 1));
              } else {
                cutoff -= 1;
              }
            }
          }
          d1 += 1;
        }
        if (d1 == 10) {
          numString = numString.substring(0, numString.lastIndexOf("."));
          var roundedNum = Number(numString) + 1;
          newString = roundedNum.toString() + ".";
        } else {
          newString = numString.substring(0, cutoff) + d1.toString();
        }
      }
      if (newString.lastIndexOf(".") == -1) {
        // Do this again, to the new string
        newString += ".";
      }
      var decs = newString.substring(newString.lastIndexOf(".") + 1).length;
      for (var i = 0; i < decimals - decs; i++) newString += "0";
      //var newNumber = Number(newString);// make it a number if you like
      return newString; // Output the result to the form field (change for your purposes)
    }

    function update_total() {
      var total = 0;
      var price = $(".price").each(function (i) {
        price = $(this).html().replace("$", "");
        if (!isNaN(price)) total += Number(price);
      });

      total = roundNumber(total, 2);

      $("#subtotal").html("$" + total);
      $("#total").html("$" + total);

      update_balance();
    }

    function update_balance() {
      var due =
        $("#total").html().replace("$", "") - $("#paid").val().replace("$", "");
      due = roundNumber(due, 2);

      $(".due").html("$" + due);
    }

    function update_price() {
      var row = $(this).parents(".item-row");
      var price =
        row.find(".cost").val().replace("$", "") * row.find(".qty").val();
      price = roundNumber(price, 2);
      isNaN(price)
        ? row.find(".price").html("N/A")
        : row.find(".price").html("$" + price);

      update_total();
    }

    function bind() {
      $(".cost").blur(update_price);
      $(".qty").blur(update_price);
    }

    $(document).ready(function () {
      $("input").click(function () {
        $(this).select();
      });

      $("#paid").blur(update_balance);

      $("#addrows").on("click", function () {
        $(".item-row:last").after(
          '<tr class="item-row"><td class="item-name"><div class="delete-wpr"><textarea>Item Name</textarea><a class="delete" href="javascript:;" title="Remove row">X</a></div></td><td><textarea class="qty">0</textarea></td><td><textarea class="cost">$0</textarea></td><td class="description"><textarea>$0.0</textarea></td><td><span class="price">$0</span></td></tr>'
        );
        if ($(".delete").length > 0) $(".delete").show();
        bind();
      });

      bind();

      $(".delete").on("click", function () {
        $(this).parents(".item-row").remove();
        update_total();
        if ($(".delete").length < 2) $(".delete").hide();
      });

      $("#cancel-logo").click(function () {
        $("#logo").removeClass("edit");
      });
      $("#delete-logo").click(function () {
        $("#logo").remove();
      });
      $("#change-logo").click(function () {
        $("#logo").addClass("edit");
        $("#imageloc").val($("#image").attr("src"));
        $("#image").select();
      });
      $("#save-logo").click(function () {
        $("#image").attr("src", $("#imageloc").val());
        $("#logo").removeClass("edit");
      });

      $("#date").val(print_today());
    });
  }
  closeAddModal() {
    let modal = document.getElementById("challanModal");
    modal.style.display = "none";
  }
  showClientTable = () => {
    let modal = document.getElementById("clientsubscriptiontable");
    modal.style.display = "block";
  };
  fillData = (data) => {
    this.setState({
      mobileNumber: data.mobile_number,
      ownerName: data.client_name,
      company: data.company,

      address: data.sector + "," + data.block + " ," + data.block,
    });
    let modal = document.getElementById("clientsubscriptiontable");
    modal.style.display = "none";
  };
  onSubmitForm(e) {
    this.setState({ printstate: true });
    e.preventDefault();
    const newChallan = {
      challan_num: "1",
      client_name: this.state.ownerName,
      mobile_number: this.state.mobileNumber,
      company: this.state.company,
      address: this.state.address,
      item_name: this.state.itemName,
      item_cost: this.state.itemcost,
      item_disc: this.state.discount,
      item_price: "2000",
      grand_total: "3000",
      challan_date: "28/12/2020",
      grand_disc: "500",
      balance: "2000",
    };
    axios
      .post("http://localhost:4000/kingsgate/addchallan/", newChallan)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:4000/kingsgate/challan/")
      .then((res) => {
        console.log(res.data);
        this.setState({ stockData: res.data });
      })
      .catch((err) => {
        console.log(err);
      });

    let modal = document.getElementById("challanModal");
    modal.style.display = "none";
    {
      window.location.href = "/payment";
    }
  }

  render() {
    return (
      <div>
        <div id="page-wrap">
          <p id="header">Challan</p>
          <div className="form-style-10">
            <form method="post">
              <div className="form-group row" id="addFactory">
                <label className="col-md-3 col-form-label">
                  Owner Name
                  <input
                    type="text"
                    onClick={this.showClientTable}
                    value={this.state.ownerName}
                  />
                </label>
                <label className="col-md-3 col-form-label">
                  Mobile Number
                  <input type="text" value={this.state.mobileNumber} />
                </label>
                <label className="col-md-3 col-form-label">
                  Company Name
                  <input type="text" value={this.state.company} />
                </label>
                <label className="col-md-3 col-form-label">
                  Address
                  <input type="text" value={this.state.address} />
                </label>
              </div>
            </form>
          </div>

          <table
            id="items"
            style={{
              display: "block",
              height: "300px",
              overflow: "scroll",
              borderWidth: 0,
            }}
          >
            <tbody>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Cost</th>
                <th>Discount</th>
                <th>Sub Total</th>
              </tr>
              <tr className="item-row">
                <td className="item-name">
                  <div className="delete-wpr">
                    <textarea
                      defaultValue={"Web Updates"}
                      onChange={this.onItemChanged}
                      value={this.state.itemName}
                    />
                    <a className="delete" title="Remove row" href="/">
                      X
                    </a>
                  </div>
                </td>
                <td>
                  <textarea
                    className="qty"
                    defaultValue={"1"}
                    onChange={this.onQtyChanged}
                    value={this.state.quantity}
                  />
                </td>
                <td>
                  <textarea
                    className="cost"
                    defaultValue={"$650.00"}
                    onChange={this.onChangeCost}
                    value={this.state.itemcost}
                  />
                </td>
                <td className="description">
                  <textarea
                    defaultValue={"$0.0"}
                    onChange={this.onChangeDiscount}
                    value={this.state.discount}
                  />
                </td>
                <td>
                  <span className="price">$650.00</span>
                </td>
              </tr>
              <tr>
                <td colSpan={5}>
                  <a
                    id="addrows"
                    style={{ color: "#002171", fontWeight: "bold" }}
                    title="Add a row"
                  >
                    Add a row
                  </a>
                </td>
              </tr>
              <tr style={{ height: "10px" }}>
                <td colSpan={2} className="blank">
                  {" "}
                </td>
                <td colSpan={2} className="total-line">
                  Total
                </td>
                <td className="total-value">
                  <div id="total">$650.00</div>
                </td>
              </tr>
              <tr style={{ height: "10px" }}>
                <td colSpan={2} className="blank">
                  {" "}
                </td>
                <td colSpan={2} className="total-line">
                  Discount
                </td>
                <td className="total-value">
                  <textarea id="paid" defaultValue={"$0.00"} />
                </td>
              </tr>
              <tr style={{ height: "10px" }}>
                <td colSpan={2} className="blank">
                  {" "}
                </td>
                <td colSpan={2} className="total-line">
                  Amount Paid
                </td>
                <td className="total-value">
                  <textarea id="paid" defaultValue={"$0.00"} readOnly />
                </td>
              </tr>
              <tr style={{ height: 2 }}>
                <td colSpan={2} className="blank">
                  {" "}
                </td>
                <td colSpan={2} className="total-line balance">
                  Balance Due
                </td>
                <td className="total-value balance">
                  <div className="due">$650.00</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="modal-footer">
          <button
            type="submit"
            form="nameform"
            value="Submit"
            className="btn btn-primary"
            onClick={this.onSubmitForm}
          >
            {this.state.printstate ? "Print Preview" : "Save Changes"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.closeAddModal}
          >
            Close
          </button>
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
