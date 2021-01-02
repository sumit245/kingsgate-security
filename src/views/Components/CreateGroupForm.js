import React, { Component } from "react";
import axios from "axios";

export default class CreateGroupForm extends Component {
  constructor(props) {
    super(props);
    this.handleGroupName = this.handleGroupName.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.state = {
      groupData: [],
      groupNames: "",
    };
  }
  closeAddModal() {
    let modal = document.getElementById("groupModal");
    modal.style.display = "none";
  }
  handleGroupName(e) {
    this.setState({ groupNames: e.target.value });
  }

  submitForm(e) {
    e.preventDefault();
    const newGroup = {
      group_name: this.state.groupNames,
    };
    axios
      .post("http://localhost:4000/kingsgate/addgroups", newGroup)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios.get("http://localhost:4000/kingsgate/groups").then((res) => {
      this.setState({ groupNames: "", groupData: res.data });
    });

    let modal = document.getElementById("groupModal");
    modal.style.display = "none";
  }
  render() {
    return (
      <div>
        <div className="form-style-10">
          <h1>Create Group</h1>
          <form>
            <div className="form-group row inner-wrap" id="addFactory">
              <label className="col-md-6 col-form-label">
                Group Name
                <input
                  type="text"
                  value={this.state.groupNames}
                  onChange={this.handleGroupName}
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
      </div>
    );
  }
}
