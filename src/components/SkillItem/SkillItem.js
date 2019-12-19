import React from 'react';

import './SkillItem.scss';

export default props => (
  <div class="skillItem">
    <div class="value">{props.value}</div>
    <div class="delete" onClick={props.deleteItemFunction}>
      <i class="fas fa-times"></i>
    </div>
  </div>
);
