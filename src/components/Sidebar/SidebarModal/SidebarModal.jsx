import React from 'react';
import './SidebarModal.css';

import CheckIcon from '@material-ui/icons/Check';
import { Avatar } from '@material-ui/core';


const SidebarModal = () => {
    return (
                <div className="sidebar__logout-modal">
                    <div className="sidebar__logout-modal__top">
                        <Avatar src='https://yt3.ggpht.com/yti/ANoDKi6xkCCtf8mZXcH8iCLgMVoFwJ_Z4xcI-55_wJLrhA=s88-c-k-c0x00ffffff-no-rj-mo' />
                        <div className="sidebar__logout__info">
                            <h6>Pranav Shinde</h6>
                            <p>@pra9shinde</p>
                        </div>
                        <div className="sidebar__logout__more modal">
                            <CheckIcon />
                        </div>
                    </div>

                    <div className="sidebar__logout-modal__bottom">
                        <p style={{borderBottom: '1px solid #eee'}}>Add an existing account</p>
                        <p>Logout @pra9shinde</p>
                    </div>
            
                </div>
        
    )
}

export default SidebarModal
