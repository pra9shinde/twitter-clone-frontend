import React, { useEffect, useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';

import './LikeButton.css';
import { AuthContext } from '../../../../context/auth';
import LikeBtnImg from '../../../../assets/images/web_heart_animation.png';

const LikeButton = ({ post, isComment, parentPostId }) => {
    const { user } = useContext(AuthContext);

    const [liked, setLiked] = useState(false);
    const [animate, setAnimate] = useState(false);

    const [likePost] = useMutation(LIKE_MUTATION, {
        onCompleted: (res) => {
            setAnimate(true);
            setLiked(!liked);
            setAnimate(false);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    useEffect(() => {
        if (user && post.likes.find((like) => like.username === user.username)) {
            setLiked(true);
            setAnimate(false);
        } else {
            setLiked(false);
        }
    }, [user, post.likes]);

    const likeHandler = () => {
        likePost({ variables: { postId: post.id } });
        if (liked) {
            setAnimate(false);
        }
    };

    return user ? (
        <div className='post__footer__like__btn '>
            <div
                className={`like-btn-svg ${liked ? 'active animate' : ''}`}
                onClick={likeHandler}
                style={{ backgroundImage: 'url(' + LikeBtnImg + ')' }}
            ></div>
            <span>{post.likeCount}</span>
        </div>
    ) : (
        // <div className={`post__footer__option like ${liked ? 'active' : ''}`} onClick={likeHandler}>
        //     <FavoriteBorder fontSize='small' />
        //     <span>{post.likeCount}</span>
        // </div>
        <Link to='/login'>
            <div className='post__footer__like__btn '>
                <div className={`like-btn-svg`} style={{ backgroundImage: 'url(' + LikeBtnImg + ')' }}></div>
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
