import React, { Component } from 'react';

import './AddEducation.scss';

export default props => (
  <div className="addEducation">
    <div className="text">Du hast noch keine Ausbildung hinzugefügt.</div>
    <div className="addButton">
      <button
        className="button is-small is-success"
        onClick={props.clickHandler}
      >
        Ausbildung hinzufügen
      </button>
    </div>
  </div>
);
