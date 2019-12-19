import React, { Component } from 'react';

import './EditableValue.scss';

export default class EditableValue extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="editableValue">
        <div class="label">{this.props.label}</div>
        <div class="input">
          <input defaultValue={this.props.defaultValue}></input>
        </div>
      </div>
    );
  }
}
