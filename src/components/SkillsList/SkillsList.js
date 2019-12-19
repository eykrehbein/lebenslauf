import React from 'react';

import './SkillsList.scss';
import SkillItem from '../SkillItem/SkillItem';

export default props => (
  <div className="skillsList">
    {props.skills.map((skill, index) => (
      <SkillItem
        value={skill}
        deleteItemFunction={() => props.deleteItemFunction(index)}
      />
    ))}
  </div>
);
