import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import './Feed.css';

import TweetBox from './TweetBox/TweetBox';
import Post from './Post/Post';
import Loader from '../Loader/Loader';

import { FETCH_POSTS_QUERY } from '../../util/graphqlQueries';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const { loading, data, refetch } = useQuery(FETCH_POSTS_QUERY);

    if (data && data.getPosts.length !== posts.length) {
        //to avoid nonstop re-renders
        setPosts(data.getPosts);
    }
    console.log(posts);

    const refreshPosts = () => {
        refetch();
    };

    return (
        <div className='feed'>
            <div className='feed__wrapper'>
                <div className='feed__header'>
                    <h2>Home</h2>
                </div>
                <TweetBox refetch={refreshPosts} />

                {loading ? (
                    <Loader />
                ) : (
                    posts &&
                    posts.map((post) => (
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
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Feed;
