import React, { useEffect, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import './LikeButton.css';
import { FavoriteBorder } from '@material-ui/icons';

const LikeButton = ({ post, user }) => {
    const [liked, setLiked] = useState(false);

    const [likePost] = useMutation(LIKE_MUTATION, {
        onCompleted: (res) => {
            console.log(res);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    useEffect(() => {
        if (user && post.likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, post.likes]);

    const likeHandler = () => {
        console.log('liked');
        likePost({ variables: { postId: post.id } });
    };

    return user ? (
        <div className={`post__footer__option like ${liked ? 'active' : ''}`} onClick={likeHandler}>
            <FavoriteBorder fontSize='small' />
            <span>{post.likeCount}</span>
        </div>
    ) : (
        <Link to='/login'>
            <div className={`post__footer__option like`}>
                <FavoriteBorder fontSize='small' />
                <span>{post.likeCount}</span>
            </div>
        </Link>
    );
};

const LIKE_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export default LikeButton;
