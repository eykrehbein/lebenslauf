import React, { Component } from 'react';

import './EditableValue.scss';

export default class EditableValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue || ''
    };
  }

  componentDidMount() {
    // try to get stored value
    const storedVal = localStorage.getItem(`cpj:${this.props.inputClassifier}`);
    if (storedVal !== null) {
      this.setState({ inputValue: storedVal });
    }
  }

  // focus corresponding input on 'edit-icon' click
  focusParentInput(e) {
    e.target.parentElement.parentElement.querySelector('input').focus();
    e.target.parentElement.parentElement.querySelector('input').select();
  }

  inputValueChanged(e) {
    const val = e.target.value;
    localStorage.setItem(`cpj:${this.props.inputClassifier}`, val);

    this.setState({ inputValue: val });
  }

  // unfocus input when user hits enter
  formSubmit(e) {
    e.preventDefault();
    e.target.querySelector('input').blur();
  }

  render() {
    return (
      <div className="editableValue">
        <div className="label">{this.props.label}</div>
        <form className="input" onSubmit={this.formSubmit.bind(this)}>
          <input
            value={this.state.inputValue}
            onChange={this.inputValueChanged.bind(this)}
          ></input>
          <div className="editIcon">
            <i
              className="fas fa-pen"
              onClick={this.focusParentInput.bind(this)}
            ></i>
          </div>
        </form>
      </div>
    );
  }
}
