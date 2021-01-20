import React, {useState} from 'react';
import './Login.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import { Button } from '@material-ui/core';
import Register from '../Register/Register';

import {CSSTransition} from 'react-transition-group';

const Login = () => {
    const [inputFocus, setInputFocus] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const inputFocusedHandler = (e) => {
        if(inputFocus){
            e.target.classList.remove('active');
        } else {
            e.target.classList.add('active');
        }
        setInputFocus(!inputFocus);
    };

    const showRegisterHandler = () => {
        setShowRegister(!showRegister);
    }

    return (
        <>
            {/* <CSSTransition in={true} appear={true} timeout={600} classNames='fade'>
                <Register inputHandler={inputFocusedHandler} closeRegister={showRegisterHandler} />
            </CSSTransition> */}
                {
                    showRegister ?
                    (
                        <CSSTransition in={true} appear={true} timeout={600} classNames='fade'>
                            <Register inputHandler={inputFocusedHandler} closeRegister={showRegisterHandler} />
                        </CSSTransition>       
                    ) : 
                    (
                        <div className='login'>
                        <div className="login__container">
                            <div className="login__icon">
                                <TwitterIcon/>
                            </div>
                            <h1>Log in to Twitter</h1>
                            <form className='login__form'>
                                    <input type="text" name="username" placeholder="Username" onFocus={inputFocusedHandler}
                                    onBlur={inputFocusedHandler} className='login__input'/>
                                
                                
                                    <input type="text" name="password" placeholder="Password" onFocus={inputFocusedHandler}
                                    onBlur={inputFocusedHandler} className='login__input'/>
                                
                                <Button variant='outlined' className='sidebar__tweet' fullWidth>
                                    Login
                                </Button>
                                <Button variant='outlined' className='secondary__btn' fullWidth onClick={showRegisterHandler}>
                                    Register
                                </Button>
                            </form>
                        </div>
                        
                    </div>
                    )
                }
        </>
    )
}

export default Login
