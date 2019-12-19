import React from 'react';

import './PEItem.scss';

export default props => (
  <div className="peItem card">
    <div className="card-header">
      <p className="peTitle">{props.peItem.stellenbezeichnung}</p>
      <div className="editIcon" onClick={props.editClicked}>
        <i className="fas fa-pen"></i>
      </div>
    </div>
    <div className="card-body">
      <div className="row">
        Unternehmen: <b>{props.peItem.unternehmen}</b>
      </div>
      <div className="row">
        Anstullungsart: <b>{props.peItem.anstellungsartString}</b>
      </div>
      <div className="row">
        Zeitraum:{' '}
        <b>
          {props.peItem.start} - {props.peItem.end}
        </b>
      </div>
      <div className="row">
        Standort: <b>{props.peItem.standort}</b>
      </div>
    </div>
  </div>
);
