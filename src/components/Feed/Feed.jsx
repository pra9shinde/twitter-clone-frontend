import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import "./Feed.css";

import TweetBox from "./TweetBox/TweetBox";
import Post from "./Post/Post";
import Loader from "../Loader/Loader";

const Feed = () => {
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    let posts = data ? data.getPosts : null;
    // console.log(posts);

    return (
        <div className="feed">
            <div className="feed__wrapper">
                <div className="feed__header">
                    <h2>Home</h2>
                </div>
                <TweetBox />

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
                            likeCount={post.likeCount}
                        />
                    ))
                )}

                {/* <Post />
                <Post /> */}
            </div>
        </div>
    );
};

const FETCH_POSTS_QUERY = gql`
    query {
        getPosts {
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
        }
    }
`;

export default Feed;
