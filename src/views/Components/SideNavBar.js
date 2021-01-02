import React from "react";
import zender_logo from "../../img/zender_logo.png";
import $ from 'jquery'
import CreateGroupForm from "./CreateGroupForm";
export default class App extends React.Component {
  showDropSetting() {
    let ul = document.getElementById("submenu");
    ul.hidden = !ul.hidden;
  }
  groupSetting(){
   let modal=document.getElementById('groupModal')
   modal.style.display='block'
  }
  render() {
    return (
      <>
        <nav className="navbar-default navbar-static-side"  role="navigation">
          <div className="sidebar-collapse">
            <ul className="nav metismenu" id="side-menu">
              <li className="nav-header">
                <div className="dropdown profile-element">
                  <img alt={"Hello"} className="logo" src={zender_logo} />
                </div>
              </li>
              <li>
                <a href="/">
                  <i className="fa fa-th-large" />{" "}
                  <span className="nav-label">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/client">
                  <i className="fa fa-user" />{" "}
                  <span className="nav-label">Clients</span>
                </a>
              </li>
              <li>
                <a href="/factory">
                  <i className="fa fa-map-marker" />{" "}
                  <span className="nav-label">Factories</span>
                </a>
              </li>
              <li>
                <a href="/subscription">
                  <i className="fa fa-rss" />{" "}
                  <span className="nav-label">Subscriptions</span>
                </a>
              </li>
              <li>
                <a href="/challan">
                  <i className="fa fa-file" />{" "}
                  <span className="nav-label">Challan</span>
                </a>
              </li>
              <li>
                <a href="/payment">
                  <i className="fa fa-cc-visa" />{" "}
                  <span className="nav-label">Payment</span>
                </a>
              </li>
              <li>
                <a href="/task">
                  <i className="fa fa-users" />{" "}
                  <span className="nav-label">Tasks</span>
                </a>
              </li>
              <li>
                <a href="/gallery">
                  <i className="fa fa-globe" />{" "}
                  <span className="nav-label">Gallery</span>
                </a>
              </li>
              <li>
                <a onClick={this.showDropSetting} style={{color:'#ddd'}}>
                  <i className="fa fa-cog" />{" "}
                  <span className="nav-label">Settings</span>
                  <ul className="mx-4 list-unstyled" style={{margin:0,padding:5}} hidden id="submenu">
                    <li>
                      <a onClick={this.groupSetting}>
                        {" "}
                        <i className="fa fa-users" />{" "}
                        <span className="nav-label">Group</span>
                      </a>
                    </li>
                    <li>
                      <a href='/createStaff' style={{color:'#ddd'}} >
                        {" "}
                        <i className="fa fa-user" />{" "}
                        <span className="nav-label">Staff</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={this.groupSetting}>
                        {" "}
                        <i className="fa fa-industry" />{" "}
                        <span className="nav-label">Company</span>
                      </a>
                    </li>
                    <li><a onClick={this.groupSetting}>
                        {" "}
                        <i className="fa fa-user-circle-o" />{" "}
                        <span className="nav-label">Profile</span>
                      </a></li>
                  </ul>
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div id="groupModal" className="modal modal-open">
          <CreateGroupForm />
        </div>
      </>
    );
  }
}
