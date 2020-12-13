import React from "react";
import 'jquery/dist/jquery'
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from './screens/HomeScreen'
import FourNotfor from './Components/Fournotfor'
import MailScreen from "./screens/MailScreen";
import AddClientModal from "./Components/AddClientModal";
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
      <Route path='/' component={HomeScreen} exact/>
      <Route path='/fornotfor' component={FourNotfor} />
      <Route path='/mailbox' component={MailScreen} />
      <Route path='/addclient' component={AddClientModal} />
      
      </BrowserRouter>
        
    );
  }
}
