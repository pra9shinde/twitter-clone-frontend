import React, { useRef } from 'react';
import './CommentRetweet.css';

import CloseIcon from '@material-ui/icons/Close';
import { Avatar } from '@material-ui/core';

import TweetBox from '../Feed/TweetBox/TweetBox';
import { CSSTransition } from 'react-transition-group';

import VerifiedIcon from '../../assets/images/twitter-verified-badge.svg';

const CommentRetweet = ({ showModal, toggleModal }) => {
    const overlayArea = useRef();

    return (
        <CSSTransition in={showModal} appear={showModal} unmountOnExit={true} mountOnEnter={true} timeout={600} classNames='fade'>
            <div className='modal__overlay' onClick={(e) => toggleModal(e, true)}>
                <div className='modal__wrapper' id='modal__overlay' ref={overlayArea}>
                    <div className='modal'>
                        <div className='modal__container'>
                            <div className='modal__header modal-padd'>
                                <div className='post__footer__option modal__close-btn' onClick={toggleModal}>
                                    <CloseIcon />
                                </div>
                            </div>
                            <div className='modal__body modal-padd'>
                                <div className='modal__content'>
                                    <div className='modal__post'>
                                        <div className='modal__profilePic'>
                                            <div className='post__avatar modalStyle'>
                                                <Avatar src='' />
                                            </div>
                                            <div className='modal__vertical__line'></div>
                                        </div>

                                        <div className='post__header'>
                                            <div className='post__headerText'>
                                                <h3>Pranav Shinde</h3>
                                                <span className='post__verified'>
                                                    <img src={VerifiedIcon} alt='' className='verifiedIcon' />
                                                </span>
                                                <span className='post__username'>@pra9shinde · 33m</span>
                                            </div>
                                            <div className='postHeaderDesc'>
                                                <p>
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam dicta quas vero nemo sed minima
                                                    aliquam, mollitia facere animi quibusdam sapiente itaque minus iusto dignissimos ipsum inventore
                                                    magni velit suscipit.
                                                </p>
                                                {/* {imageURL && <img src={`${config.STATIC_FILES_URL}/${imageURL}`} alt='' className='post__image' />} */}
                                            </div>
                                            <div className='modal__replyingTo'>
                                                <p>
                                                    Replying to <span>@pra9shinde</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <TweetBox modal={true} />
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default CommentRetweet;
