import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

function App() {
    return (
        <div className="app">
            <Router>
                <Switch>
                    <Route path="/login" component={Login} exact />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
