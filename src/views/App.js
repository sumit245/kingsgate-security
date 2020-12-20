import React from "react";
import "jquery/dist/jquery";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import FourNotfor from "./Components/Fournotfor";
import AddClientModal from "./Components/AddClientModal";
import ClientScreen from "./screens/ClientScreen";
import FactoryScreen from "./screens/FactoryScreen";
import GalleryScreen from "./screens/GalleryScreen";
import GroupScreen from "./screens/GroupScreen";
import PaymentScreen from "./screens/PaymentScreen";
import SettingsScreen from "./screens/SettingsScreen";
import SubscriptionScreen from "./screens/SubscriptionScreen";
export default class App extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "../../js/jquery-3.1.1.min.js";
    script.src = "../../js/popper.min.js";
    script.src = "../../js/bootstrap.js";
    script.src = "../../js/plugins/metisMenu/jquery.metisMenu.js";
    script.src = "../../js/plugins/toastr/toastr.min.js";
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={HomeScreen} exact />
        <Route path="/fornotfor" component={FourNotfor} />
        <Route path="/addclient" component={AddClientModal} />
        <Route path="/client" component={ClientScreen} />
        <Route path="/factory" component={FactoryScreen} />
        <Route path="/gallery" component={GalleryScreen} />
        <Route path="/group" component={GroupScreen} />
        <Route path="/payment" component={PaymentScreen} />
        <Route path="/setting" component={SettingsScreen} />
        <Route path="/subscription" component={SubscriptionScreen} />
      </BrowserRouter>
    );
  }
}
