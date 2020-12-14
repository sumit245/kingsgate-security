import React from 'react';
import avatar from '../../img/profile_small.jpg'
export default class App extends React.Component{
    render() {
      return (
        <>
        <nav className="navbar-default navbar-static-side" role="navigation">
              <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                  <li className="nav-header">
                    <div className="dropdown profile-element">
                      <img alt={'Hello'} className="rounded-circle" src={avatar} />
                        <span className="block m-t-xs font-bold" style={{color:'ButtonFace'}}>Rohit Huda</span>
                        <span className="text-muted text-xs block">Director <b className="caret" /></span>
                    </div>
                  </li>
                  <li className="active">
                    <a href="#"><i className="fa fa-th-large" /> <span className="nav-label">Dashboard</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-user" /> <span className="nav-label">Client</span></a>
                  </li>
                  <li>
                    <a href="/mailbox"><i className="fa fa-envelope" /> <span className="nav-label">Mailbox </span><span className="label label-warning float-right">16/24</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-map-marker" /> <span className="nav-label">Factories</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-rss" /> <span className="nav-label">Subscriptions</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-cc-visa" /> <span className="nav-label">Payments</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-file" /> <span className="nav-label">Invoices</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-users" /> <span className="nav-label">Groups</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-globe" /> <span className="nav-label">Gallery</span></a>
                  </li>
                  <li>
                    <a href="#"><i className="fa fa-cog" /> <span className="nav-label">Settings</span></a>
                   </li>
                  </ul>
                  </div>
                  
            </nav>
        </>
      );
    }
}