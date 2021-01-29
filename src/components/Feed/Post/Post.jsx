import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Post.css';

import { Avatar } from '@material-ui/core';
import { ChatBubbleOutline, FavoriteBorder, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';

const VerifiedIcon = require('../../../assets/images/twitter-verified-badge.svg');

const Post = ({
    id,
    displayName,
    username,
    verified,
    text,
    image,
    avatar,
    likeCount,
    commentCount,
    likes,
    createdAt,
}) => {
    function commentHandler() {
        console.log('Comment Handler');
    }

    function likeHandler() {
        console.log('Like Handler');
    }

    return (
        <Link to={`/posts/${id}`}>
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
                            <span className='post__username'>
                                @{username} ·{' '}
                                {moment(new Date(createdAt)).fromNow()}
                            </span>
                        </div>
                        <div className='postHeaderDesc'>
                            <p>{text}</p>
                            <img
                                src='https://images.genius.com/6c6a2e8c6b87d2f9f383b2f764cfa308.1000x1000x1.jpg'
                                alt=''
                                className='post__image'
                            />
                        </div>
                    </div>
                    <div className='post__footer'>
                        <div
                            className='post__footer__option'
                            onClick={commentHandler}
                        >
                            <ChatBubbleOutline fontSize='small' />
                            <span>{commentCount}</span>
                        </div>
                        <div className='post__footer__option retweet'>
                            <Repeat fontSize='small' />
                            <span>1</span>
                        </div>
                        <div
                            className='post__footer__option like'
                            onClick={likeHandler}
                        >
                            <FavoriteBorder fontSize='small' />
                            <span>{likeCount}</span>
                        </div>
                        <div className='post__footer__option'>
                            <ShareIcon fontSize='small' />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Post;
