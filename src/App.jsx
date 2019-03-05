import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './register/components/Register';
import Candidates from './main/admin/components/candidates/Candidates';
import Evaluators from './main/admin/components/evaluators/Evaluators';
import Login from './login/components/login';
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
            <Route exact path="/candidates" component={Candidates} />
            <Route exact path="/evaluators" component={Evaluators} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={()=> "404 not found"} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
