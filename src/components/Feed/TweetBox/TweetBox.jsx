import React, { useState, useContext, useRef } from 'react';
import './TweetBox.css';
import { Button, Avatar } from '@material-ui/core';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import GifIcon from '@material-ui/icons/Gif';
import PollIcon from '@material-ui/icons/Poll';
import MoodIcon from '@material-ui/icons/Mood';
import EventIcon from '@material-ui/icons/Event';
import Loader from '../../Loader/Loader';

import { AuthContext } from '../../../context/auth';
import config from '../../../config';
import { useMutation, gql } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../../../util/graphqlQueries';

const TweetBox = ({ modal, isComment, replyingTo, callback }) => {
    const { user } = useContext(AuthContext);

    const [errors, setErrors] = useState('');
    const [showLoader, setShowLoader] = useState(false);
    const [inputFocus, setInputFocus] = useState(false);
    const inputFocusedHandler = () => {
        setInputFocus(!inputFocus);
    };

    const [values, setValues] = useState({
        body: '',
        image: false,
    });

    const inputFile = useRef(null);

    const inputChangeHandler = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const openFileDialog = () => {
        inputFile.current.click();
    };

    const fileDialogChange = (event) => {
        setValues({ ...values, image: !values.image });

        var oFReader = new FileReader();
        oFReader.readAsDataURL(document.getElementById('image').files[0]);

        oFReader.onload = function (oFREvent) {
            document.getElementById('uploadPreview').src = oFREvent.target.result;
        };
    };

    // Apollo POST Request
    const [createPost] = useMutation(CREATE_POST, {
        onCompleted: (res) => {
            document.getElementById('tweetbox-form').reset();
            const uploadEl = document.getElementById('uploadPreview');
            if (uploadEl) {
                uploadEl.src = '';
            }
            setValues({ ...values, image: false });
            setShowLoader(false);
            if (callback) callback(); //close the comment modal
        },
        onError: (err) => {
            console.log(err);
            const displayError = err.graphQLErrors[0].message ? err.graphQLErrors[0].message : err;
            setErrors(displayError);
            setShowLoader(false);
            if (callback) callback(); //close the comment modal
        },
        update: (proxy, result) => {
            // Access Cache Data so no need to refetch again from server
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });

            if (data) {
                let newData = [...data.getPosts]; //get old posts from cache
                newData = [result.data.createPost, ...newData]; //append new post data

                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        ...data,
                        getPosts: { newData },
                    },
                }); //update cache with newly updated data
            }
        },
    });

    const postSubmitHandler = (e) => {
        e.preventDefault();
        setShowLoader(true);
        const fileEl = document.getElementById('image');
        const file = fileEl.files[0];

        if (isComment && replyingTo) {
            createPost({ variables: { ...values, image: file, isComment, replyingTo } });
        } else {
            createPost({ variables: { ...values, image: file } });
        }
    };

    return (
        <div className='tweetBox'>
            <form onSubmit={postSubmitHandler} id='tweetbox-form'>
                <div className={`tweetBox__input ${inputFocus ? 'active' : ''}`}>
                    <Avatar src={`${config.STATIC_FILES_URL}/${user.profilePic}`} />
                    <input
                        type='text'
                        name='body'
                        placeholder={modal ? 'Tweet your reply' : "What's happening?"}
                        onFocus={inputFocusedHandler}
                        onBlur={inputFocusedHandler}
                        onChange={inputChangeHandler}
                    />
                </div>

                <input type='file' name='image' id='image' ref={inputFile} style={{ display: 'none' }} onChange={fileDialogChange} />
                {values.image ? <img alt='' id='uploadPreview' /> : null}

                {errors && (
                    <div className='errors'>
                        <p>{errors}</p>
                    </div>
                )}

                <div className='tweetBox__submit'>
                    <div className='tweetBox__submit-left'>
                        <div className='icon' onClick={openFileDialog}>
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
                        {showLoader ? (
                            <Loader />
                        ) : (
                            <Button type='submit' className='tweetBox__btn'>
                                Tweet
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

const CREATE_POST = gql`
    mutation createPost($body: String!, $image: Upload, $isComment: Boolean, $replyingTo: ID) {
        createPost(body: $body, image: $image, isComment: $isComment, replyingTo: $replyingTo) {
            id
            body
            createdAt
            username
            likes {
                id
                username
                createdAt
            }
            likeCount
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
            imageURL
            isComment
            replyingTo
        }
    }
`;

export default TweetBox;
