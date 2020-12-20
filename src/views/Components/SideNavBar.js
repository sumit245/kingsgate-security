import React from "react";
import zender_logo from "../../img/zender_logo.png";
export default class App extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar-default navbar-static-side" role="navigation">
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
                <a href="/payment">
                  <i className="fa fa-cc-visa" />{" "}
                  <span className="nav-label">Invoices</span>
                </a>
              </li>
              <li>
                <a href="/group">
                  <i className="fa fa-users" />{" "}
                  <span className="nav-label">Groups</span>
                </a>
              </li>
              <li>
                <a href="/gallery">
                  <i className="fa fa-globe" />{" "}
                  <span className="nav-label">Gallery</span>
                </a>
              </li>
              <li>
                <a href="/setting">
                  <i className="fa fa-cog" />{" "}
                  <span className="nav-label">Settings</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}
