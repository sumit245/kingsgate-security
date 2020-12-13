import React from "react";

export default class Fournotfor extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");

    script.src = '../../js/jquery-3.1.1.min.js';
    script.async = true;

    document.body.appendChild(script);
  }
  render() {
    return (
      <div>
        <div className="middle-box text-center animated fadeInDown">
          <h1>404</h1>
          <h3 className="font-bold">Page Not Found</h3>
          <div className="error-desc">
            Sorry, but the page you are looking for has note been found. Try
            checking the URL for error, then hit the refresh button on your
            browser or try found something else in our app.
            <form className="form-inline m-t" role="form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for page"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
        {/* Mainly scripts */}
      </div>
    );
  }
}
