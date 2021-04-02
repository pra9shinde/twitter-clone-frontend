import React, { useRef, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';

import './CommentedPost.css';

import Post from '../Post';
import { FETCH_POST } from '../../../../util/graphqlQueries';

import ChatIcon from '@material-ui/icons/Chat';
import Loader from '../../../Loader/Loader';
import ServerDownError from '../../../ServerDownError/ServerDownError';
import { Link } from 'react-router-dom';

const CommentedPost = ({ post }) => {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);
    const [commentedUsers, setCommentedUsers] = useState([]);

    const { data, loading } = useQuery(FETCH_POST, { variables: { postId: post.id } });

    useEffect(() => {
        if (data) {
            setHeight(ref.current.clientHeight - 50);
            data.getPost.comments.forEach((c, index) => {
                if (index > 2) {
                    return;
                }
                if (!commentedUsers.includes(c.user.name)) {
                    commentedUsers.push(c.user.name);
                    setCommentedUsers([...commentedUsers]);
                }
            });
        }

        return () => {
            setHeight(0);
        };
    }, [data, commentedUsers]);

    const deleteComment = () => {};

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {data ? (
                        <div className='commented__post'>
                            <p className='user__replied'>
                                <span>
                                    <ChatIcon />
                                </span>
                                <span className='user__replied__username'>
                                    {commentedUsers.length > 0 && commentedUsers.length === 1 && `${commentedUsers[0]} replied`}
                                    {commentedUsers.length > 0 &&
                                        commentedUsers.length > 1 &&
                                        `${commentedUsers[0]} & ${commentedUsers.length - 1} others replied`}
                                </span>
                            </p>
                            <div className='parentPost' ref={ref}>
                                <Post
                                    key={data.getPost.id}
                                    id={data.getPost.id}
                                    createdAt={data.getPost.createdAt}
                                    text={data.getPost.body}
                                    username={data.getPost.username}
                                    commentCount={data.getPost.commentCount}
                                    likes={data.getPost.likes}
                                    likeCount={data.getPost.likeCount}
                                    imageURL={data.getPost.imageURL}
                                    userDetails={data.getPost.user}
                                />
                            </div>

                            <div className='replyingPost'>
                                {data.getPost.comments.map((comment, index) => {
                                    return (
                                        index < 2 && (
                                            <div className='comment__post' key={comment.id}>
                                                <div className='verticle__line__replyPost' style={{ height: height }}></div>
                                                <Post
                                                    id={comment.id}
                                                    createdAt={comment.createdAt}
                                                    text={comment.body}
                                                    username={comment.username}
                                                    commentCount={comment.commentCount}
                                                    likes={comment.likes}
                                                    likeCount={comment.likeCount}
                                                    imageURL={comment.imageURL}
                                                    userDetails={comment.user}
                                                    isComment={comment.isComment}
                                                    parentPostId={comment.replyingTo}
                                                    deleteCallback={deleteComment}
                                                />
                                            </div>
                                        )
                                    );
                                })}

                                {data.getPost.comments.length > 2 && (
                                    <div className='loadMore___comments'>
                                        <Link to={`/posts/${data.getPost.id}`}>
                                            <Button variant='outlined' className='secondary__btn' style={{ height: '30px' }}>
                                                Show more!
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <ServerDownError />
                    )}
                </>
            )}
        </>
    );
};

export default CommentedPost;
