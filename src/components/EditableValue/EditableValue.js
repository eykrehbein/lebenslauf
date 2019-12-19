import React, { Component } from 'react';

import './EditableValue.scss';

export default class EditableValue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultValue || '',
      selectValue: this.props.defaultSelectValue || '0'
    };
  }

  componentDidMount() {
    // try to get stored value

    const storedVal = localStorage.getItem(`cpj:${this.props.inputClassifier}`);
    if (storedVal !== null) {
      if (!this.props.isSelect) {
        this.setState({ inputValue: storedVal });
      } else {
        this.setState({ selectValue: storedVal });
      }
    }
  }

  // focus corresponding input on 'edit-icon' click
  focusParentInput(e) {
    e.target.parentElement.parentElement.querySelector('input').focus();
    e.target.parentElement.parentElement.querySelector('input').select();
  }

  // function that fires on input key down - date picker
  inputKeyPressed(e) {
    const key = e.key;

    const numbersOnlyRegex = RegExp('^[0-9]*$', 'gm');
    if (this.props.isDatePicker) {
      if (numbersOnlyRegex.test(key) === false) {
        e.preventDefault();
        return;
      }
      const currentValue = e.target.value;

      const zeroToThreeRegex = RegExp('^[0-3]*$', 'gm');
      const zeroToOneRegex = RegExp('^[0-1]*$', 'gm');
      const zeroToTwoRegex = RegExp('^[0-2]*$', 'gm');
      const oneToTwoRegex = RegExp('^[1-2]*$', 'gm');

      if (currentValue.length === 0) {
        if (zeroToThreeRegex.test(key) === false) {
          e.preventDefault();
          return;
        }
      }

      if (currentValue.length === 3) {
        if (zeroToOneRegex.test(key) === false) {
          e.preventDefault();
          return;
        }
      }

      if (currentValue.length === 6) {
        if (oneToTwoRegex.test(key) === false) {
          e.preventDefault();
          return;
        }
      }

      if (currentValue.length === 4) {
        if (currentValue.split('')[3] === '1') {
          if (zeroToTwoRegex.test(key) === false) {
            e.preventDefault();
            return;
          }
        }
      }
      if (currentValue.length === 7) {
        if (currentValue.split('')[6] === '2') {
          if (key !== '0') {
            e.preventDefault();
            return;
          }
        }
        if (currentValue.split('')[6] === '1') {
          if (key !== '9') {
            e.preventDefault();
            return;
          }
        }
      }

      if (currentValue.length === 1 || currentValue.length === 4) {
        e.preventDefault();
        e.target.value = currentValue + key + '.';
      }

      if (currentValue.length === 2 || currentValue.length === 5) {
        e.preventDefault();
        e.target.value = currentValue + '.' + key;
      }

      if (currentValue.length >= 10) {
        e.preventDefault();
      }
    }
  }

  // function that fires on input change
  inputValueChanged(e) {
    const val = e.target.value;

    localStorage.setItem(`cpj:${this.props.inputClassifier}`, val);
    this.setState({ inputValue: val });
    return;
  }

  // functoin that fires on select change
  selectChanged(e) {
    const val = e.target.value;
    this.setState({ selectValue: val });
    localStorage.setItem(`cpj:${this.props.inputClassifier}`, val);
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
          {this.props.isSelect ? (
            <div className="selectOverlay">
              <select
                value={this.state.selectValue}
                onChange={this.selectChanged.bind(this)}
              >
                {this.props.children}
              </select>
            </div>
          ) : null}
          <input
            value={this.state.inputValue}
            onChange={this.inputValueChanged.bind(this)}
            onKeyPress={this.inputKeyPressed.bind(this)}
            placeholder={this.props.placeholder}
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
