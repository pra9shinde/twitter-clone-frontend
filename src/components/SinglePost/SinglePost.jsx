import React, { useContext, useState } from 'react';
import './SinglePost.css';

import { gql } from '@apollo/client';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { ChatBubbleOutline, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import Post from '../Feed/Post/Post';
import LikeButton from '../Feed/Post/LikeButton/LikeButton';
import CommentRetweet from '../CommentRetweet/CommentRetweet';

import { AuthContext } from '../../context/auth';
const VerifiedIcon = require('../../assets/images/twitter-verified-badge.svg');

const SinglePost = () => {
    const { user } = useContext(AuthContext);
    const [showModal, setshowModal] = useState(false);

    const toggleModal = (e, overlay) => {
        if (overlay) {
            if (e.target.id !== 'modal__overlay') {
                return;
            } else {
                setshowModal(false);
            }
        } else {
            setshowModal(!showModal);
        }
    };

    return (
        <>
            <div className='home'>
                <Sidebar />
                <div className='feed'>
                    <CommentRetweet />

                    <div className='feed__wrapper'>
                        <div className='feed__header singlePost'>
                            <div className='feed__header-back-btn post__footer__option'>
                                <Link to='/'>
                                    <ArrowBackIcon />
                                </Link>
                            </div>
                            <h2>Tweet</h2>
                        </div>

                        <div className='singlePost__container'>
                            <div className='singlePost__body'>
                                <div className='singlePost__header'>
                                    <div className='singlePost__avatar'>
                                        <Avatar src='https://yt3.ggpht.com/yti/ANoDKi6xkCCtf8mZXcH8iCLgMVoFwJ_Z4xcI-55_wJLrhA=s88-c-k-c0x00ffffff-no-rj-mo' />
                                    </div>
                                    <div className='post__headerText singlePost'>
                                        <div className='singlePost__header-top'>
                                            <h3>Pranav Shinde</h3>
                                            <span className='post__verified'>
                                                <img src={VerifiedIcon.default} alt='' className='verifiedIcon' />
                                            </span>
                                        </div>

                                        <p className='post__username singlePost'>@pra9shinde</p>
                                    </div>
                                </div>
                                <div className='postHeaderDesc singlePost'>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quis sapiente excepturi culpa, hic, praesentium
                                        ipsum eum reprehenderit inventore dicta assumenda. Perspiciatis dolore ea nihil autem, aliquid architecto
                                        laboriosam voluptatem!
                                    </p>
                                    {/* {imageURL && <img src={`${config.STATIC_FILES_URL}/${imageURL}`} alt='' className='post__image' />} */}
                                    <p className='singlePost__timestamp'>1:43 AM · Mar 17, 2021</p>
                                </div>
                                <div className='singlePost__footer'>
                                    <div className='singlePost__footer-top'>
                                        <div className='item'>
                                            <span>1</span> Retweet
                                        </div>
                                        <div className='item'>
                                            <span>13</span> Comments
                                        </div>
                                        <div className='item'>
                                            <span>50</span> Likes
                                        </div>
                                    </div>
                                    <div className='singlePost__footer-bottom'>
                                        <div className='post__footer__option' onClick={toggleModal}>
                                            <ChatBubbleOutline fontSize='small' />
                                            <span>13</span>
                                        </div>
                                        <div className='post__footer__option retweet'>
                                            <Repeat fontSize='small' />
                                            <span>1</span>
                                        </div>

                                        <LikeButton post={{ id: '1371917645356830720', likes: [{ username: 'pra9shinde' }], likeCount: 50 }} />

                                        <div className='post__footer__option'>
                                            <ShareIcon fontSize='small' />
                                        </div>
                                        {/* {user && username === user.username && (
                                    <div className='post__footer__option delete'>
                                        <DeleteOutlineIcon fontSize='small' />
                                    </div>
                                )} */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Post
                            id='6044d867d18c7103e85002aa'
                            createdAt='2021-02-08T06:36:00.237Z'
                            text='First Tweet!!!!'
                            username='test'
                            commentCount='10'
                            likes={[{ username: 'pra9shinde' }]}
                            likeCount='10'
                            userDetails={{
                                email: 'test@test.com',
                                username: 'qwe',
                                name: 'test',
                                profilePic: 'http://localhost:4000/uploads/images/pranav.jpg',
                                createdAt: '2021-02-03T04:54:39.615Z',
                            }}
                        />

                        <Post
                            id='6044d867d18c7103e85002aa'
                            createdAt='2021-02-08T06:36:00.237Z'
                            text='First Tweet!!!!'
                            username='test'
                            commentCount='10'
                            likes={[{ username: 'pra9shinde' }]}
                            likeCount='10'
                            userDetails={{
                                email: 'test@test.com',
                                username: 'qwe',
                                name: 'test',
                                profilePic: 'http://localhost:4000/uploads/images/pranav.jpg',
                                createdAt: '2021-02-03T04:54:39.615Z',
                            }}
                        />
                    </div>
                </div>
                <Widgets />
            </div>

            <CommentRetweet showModal={showModal} toggleModal={toggleModal} />
        </>
    );
};

const FETCH_POST = gql`
    query {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
            imageURL
            user {
                id
                email
                username
                createdAt
                name
                profilePic
            }
        }
    }
`;

export default SinglePost;
