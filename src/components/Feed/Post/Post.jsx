import React from 'react';
import './Post.css';
import { Avatar } from '@material-ui/core';
import { ChatBubbleOutline, FavoriteBorder, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';

const VerifiedIcon = require('../../../assets/images/twitter-verified-badge.svg');

const Post = ({ displayName, username, verified, text, image, avatar }) => {
    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar src='https://yt3.ggpht.com/yti/ANoDKi6xkCCtf8mZXcH8iCLgMVoFwJ_Z4xcI-55_wJLrhA=s88-c-k-c0x00ffffff-no-rj-mo' />
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>Pranav Shinde</h3>
                        <span className='post__verified'>
                            <img
                                src={VerifiedIcon.default}
                                alt=''
                                className='verifiedIcon'
                            />
                        </span>
                        <span className='post__username'>@pra9shinde</span>
                    </div>
                    <div className='postHeaderDesc'>
                        <p>Let's go build the twitter clone!!!</p>
                        <img
                            src='https://images.genius.com/6c6a2e8c6b87d2f9f383b2f764cfa308.1000x1000x1.jpg'
                            alt=''
                            className='post__image'
                        />
                    </div>
                </div>
                <div className='post__footer'>
                    <ChatBubbleOutline fontSize='small' />
                    <Repeat fontSize='small' />
                    <FavoriteBorder fontSize='small' />
                    <ShareIcon fontSize='small' />
                </div>
            </div>
        </div>
    );
};

export default Post;
