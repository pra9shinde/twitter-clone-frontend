import React, { useContext, useState, useRef, useEffect  } from 'react';
import { useHistory } from "react-router-dom";
import './SinglePost.css';

import { gql, useQuery } from '@apollo/client';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { ChatBubbleOutline, Repeat } from '@material-ui/icons';
import ShareIcon from '@material-ui/icons/Share';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PostNotFoundImg from '../../assets/images/post-not-found.svg';
import VerifiedIcon from '../../assets/images/twitter-verified-badge.svg';

import Sidebar from '../Sidebar/Sidebar';
import Widgets from '../Widgets/Widgets';
import Post from '../Feed/Post/Post';
import LikeButton from '../Feed/Post/LikeButton/LikeButton';
import Loader from '../Loader/Loader';
import Modal from '../Modal/Modal';
import TweetBox from '../Feed/TweetBox/TweetBox';

import config from '../../config';
import { AuthContext } from '../../context/auth';
import DeleteButton from '../Feed/Post/DeleteButton/DeleteButton';

const SinglePost = (props) => {
    const history = useHistory();
    const ref = useRef(null);

    const [height, setHeight] = useState(0);
    const [showModal, setshowModal] = useState(false);

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);

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
  
    const deleteCallback = () => {
        props.history.push('/');
    };

    useEffect(() => {
        if(showModal){
            setHeight(ref.current.clientHeight - 20);
        }
    }, [showModal]);

    return (
        <>
            <div className='home'>
                <Sidebar />
                <div className='feed'>
                    <div className='feed__wrapper'>
                        <div className='feed__header singlePost'>
                            <div className='feed__header-back-btn post__footer__option' onClick={() => history.goBack()}>
                                <ArrowBackIcon />
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
                                                        {user && data.getPost.user.username === user.username && (
                                                            <DeleteButton postId={data.getPost.id} callback={deleteCallback} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {data.getPost.comments.map((comment) => (
                                                <Post
                                                    key={comment.id}
                                                    id={comment.id}
                                                    username={comment.username}
                                                    text={comment.body}
                                                    likeCount={comment.likeCount}
                                                    commentCount={comment.commentCount}
                                                    likes={comment.likes}
                                                    createdAt={comment.createdAt}
                                                    imageURL={comment.imageURL}
                                                    userDetails={comment.user}
                                                />
                                            ))}
                                        </div>

                                        {/* Reply Modal */}
                                        <Modal showModal={showModal} toggleModal={toggleModal}>
                                            <div className='modal__post' ref={ref} >
                                                <div className='modal__profilePic'>
                                                    <div className='post__avatar modalStyle'>
                                                        <Avatar src={`${config.STATIC_FILES_URL}/${data.getPost.user.profilePic}`} />
                                                    </div>
                                                    <div className='modal__vertical__line' style={{height: height}} ></div>
                                                </div>

                                                <div className='post__header'>
                                                    <div className='post__headerText'>
                                                        <h3>{data.getPost.user.name}</h3>
                                                        <span className='post__verified'>
                                                            <img src={VerifiedIcon} alt='' className='verifiedIcon' />
                                                        </span>
                                                        <span className='post__username'>@{data.getPost.user.username} · {moment(new Date(data.getPost.createdAt)).fromNow()}</span>
                                                    </div>
                                                    <div className='postHeaderDesc'>
                                                        <p>
                                                            {data.getPost.body}
                                                        </p>
                                                        {data.getPost.imageURL && (
                                                            <img
                                                                src={`${config.STATIC_FILES_URL}/${data.getPost.imageURL}`}
                                                                alt=''
                                                                className='post__image'
                                                            />
                                                        )}
                                                    </div>
                                                    <div className='modal__replyingTo'>
                                                        <p>
                                                            Replying to <span>@{data.getPost.user.username}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <TweetBox modal={true} />
                                        </Modal>
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
            comments{
                id
                body
                createdAt
                username
                likes{
                    id
                    username
                }
                likeCount
                commentCount
                imageURL
                user{
                    id
                    email
                    username
                    name
                    profilePic
                }
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
