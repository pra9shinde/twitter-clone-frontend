import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SinglePost from './components/SinglePost/SinglePost';

import { AuthContext } from './context/auth';

function App() {
    const { user } = useContext(AuthContext);

    return (
        <div className='app'>
            <Router>
                <Switch>
                    <Route path='/login' component={Login} exact />
                    <PrivateRoute auth={user} path='/posts/:postId' component={SinglePost} exact />
                    <PrivateRoute auth={user} path='/' component={Home} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
