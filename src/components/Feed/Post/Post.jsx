import React, { useContext } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './Post.css';

import { Avatar } from '@material-ui/core';
import { ChatBubbleOutline, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import config from '../../../config';

import { AuthContext } from '../../../context/auth';
import LikeButton from './LikeButton/LikeButton';
import DeleteButton from './DeleteButton/DeleteButton';

const VerifiedIcon = require('../../../assets/images/twitter-verified-badge.svg');

const Post = ({ id, username, verified, text, likeCount, commentCount, likes, createdAt, imageURL, userDetails, isComment, parentPostId }) => {
    const { user } = useContext(AuthContext);

    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar src={`${config.STATIC_FILES_URL}/${userDetails.profilePic}`} />
            </div>
            <div className='post__body'>
                <div className='post__header'>
                    <div className='post__headerText'>
                        <h3>{userDetails.name}</h3>
                        <span className='post__verified'>
                            <img src={VerifiedIcon.default} alt='' className='verifiedIcon' />
                        </span>
                        <span className='post__username'>
                            @{username} · {moment(new Date(createdAt)).fromNow()}
                        </span>
                    </div>
                    <Link to={`/posts/${id}`}>
                        <div className='postHeaderDesc'>
                            <p>{text}</p>
                            {imageURL && <img src={`${config.STATIC_FILES_URL}/${imageURL}`} alt='' className='post__image' />}
                        </div>
                    </Link>
                </div>
                <div className='post__footer'>
                    <Link to={`/posts/${id}`}>
                        <div className='post__footer__option'>
                            <ChatBubbleOutline fontSize='small' />
                            <span>{commentCount}</span>
                        </div>
                    </Link>
                    <div className='post__footer__option retweet'>
                        <Repeat fontSize='small' />
                        <span>1</span>
                    </div>

                    <LikeButton post={{ id, likes, likeCount }} />

                    <div className='post__footer__option'>
                        <ShareIcon fontSize='small' />
                    </div>
                    {user && username === user.username && <DeleteButton postId={id} isComment={isComment} parentPostId={parentPostId} />}
                </div>
            </div>
        </div>
    );
};

export default Post;
