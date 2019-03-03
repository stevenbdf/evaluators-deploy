import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './navbar/components/Navbar';
import Login from './login/components/Login';
import Admin from './main/admin/components/Admin';
import Candidates from './main/admin/components/candidates/Candidates';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/candidates" component={Candidates} />
        </div>
      </Router>
    );
  }
}

export default App;
