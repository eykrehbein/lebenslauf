import React, { Component } from 'react';

export default class SkillsInput extends Component {
  constructor() {
    super();
    this.state = {
      skillValue: ''
    };
  }
  componentDidMount() {}

  formSubmit(e) {
    e.preventDefault();
    this.props.addSkillFunction(this.state.skillValue);
    this.setState({ skillValue: '' });
  }

  // focus corresponding input on 'edit-icon' click
  focusParentInput(e) {
    e.target.parentElement.parentElement.querySelector('input').focus();
    e.target.parentElement.parentElement.querySelector('input').select();
  }

  deleteSkill(index) {}

  render() {
    return (
      <div class="editableValue">
        <form className="input" onSubmit={this.formSubmit.bind(this)}>
          <input
            placeholder={this.props.placeholder}
            value={this.state.skillValue}
            onChange={e => this.setState({ skillValue: e.target.value })}
          ></input>
          <div className="editIcon">
            <i
              className="fas fa-plus"
              onClick={this.focusParentInput.bind(this)}
            ></i>
          </div>
        </form>
      </div>
    );
  }
}
