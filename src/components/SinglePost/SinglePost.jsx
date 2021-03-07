import React from 'react';
import './SinglePost.css';

import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';

const SinglePost = () => {
    return (
        <div className='home'>
            <Sidebar />

            <Widgets />
        </div>
    );
};

export default SinglePost;
