import React, { Component } from 'react';

import './Select.scss';

export default class Select extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="custom-select">
        <select></select>
      </div>
    );
  }
}
