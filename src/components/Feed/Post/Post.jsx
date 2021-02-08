import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./Post.css";

import { Avatar } from "@material-ui/core";
import { ChatBubbleOutline, FavoriteBorder, Repeat } from "@material-ui/icons";
import ShareIcon from "@material-ui/icons/Share";
import config from "../../../config";

const VerifiedIcon = require("../../../assets/images/twitter-verified-badge.svg");

const Post = ({ id, displayName, username, verified, text, likeCount, commentCount, likes, createdAt, imageURL, userDetails }) => {
    function commentHandler() {
        console.log("Comment Handler");
    }

    function likeHandler() {
        console.log("Like Handler");
    }

    return (
        <Link to={`/posts/${id}`}>
            <div className="post">
                <div className="post__avatar">
                    <Avatar src={`${config.STATIC_FILES_URL}/${userDetails.profilePic}`} />
                </div>
                <div className="post__body">
                    <div className="post__header">
                        <div className="post__headerText">
                            <h3>{userDetails.name}</h3>
                            <span className="post__verified">
                                <img src={VerifiedIcon.default} alt="" className="verifiedIcon" />
                            </span>
                            <span className="post__username">
                                @{username} · {moment(new Date(createdAt)).fromNow()}
                            </span>
                        </div>
                        <div className="postHeaderDesc">
                            <p>{text}</p>
                            {imageURL && <img src={`${config.STATIC_FILES_URL}/${imageURL}`} alt="" className="post__image" />}
                        </div>
                    </div>
                    <div className="post__footer">
                        <div className="post__footer__option" onClick={commentHandler}>
                            <ChatBubbleOutline fontSize="small" />
                            <span>{commentCount}</span>
                        </div>
                        <div className="post__footer__option retweet">
                            <Repeat fontSize="small" />
                            <span>1</span>
                        </div>
                        <div className="post__footer__option like" onClick={likeHandler}>
                            <FavoriteBorder fontSize="small" />
                            <span>{likeCount}</span>
                        </div>
                        <div className="post__footer__option">
                            <ShareIcon fontSize="small" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Post;
