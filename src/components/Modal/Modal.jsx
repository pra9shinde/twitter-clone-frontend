import React from 'react';
import './Modal.css';

import { CSSTransition } from 'react-transition-group';
import CloseIcon from '@material-ui/icons/Close';

const Modal = ({ showModal, toggleModal, modalTitle, children }) => {
    return (
        <CSSTransition in={showModal} appear={showModal} unmountOnExit={true} mountOnEnter={true} timeout={600} classNames='fade'>
            <div className='modal__overlay' onClick={(e) => toggleModal(e, true)}>
                <div className='modal__wrapper' id='modal__overlay'>
                    <div className='modal'>
                        <div className='modal__container'>
                            <div className='modal__header'>
                                <div className='post__footer__option modal__close-btn' onClick={toggleModal}>
                                    <CloseIcon />
                                </div>
                                {modalTitle && <h5>{modalTitle}</h5>}
                            </div>
                            <div className='modal__body modal-padd'>
                                <div className='modal__content'>{children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default Modal;
