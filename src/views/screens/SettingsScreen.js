import 'jquery/dist/jquery'
import SideNavBar from "../Components/SideNavBar";
import Footer from "../Components/Footer";
import TopNav from "../Components/TopNav";
import DummyTable from '../Components/DummyTable'
import React, { Component } from 'react'

export default class SettingsScreen extends Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "../../js/jquery-3.1.1.min.js";
        script.src = "../../js/popper.min.js";
        script.src = "../../js/bootstrap.js";
        script.async = true;
        document.body.appendChild(script);
      }
      render() {
        return (
          <>
            <SideNavBar />
            <div id="page-wrapper" className="gray-bg dashbard-1">
              <div className="row border-bottom">
                <TopNav /> 
              </div>
              <DummyTable />
              <Footer />
            </div>
          </>
        );
      }
}
