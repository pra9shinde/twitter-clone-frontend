import React, { useState } from 'react';
import './DeleteButton.css';

import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Modal from '../../../Modal/Modal';

import { FETCH_POSTS_QUERY } from '../../../../util/graphqlQueries';

const DeleteButton = ({ postId, callback, isComment, parentPostId }) => {
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

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: { postId },
        onCompleted: (res) => {
            setshowModal(false);
        },
        onError: (err) => console.log(err),
        update: (proxy, result) => {
            // Remove Post from Cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });

            if (data) {
                let newData = data.getPosts.filter((p) => p.id !== postId); //get old posts from cache except this post

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

    const [deletePostComment] = useMutation(DELETE_POST_COMMENT_MUTATION, {
        variables: { parentPostId: parentPostId, commentId: postId },
        update: (proxy, result) => {
            console.log('comment deleted successfully');
        },
        onError: (e) => console.log(e),
    });

    const deleteHandler = () => {
        if (isComment && parentPostId) {
            //Comment is deleted from singlePost
            deletePostComment();
        }
        deletePost();
        if (callback) {
            callback();
        }
    };

    return (
        <>
            <div className='post__footer__option delete' onClick={toggleModal}>
                <DeleteOutlineIcon fontSize='small' />
            </div>

            {/* Confirm Modal */}
            <Modal showModal={showModal} toggleModal={toggleModal} modalTitle='Delete Tweet'>
                <div className='confirmDelete'>
                    <h3>After confirming, this post will be permanently deleted and cannot be recovered.</h3>
                    <h4>Are you sure?</h4>
                    <div className='confirmDelete__buttons'>
                        <Button
                            variant='outlined'
                            className='secondary__btn'
                            style={{ width: '104px', height: '38px', marginRight: '10px' }}
                            onClick={toggleModal}
                        >
                            Cancel
                        </Button>
                        <Button type='submit' className='tweetBox__btn' onClick={deleteHandler}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

const DELETE_POST_COMMENT_MUTATION = gql`
    mutation deletePostComment($parentPostId: ID!, $commentId: ID!) {
        deletePostComment(parentPostId: $parentPostId, commentId: $commentId) {
            id
            body
            comments {
                id
                body
            }
        }
    }
`;

export default DeleteButton;
