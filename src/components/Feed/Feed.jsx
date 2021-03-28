import React from 'react';
import { useQuery } from '@apollo/client';

import './Feed.css';

import TweetBox from './TweetBox/TweetBox';
import Post from './Post/Post';
import Loader from '../Loader/Loader';
import ServerDownError from '../ServerDownError/ServerDownError';

import { FETCH_POSTS_QUERY } from '../../util/graphqlQueries';

const Feed = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    return (
        <div className='feed'>
            <div className='feed__wrapper'>
                <div className='feed__header'>
                    <h2>Home</h2>
                </div>
                <TweetBox />

                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {data ? (
                            data.getPosts.map((post) => (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    createdAt={post.createdAt}
                                    text={post.body}
                                    username={post.username}
                                    commentCount={post.commentCount}
                                    likes={post.likes}
                                    likeCount={post.likeCount}
                                    imageURL={post.imageURL}
                                    userDetails={post.user}
                                    isComment={post.isComment}
                                    parentPostId={post.replyingTo}
                                />
                            ))
                        ) : (
                            <ServerDownError />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Feed;
