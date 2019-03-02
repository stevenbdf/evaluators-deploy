import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Login from './login/components/Login.js';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Login/> , document.getElementById('root'));

registerServiceWorker();