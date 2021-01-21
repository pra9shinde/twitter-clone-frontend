import React from 'react';
import './Register.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import BgImage from '../../assets/images/bg-image.svg';


const Register = ({inputHandler, closeRegister}) => {
    return (
        <div className="register" style={{backgroundImage: `url(${BgImage})`, backgroundRepeat:'no-repeat' }}>
            <div className='register__backdrop'>
                <div className="register__modal">
                    <div className="register__modal-content">
                    <div className="register__icon">
                        <TwitterIcon/>
                    </div>
                    <div className="register__closeIcon" onClick={closeRegister}>
                        <CloseIcon />
                    </div>
                    <h1>Create your account</h1>
                    <form className='login__form'>
                        <input type="text" name="name" placeholder="Name*" onFocus={inputHandler}
                            onBlur={inputHandler} className='login__input'/>
                        <input type="text" name="username" placeholder="Username*" onFocus={inputHandler}
                            onBlur={inputHandler} className='login__input'/>
                        <input type="text" name="email" placeholder="Email*" onFocus={inputHandler}
                            onBlur={inputHandler} className='login__input'/>
                        <input type="password" name="password" placeholder="Password*" onFocus={inputHandler}
                            onBlur={inputHandler} className='login__input'/>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password*" onFocus={inputHandler}
                            onBlur={inputHandler} className='login__input'/>
                        <Button variant='outlined' className='sidebar__tweet' fullWidth>
                            Create
                        </Button>
                        <Button variant='outlined' className='secondary__btn' fullWidth onClick={closeRegister}>
                            Login
                        </Button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Register;
