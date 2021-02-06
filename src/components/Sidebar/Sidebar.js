import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

import TwitterIcon from "@material-ui/icons/Twitter";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { Button, Avatar } from "@material-ui/core";

import SidebarOption from "./SidebarOption/SidebarOption";
import SidebarModel from "./SidebarModal/SidebarModal";

import { CSSTransition } from "react-transition-group";
import { AuthContext } from "../../context/auth";
import config from "../../config";

const Sidebar = () => {
    const { user } = useContext(AuthContext);
    console.log(user);

    const [showModal, setShowModal] = useState(false);

    const modalHandler = () => {
        setShowModal(!showModal);
    };

    return (
        <div className="sidebar">
            <div className="sidebar__menus">
                <TwitterIcon className="sidebar__twitterIcon" />
                <SidebarOption text="Home" Icon={HomeIcon} active />
                <SidebarOption text="Explore" Icon={SearchIcon} />
                <SidebarOption text="Notifications" Icon={NotificationsNoneIcon} />
                <SidebarOption text="Messages" Icon={MailOutlineIcon} />
                <SidebarOption text="Bookmarks" Icon={BookmarBorderIcon} />
                <SidebarOption text="Lists" Icon={ListAltIcon} />
                <SidebarOption text="Profile" Icon={PermIdentityIcon} />
                <Link to="/login" style={{ color: "inherit", textDecoration: "inherit" }}>
                    <SidebarOption text="Register" Icon={PersonAddIcon} />
                </Link>
                <Button variant="outlined" className="sidebar__tweet" fullWidth>
                    Tweet
                </Button>
            </div>

            <div className="sidebar__logout" onClick={modalHandler}>
                <div className="sidebar__logout__container">
                    <div className="sidebar__logout__image">
                        <Avatar src={`${config.STATIC_FILES_URL}/${user.profilePic}`} />

                        {/* Modal */}
                        <CSSTransition in={showModal} timeout={250} classNames="sidebar__logout-modal" unmountOnExit={true}>
                            <SidebarModel />

                            {/* {showModal ? (
                                    <SidebarModel />
                                ): (
                                    <div className="none"></div>
                                )} */}
                        </CSSTransition>
                        {/* Modal */}
                    </div>

                    <div className="sidebar__logout__info">
                        <h6>{user.name}</h6>
                        <p>@{user.username}</p>
                    </div>

                    <div className="sidebar__logout__more">
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
