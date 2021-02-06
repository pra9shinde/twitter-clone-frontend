import React, { useState, useContext } from "react";
import "./Login.css";

import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import Register from "../Register/Register";
import Loader from "../Loader/Loader";

import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/auth";

const Login = () => {
    const context = useContext(AuthContext);

    let history = useHistory();

    const [inputFocus, setInputFocus] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [errors, setErrors] = useState({});

    const inputFocusedHandler = (e) => {
        if (inputFocus) {
            e.target.classList.remove("active");
        } else {
            e.target.classList.add("active");
        }
        setInputFocus(!inputFocus);
    };

    const showRegisterHandler = () => {
        setShowRegister(!showRegister);
    };

    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const inputChangeHandler = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: (res) => {
            context.login(res.login);
            setShowLoader(false);
            history.push("/");
        },
        onError: (err) => {
            setErrors(err.graphQLErrors[0].extensions.errors);
            setShowLoader(false);
        },
    });

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);
        loginUser({ variables: values });
    };

    return (
        <>
            <div className="auth__container">
                <CSSTransition in={showRegister} appear={showRegister} timeout={600} classNames="fade">
                    {showRegister ? (
                        <Register inputHandler={inputFocusedHandler} closeRegister={showRegisterHandler} />
                    ) : (
                        <div className="login">
                            <div className="login__container">
                                <div className="login__icon">
                                    <Link to="/">
                                        <TwitterIcon />
                                    </Link>
                                </div>
                                <h1>Log in to Twitter</h1>

                                {Object.keys(errors).length > 0 && (
                                    <div className="form__errors">
                                        <ul className="errors-ul">
                                            {Object.values(errors).map((value, i) => (
                                                <li key={i}>*{value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <form className="login__form" onSubmit={loginSubmitHandler}>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onFocus={inputFocusedHandler}
                                        onBlur={inputFocusedHandler}
                                        onChange={inputChangeHandler}
                                        className="login__input"
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onFocus={inputFocusedHandler}
                                        onBlur={inputFocusedHandler}
                                        onChange={inputChangeHandler}
                                        className="login__input"
                                    />

                                    {showLoader ? (
                                        <Loader />
                                    ) : (
                                        <>
                                            <Button type="submit" variant="outlined" className="sidebar__tweet" fullWidth>
                                                Login
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                className="secondary__btn"
                                                style={{ marginTop: "20px" }}
                                                fullWidth
                                                onClick={showRegisterHandler}
                                            >
                                                Register
                                            </Button>
                                        </>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}
                </CSSTransition>
            </div>
        </>
    );
};

const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            token
            username
            createdAt
            name
            profilePic
        }
    }
`;

export default Login;
