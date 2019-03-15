import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './register/components/Register';
import Candidates from './main/admin/components/candidates/Candidates';
import Assignments from './main/admin/components/assignments/Assignments';
import Users from './main/admin/components/users/Users';
import Evaluators from './main/admin/components/evaluators/Evaluators';
import Maintenance from './main/admin/components/maintenance/Maintenance';
import Login from './login/components/Login';
import Admin from './main/admin/components/Admin';
import {ProtectedRoute} from './login/components/protectedRoute';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Register} />
            <ProtectedRoute exact path="/admin" component={Admin} />
            <ProtectedRoute exact path="/candidates" component={Candidates} />
            <ProtectedRoute exact path="/evaluators" component={Evaluators} />
            <ProtectedRoute exact path="/assignments" component={Assignments} />
            <ProtectedRoute exact path="/users" component={Users} />
            <ProtectedRoute exact path="/maintenance" component={Maintenance} />
            <Route exact path="/login" component={Login} />
            
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
