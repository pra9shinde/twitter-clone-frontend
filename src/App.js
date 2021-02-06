import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import { AuthContext } from "./context/auth";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <div className="app">
            <Router>
                <Switch>
                    {/* <Route path="/" component={Home} /> */}
                    <Route path="/login" component={Login} exact />
                    {user ? <Route path="/" component={Home} /> : <Redirect to="/login" />}
                    {/* <Route path="/" render={() => (user ? <Route component={Home} /> : <Route component={Login} />)} /> */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
