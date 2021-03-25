import React, { useState } from 'react';
import './DeleteButton.css';

import { Button } from '@material-ui/core';
import { gql, useMutation } from '@apollo/client';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Modal from '../../../Modal/Modal';

import { FETCH_POSTS_QUERY } from '../../../../util/graphqlQueries';

const DeleteButton = ({ postId, callback }) => {
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
            if (callback) {
                callback();
            }
        },
        update: (proxy, result) => {
            // Remove Post from Cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY,
            });

           if(data){
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

    const deleteHandler = () => {
        deletePost();
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

export default DeleteButton;
