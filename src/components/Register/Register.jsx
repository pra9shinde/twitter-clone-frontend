import React, { useState, useContext } from 'react';
import './Register.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BgImage from '../../assets/images/bg-image.svg';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { AuthContext } from '../../context/auth';

const Register = ({ inputHandler, closeRegister }) => {
    const context = useContext(AuthContext);

    let history = useHistory();

    // States
    const [values, setValues] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showLoader, setShowLoader] = useState(false);
    const [errors, setErrors] = useState({});

    // Apollo POST Request
    const [registerUser] = useMutation(REGISTER_USER, {
        onCompleted: (res) => {
            context.login(res.register);
            setShowLoader(false);
            history.push('/');
        },
        onError: (err) => {
            console.log(err);
            setErrors(err.graphQLErrors[0].extensions.errors);
            setShowLoader(false);
        },
    });

    function registerSubmitHandler(event) {
        event.preventDefault();
        setShowLoader(true);
        const fileEl = document.getElementById('profilePic');
        const file = fileEl.files[0];

        registerUser({ variables: { ...values, image: file } });
    }

    function changeHandler(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    return (
        <div
            className='register'
            style={{
                background: `url(${BgImage}), #15202B `,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <div className='wrapper'>
                <div className='register__backdrop'>
                    <div className='register__modal'>
                        <div className='register__modal-content'>
                            <div className='register__icon'>
                                <Link to='/'>
                                    <TwitterIcon />
                                </Link>
                            </div>
                            <div className='register__closeIcon' onClick={closeRegister}>
                                <CloseIcon />
                            </div>
                            <h1>Create your account</h1>

                            {Object.keys(errors).length > 0 && (
                                <div className='form__errors'>
                                    <ul className='errors-ul'>
                                        {Object.values(errors).map((value, i) => (
                                            <li key={i}>*{value}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <form className='login__form' noValidate onSubmit={registerSubmitHandler}>
                                <input
                                    type='text'
                                    name='username'
                                    placeholder='Username*'
                                    onFocus={inputHandler}
                                    onBlur={inputHandler}
                                    onChange={changeHandler}
                                    className='login__input'
                                />
                                <input
                                    type='text'
                                    name='name'
                                    placeholder='Full Name*'
                                    onFocus={inputHandler}
                                    onBlur={inputHandler}
                                    onChange={changeHandler}
                                    className='login__input'
                                />
                                <input
                                    type='text'
                                    name='email'
                                    placeholder='Email*'
                                    onFocus={inputHandler}
                                    onBlur={inputHandler}
                                    onChange={changeHandler}
                                    className='login__input'
                                />
                                <input
                                    type='password'
                                    name='password'
                                    placeholder='Password*'
                                    onFocus={inputHandler}
                                    onBlur={inputHandler}
                                    onChange={changeHandler}
                                    className='login__input'
                                />
                                <input
                                    type='password'
                                    name='confirmPassword'
                                    placeholder='Confirm Password*'
                                    onFocus={inputHandler}
                                    onChange={changeHandler}
                                    onBlur={inputHandler}
                                    className='login__input'
                                />

                                <div className='selectGroup'>
                                    <input type='file' name='profilePic' id='profilePic' />
                                    <label htmlFor='profilePic' style={{ marginLeft: '10px' }}>
                                        Profile Picture
                                    </label>
                                </div>

                                {showLoader ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <Button type='submit' variant='outlined' className='sidebar__tweet' fullWidth>
                                            Create
                                        </Button>
                                        <Button
                                            variant='outlined'
                                            className='secondary__btn'
                                            fullWidth
                                            style={{ marginTop: '20px' }}
                                            onClick={closeRegister}
                                        >
                                            Login
                                        </Button>
                                    </>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const REGISTER_USER = gql`
    mutation register($username: String!, $password: String!, $confirmPassword: String!, $email: String!, $name: String!, $image: Upload) {
        register(
            registerInput: { username: $username, password: $password, confirmPassword: $confirmPassword, email: $email, name: $name, image: $image }
        ) {
            id
            username
            createdAt
            token
            name
            profilePic
        }
    }
`;

export default Register;
