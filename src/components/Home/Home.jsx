import React from 'react';

import './Home.css';
import Sidebar from '../Sidebar/Sidebar';
import Feed from '../Feed/Feed';
import Widgets from '../Widgets/Widgets';

function Home() {
    return (
        <div className='home'>
            <Sidebar />
            <Feed />
            <Widgets />
        </div>
    );
}

export default Home;
