import React, { useContext } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import { AuthProvider, AuthContext } from "./context/auth";

function App() {
    const { user } = useContext(AuthContext);

    return (
        <AuthProvider>
            <div className="app">
                <Router>
                    <Switch>
                        <Route path="/login" component={Login} exact />
                        {/* Authenticated user send home else login */}
                        {user ? <Route path="/" component={Home} /> : <Redirect to="/login" />}
                    </Switch>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
