import React from 'react';
import './Widgets.css';
import { Search } from '@material-ui/icons';

import { TwitterTimelineEmbed, TwitterTweetEmbed } from 'react-twitter-embed';

const Widgets = () => {
    return (
        <div className='widgets'>
            <div className='widgets__input'>
                <Search className='widgets__searchIcon' />
                <input type='text' placeholder='Search Twitter' />
            </div>
            <div className='widgets__container'>
                <h2>What's happening</h2>

                <TwitterTweetEmbed tweetId={'1334988608265211904'} />
                <TwitterTimelineEmbed
                    sourceType='profile'
                    screenName='garyvee'
                    options={{ height: 400 }}
                />
            </div>
        </div>
    );
};

export default Widgets;
