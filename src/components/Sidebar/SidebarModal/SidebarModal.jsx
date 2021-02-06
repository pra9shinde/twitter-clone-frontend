import React, { useContext } from "react";
import "./SidebarModal.css";

import CheckIcon from "@material-ui/icons/Check";
import { Avatar } from "@material-ui/core";

import { AuthContext } from "../../../context/auth";
import config from "../../../config";

const SidebarModal = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="sidebar__logout-modal">
            <div className="sidebar__logout-modal__top">
                <Avatar src={`${config.STATIC_FILES_URL}/${user.profilePic}`} />
                <div className="sidebar__logout__info">
                    <h6>{user.name}</h6>
                    <p>{user.username}</p>
                </div>
                <div className="sidebar__logout__more modal">
                    <CheckIcon />
                </div>
            </div>

            <div className="sidebar__logout-modal__bottom">
                <p style={{ borderBottom: "1px solid #eee" }}>Add an existing account</p>
                <p onClick={logout}>Logout @pra9shinde</p>
            </div>
        </div>
    );
};

export default SidebarModal;
