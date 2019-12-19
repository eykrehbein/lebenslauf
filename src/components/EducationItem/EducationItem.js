import React from 'react';

import './EducationItem.scss';

export default props => (
  <div className="educationItem card">
    <div className="card-header">
      <p className="educationTitle">
        {props.educationItem.educationTypeString}
      </p>
      <div className="editIcon" onClick={props.editClicked}>
        <i className="fas fa-pen"></i>
      </div>
    </div>
    <div className="card-body">
      <div className="row">
        Schule/Hochschule: <b>{props.educationItem.school}</b>
      </div>
      <div className="row">
        Fachrichtung: <b>{props.educationItem.subject}</b>
      </div>
      <div className="row">
        Zeitraum:{' '}
        <b>
          {props.educationItem.educationStart} -{' '}
          {props.educationItem.educationEnd}
        </b>
      </div>
      <div className="row">
        Abschlussnote: <b>{props.educationItem.grade}</b>
      </div>
    </div>
  </div>
);
