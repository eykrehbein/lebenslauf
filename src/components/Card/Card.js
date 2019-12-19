import React from 'react';

import './Card.scss';

export default props => (
  <div className="card-component grid h-center">
    <div className="card cell is-6">
      <div className="card-header">
        <p className="title">{props.title}</p>
        {props.closeIcon === true ? (
          <div className="closeIcon" onClick={props.closeIconFunction}>
            <i className="fas fa-times"></i>
          </div>
        ) : null}
      </div>
      <div
        className={
          'card-body ' + (props.splitContent === 'yes' ? 'split-content' : null)
        }
      >
        <div className="content grid">
          <div className="cell is-12" style={{ flexDirection: 'column' }}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  </div>
);
