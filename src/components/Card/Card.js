import React from 'react';

import './Card.scss';

export default props => (
  <div className="card-component grid h-center">
    <div className="card cell is-6">
      <div className="card-header">
        <p className="title">{props.title}</p>
      </div>
      <div
        className={
          'card-body ' + (props.splitContent === 'yes' ? 'split-content' : null)
        }
      >
        {props.children}
      </div>
    </div>
  </div>
);
