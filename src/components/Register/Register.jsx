import React, { useState } from "react";
import "./Register.css";

import TwitterIcon from "@material-ui/icons/Twitter";
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import BgImage from "../../assets/images/bg-image.svg";

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const Register = ({ inputHandler, closeRegister }) => {
    const [values, setValues] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
    });

    // GQL Mutation - On Register
    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, result) {
            console.log(result);
        },
        variables: values,
    });

    function registerSubmitHandler(event) {
        event.preventDefault();
        registerUser();
    }

    function changeHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    return (
        <div className="register" style={{ backgroundImage: `url(${BgImage})`, backgroundRepeat: "no-repeat" }}>
            <div className="register__backdrop">
                <div className="register__modal">
                    <div className="register__modal-content">
                        <div className="register__icon">
                            <TwitterIcon />
                        </div>
                        <div className="register__closeIcon" onClick={closeRegister}>
                            <CloseIcon />
                        </div>
                        <h1>Create your account</h1>
                        <form className="login__form" noValidate onSubmit={registerSubmitHandler}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name*"
                                onFocus={inputHandler}
                                onBlur={inputHandler}
                                onChange={changeHandler}
                                className="login__input"
                            />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username*"
                                onFocus={inputHandler}
                                onBlur={inputHandler}
                                onChange={changeHandler}
                                className="login__input"
                            />
                            <input
                                type="text"
                                name="email"
                                placeholder="Email*"
                                onFocus={inputHandler}
                                onBlur={inputHandler}
                                onChange={changeHandler}
                                className="login__input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password*"
                                onFocus={inputHandler}
                                onBlur={inputHandler}
                                onChange={changeHandler}
                                className="login__input"
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password*"
                                onFocus={inputHandler}
                                onChange={changeHandler}
                                onBlur={inputHandler}
                                className="login__input"
                            />

                            <div>
                                <input type="file" name="profilePic" id="profilePic" />
                                <label htmlFor="profilePic" style={{ marginLeft: "10px" }}>
                                    Profile Picture
                                </label>
                            </div>

                            <Button type="submit" variant="outlined" className="sidebar__tweet" fullWidth>
                                Create
                            </Button>
                            <Button variant="outlined" className="secondary__btn" fullWidth style={{ marginTop: "20px" }} onClick={closeRegister}>
                                Login
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!, $confirmPassword: String!, $email: String!, $name: String!) {
        register(registerInput: { username: $username, password: $password, confirmPassword: $confirmPassword, email: $email, name: $name }) {
            id
            username
            createdAt
            token
            name
        }
    }
`;

export default Register;
