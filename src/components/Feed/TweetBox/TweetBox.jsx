import React, { useState } from 'react';
import './TweetBox.css';
import { Button, Avatar } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import GifIcon from '@material-ui/icons/Gif';
import PollIcon from '@material-ui/icons/Poll';
import MoodIcon from '@material-ui/icons/Mood';
import EventIcon from '@material-ui/icons/Event';

const TweetBox = () => {
    const [inputFocus, setInputFocus] = useState(false);

    const inputFocusedHandler = () => {
        setInputFocus(!inputFocus);
    };

    return (
        <div className='tweetBox'>
            <form>
                <div
                    className={`tweetBox__input ${inputFocus ? 'active' : ''}`}
                >
                    <Avatar src='https://yt3.ggpht.com/yti/ANoDKi6xkCCtf8mZXcH8iCLgMVoFwJ_Z4xcI-55_wJLrhA=s88-c-k-c0x00ffffff-no-rj-mo' />
                    <input
                        type='text'
                        placeholder="What's happening?"
                        onFocus={inputFocusedHandler}
                        onBlur={inputFocusedHandler}
                    />
                </div>
                <div className='tweetBox__submit'>
                    <div className='tweetBox__submit-left'>
                        <div className='icon'>
                            <PhotoLibraryIcon />
                        </div>
                        <div className='icon'>
                            <GifIcon />
                        </div>

                        <div className='icon'>
                            <PollIcon />
                        </div>

                        <div className='icon'>
                            <MoodIcon />
                        </div>

                        <div className='icon'>
                            <EventIcon />
                        </div>
                    </div>
                    <div className='tweetBox__submit-right'>
                        <Button className='tweetBox__btn'>Tweet</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TweetBox;
