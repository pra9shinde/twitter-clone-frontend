import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { Button, Avatar } from '@material-ui/core';

import SidebarOption from './SidebarOption/SidebarOption';
import SidebarModel from './SidebarModal/SidebarModal';

import { CSSTransition } from 'react-transition-group';
import { AuthContext } from '../../context/auth';
import config from '../../config';

const Sidebar = () => {
    const { user } = useContext(AuthContext);

    const [showModal, setShowModal] = useState(false);
    const [shrink, setShrink] = useState(false);

    const modalHandler = () => {
        setShowModal(!showModal);
    };

    const toggleSidebar = () => {
        setShrink(!shrink);
    };

    const windowResizeHandler = () => {
        // effect
        if (window.innerWidth <= 768) {
            setShrink(true);
        }
    };

    useEffect(() => {
        windowResizeHandler();
        window.addEventListener('resize', windowResizeHandler);
        return () => window.removeEventListener('resize', windowResizeHandler);
    }, []);

    return (
        <div className={`sidebar ${shrink ? 'shrink' : ''} `}>
            <div className='sidebar__menus'>
                <Link to='/'>
                    <div className='siderbar__lg'>
                        <TwitterIcon className='sidebar__twitterIcon' />
                        <h1 className='hide'>
                            <span>Shinde</span>tter
                        </h1>

                        <div className='sidebar__shrink-btn' onClick={toggleSidebar}>
                            {shrink ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </div>
                    </div>

                    <SidebarOption text='Home' Icon={HomeIcon} to='/' active />
                </Link>

                <SidebarOption text='Explore' Icon={SearchIcon} to='/' />
                <SidebarOption text='Notifications' Icon={NotificationsNoneIcon} to='/' />
                <SidebarOption text='Messages' Icon={MailOutlineIcon} to='/' />
                <SidebarOption text='Bookmarks' Icon={BookmarBorderIcon} to='/' />
                <SidebarOption text='Lists' Icon={ListAltIcon} to='/' />
                <SidebarOption text='Profile' Icon={PermIdentityIcon} to='/' />
                <Link to='/login'>
                    <SidebarOption text='Register' Icon={PersonAddIcon} />
                </Link>
                <Button variant='outlined' className='sidebar__tweet hide'>
                    Tweet
                </Button>
            </div>

            <div className='sidebar__logout' onClick={modalHandler}>
                <div className='sidebar__logout__container'>
                    <div className='sidebar__logout__image'>
                        <Avatar src={`${config.STATIC_FILES_URL}/${user.profilePic}`} />

                        {/* Modal */}
                        <CSSTransition in={showModal} timeout={250} classNames='sidebar__logout-modal' unmountOnExit={true}>
                            <SidebarModel />

                            {/* {showModal ? (
                                    <SidebarModel />
                                ): (
                                    <div className="none"></div>
                                )} */}
                        </CSSTransition>
                        {/* Modal */}
                    </div>

                    <div className='sidebar__logout__info hide'>
                        <h6>{user.name}</h6>
                        <p>@{user.username}</p>
                    </div>

                    <div className='sidebar__logout__more hide'>
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
