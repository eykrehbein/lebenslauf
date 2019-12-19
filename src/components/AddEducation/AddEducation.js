import React, { Component } from 'react';

import './AddEducation.scss';

export default props => (
  <div className="addEducation">
    <div className="text">{props.title}</div>
    <div className="addButton">
      <button
        className="button is-small is-primary"
        onClick={props.clickHandler}
      >
        Ausbildung hinzufügen
      </button>
    </div>
  </div>
);
