import React from 'react';
import './WidgetBox.css';

const WidgetBox = (props) => {
  return (
    <div className="widgetBox">
      <h3>{props.title}</h3>
      {props.children}
    </div>
  );
};

export default WidgetBox;
