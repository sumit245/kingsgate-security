import React from "react";
import "jquery/dist/jquery";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import FourNotfor from "./Components/Fournotfor";
import ClientScreen from "./screens/ClientScreen";
import FactoryScreen from "./screens/FactoryScreen";
import GalleryScreen from "./screens/GalleryScreen";
import GroupScreen from "./screens/GroupScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
import ChallanScreen from './screens/ChallanScreen'
import CreateStaffScreen from './screens/CreateStaffScreen'
export default class App extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "../../js/jquery-3.1.1.min.js";
    script.src = "../../js/popper.min.js";
    script.src = "../../js/bootstrap.js";
    script.src = "../../js/plugins/metisMenu/jquery.metisMenu.js";
    script.src = "../../js/plugins/toastr/toastr.min.js";
    script.src='../../../src/js/invoicescript.js'
    script.async = true;
    document.body.appendChild(script);
    document.title='KingsGate Security'
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/fornotfor" component={FourNotfor} />
        <Route path="/client" component={ClientScreen} />
        <Route path="/factory" component={FactoryScreen} />
        <Route path="/gallery" component={GalleryScreen} />
        <Route path="/task" component={GroupScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/setting" component={SettingsScreen} />
        <Route path="/subscription" component={SubscriptionScreen} />
        <Route path='/challan' component={ChallanScreen}/>
        <Route path='/createStaff' component={CreateStaffScreen} />
      </BrowserRouter>
    );
  }
}
