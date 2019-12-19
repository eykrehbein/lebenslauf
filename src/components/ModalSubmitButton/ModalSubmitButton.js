import React from 'react';

import './ModalSubmitButton.scss';

export default props => (
  <div className="modalSubmitButton">
    <button
      className={'button is-small is-' + props.color}
      onClick={props.clickHandler}
      style={{ marginRight: props.marginRight }}
    >
      {props.buttonText}
    </button>
  </div>
);
