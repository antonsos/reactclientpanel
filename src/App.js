import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./store";

//bootstrap
import "bootstrap/dist/css/bootstrap.css";
import { Container } from "reactstrap";

//COMPONENTS
import AppNavBar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavBar />
            <Container>
              <Switch>
                <Route exact path="/" component={Dashboard} />
              </Switch>
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
