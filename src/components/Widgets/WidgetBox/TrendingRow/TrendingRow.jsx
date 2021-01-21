import React from 'react';
import './TrendingRow.css';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const TrendingRow = (props) => {
  return (
    <div className="trendingRow">
      <div className="trendingRow__left">
        <h6>{props.smallHeader}</h6>
        <h5>{props.bigHeader}</h5>
        <p>{props.bottomHeader}</p>
      </div>
      <div className="trendingRow__right">{props.more ? <MoreHorizIcon /> : <img src={props.imgUrl} alt="" />}</div>
    </div>
  );
};

export default TrendingRow;
