import React from 'react';
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
import { Button } from '@material-ui/core';

import SidebarOption from './SidebarOption/SidebarOption';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <TwitterIcon className='sidebar__twitterIcon' />
            <SidebarOption text='Home' Icon={HomeIcon} active />
            <SidebarOption text='Explore' Icon={SearchIcon} />
            <SidebarOption text='Notifications' Icon={NotificationsNoneIcon} />
            <SidebarOption text='Messages' Icon={MailOutlineIcon} />
            <SidebarOption text='Bookmarks' Icon={BookmarBorderIcon} />
            <SidebarOption text='Lists' Icon={ListAltIcon} />
            <SidebarOption text='Profile' Icon={PermIdentityIcon} />
            <SidebarOption text='More' Icon={MoreHorizIcon} />
            <Button variant='outlined' className='sidebar__tweet' fullWidth>
                Tweet
            </Button>
        </div>
    );
};

export default Sidebar;
