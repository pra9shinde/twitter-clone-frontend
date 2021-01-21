import React from 'react';
import './Widgets.css';
import { Search } from '@material-ui/icons';
import WidgetBox from './WidgetBox/WidgetBox';
import TrendingRow from './WidgetBox/TrendingRow/TrendingRow';
import FollowRow from './WidgetBox/FollowRow/FollowRow';

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <Search className="widgets__searchIcon" />
        <input type="text" placeholder="Search Twitter" />
      </div>

      {/* Trending */}
      <WidgetBox title="What’s happening">
        <TrendingRow
          smallHeader="COVID-19 . LIVE"
          bigHeader="COVID-19 in India"
          bottomHeader="145K Tweets"
          more={false}
          imgUrl="https://pbs.twimg.com/semantic_core_img/1255575536824233984/CiLy4der?format=jpg&name=240x240"
        />
        <TrendingRow
          smallHeader="Politics · Trending"
          bigHeader="#TrumpGoneModiNext"
          bottomHeader="12.4K Tweets"
          more={true}
        />
        <TrendingRow
          smallHeader="Trending in India"
          bigHeader="#NoRepealNoGharWapsi"
          bottomHeader="146K Tweets"
          more={true}
        />
        <TrendingRow
          smallHeader="News. 3 hours ago"
          bigHeader="Five people die in fire at Serum Institute of India"
          bottomHeader="#SerumInstituteofIndia"
          more={false}
          imgUrl="https://pbs.twimg.com/semantic_core_img/1352217439795232768/C6wSsjcB?format=jpg&name=240x240"
        />
      </WidgetBox>

      {/* Whom to follow */}
      <WidgetBox title="Who to follow">
        <FollowRow
          name="Salman Nizami"
          username="@SalmanNizami_"
          imageUrl="https://pbs.twimg.com/profile_images/1347460090480115715/a-DFEJRc_bigger.jpg"
          verified
        />
        <FollowRow name="John Doe" username="@john_111" imageUrl="https://randomuser.me/api/portraits/men/62.jpg" />
        <FollowRow
          name="Pranav Shinde"
          username="@pra9shinde"
          imageUrl="https://yt3.ggpht.com/yti/ANoDKi6xkCCtf8mZXcH8iCLgMVoFwJ_Z4xcI-55_wJLrhA=s88-c-k-c0x00ffffff-no-rj-mo"
          verified
        />
      </WidgetBox>
    </div>
  );
};

export default Widgets;
