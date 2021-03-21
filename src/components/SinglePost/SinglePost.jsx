import React, { useContext, useState } from 'react';
import './SinglePost.css';

import { gql, useQuery } from '@apollo/client';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { ChatBubbleOutline, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PostNotFoundImg from '../../assets/images/post-not-found.svg';
import VerifiedIcon from '../../assets/images/twitter-verified-badge.svg';

import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import Post from '../Feed/Post/Post';
import LikeButton from '../Feed/Post/LikeButton/LikeButton';
import CommentRetweet from '../CommentRetweet/CommentRetweet';
import Loader from '../Loader/Loader';

import config from '../../config';
import { AuthContext } from '../../context/auth';

const SinglePost = (props) => {
    const postId = props.match.params.postId;

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

    const { data, loading } = useQuery(FETCH_POST, { variables: { postId } });

    console.log(data);

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

                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                {data ? (
                                    <>
                                        <div className='singlePost__container'>
                                            <div className='singlePost__body'>
                                                <div className='singlePost__header'>
                                                    <div className='singlePost__avatar'>
                                                        <Avatar src={`${config.STATIC_FILES_URL}/${data.getPost.user.profilePic}`} />
                                                    </div>
                                                    <div className='post__headerText singlePost'>
                                                        <div className='singlePost__header-top'>
                                                            <h3>{data.getPost.user.name}</h3>
                                                            <span className='post__verified'>
                                                                <img src={VerifiedIcon} alt='' className='verifiedIcon' />
                                                            </span>
                                                        </div>

                                                        <p className='post__username singlePost'>@{data.getPost.user.username}</p>
                                                    </div>
                                                </div>
                                                <div className='postHeaderDesc singlePost'>
                                                    <p>{data.getPost.body}</p>
                                                    {data.getPost.imageURL && (
                                                        <img
                                                            src={`${config.STATIC_FILES_URL}/${data.getPost.imageURL}`}
                                                            alt=''
                                                            className='post__image'
                                                        />
                                                    )}
                                                    <p className='singlePost__timestamp'>
                                                        {moment(new Date(data.getPost.createdAt)).format(' h:mm A · MMM D, YYYY')}
                                                    </p>
                                                </div>
                                                <div className='singlePost__footer'>
                                                    <div className='singlePost__footer-top'>
                                                        <div className='item'>
                                                            <span>1</span> Retweet
                                                        </div>
                                                        <div className='item'>
                                                            <span>{data.getPost.commentCount}</span> Comments
                                                        </div>
                                                        <div className='item'>
                                                            <span>{data.getPost.likeCount}</span> Likes
                                                        </div>
                                                    </div>
                                                    <div className='singlePost__footer-bottom'>
                                                        <div className='post__footer__option' onClick={toggleModal}>
                                                            <ChatBubbleOutline fontSize='small' />
                                                            <span>{data.getPost.commentCount}</span>
                                                        </div>
                                                        <div className='post__footer__option retweet'>
                                                            <Repeat fontSize='small' />
                                                            <span>1</span>
                                                        </div>

                                                        <LikeButton
                                                            post={{
                                                                id: data.getPost.id,
                                                                likes: data.getPost.likes,
                                                                likeCount: data.getPost.likeCount,
                                                            }}
                                                        />

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

                                            {data.getPost.comments.forEach((comment) => {
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
                                                />;
                                            })}

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
                                        <CommentRetweet showModal={showModal} toggleModal={toggleModal} />
                                    </>
                                ) : (
                                    <div className='single__post__notfound'>
                                        <h3>Post Not Found!!!</h3>
                                        <img src={PostNotFoundImg} alt='Post deleted or not found' />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <Widgets />
            </div>
        </>
    );
};

const FETCH_POST = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
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
