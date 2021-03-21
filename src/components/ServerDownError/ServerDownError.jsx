import React from 'react';
import ErrorImg from '../../assets/images/undraw_server_down_s4lk.svg';

const ServerDownError = () => {
    return (
        <div className='single__post__notfound'>
            <h3>No Response from Server!!!</h3>
            <p>Inconvenience is regretted</p>
            <img src={ErrorImg} alt='No Response from Server' />
        </div>
    );
};

export default ServerDownError;
