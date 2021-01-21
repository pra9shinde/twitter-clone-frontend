import React from 'react';
import './FollowRow.css';
import { Button } from '@material-ui/core';

const VerifiedIcon = require('../../../../assets/images/twitter-verified-badge.svg');

const FollowRow = ({ name, username, imageUrl, verified }) => {
  return (
    <div className="followRow">
      <img src={imageUrl} alt="" className="followRow__profilePic" />
      <div className="followRow__details">
        <div className="followRow__details__name">
          <h6>{name}</h6>
          {verified && (
            <span className="post__verified">
              <img src={VerifiedIcon.default} alt="" className="verifiedIcon" />
            </span>
          )}
        </div>
        <div className="followRow__details__username">
          <p>{username}</p>
        </div>
      </div>
      <Button variant="outlined" className="secondary__btn" style={{ height: '35px' }}>
        Follow
      </Button>
    </div>
  );
};

export default FollowRow;
