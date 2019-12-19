import React from 'react';

// import UI lib
import './assets/ui.css';

import RootContainer from './components/RootContainer/RootContainer';
import Card from './components/Card/Card';

export default () => (
  <div className="app">
    <RootContainer>
      <div className="title">
        <h1>Lebenslauf</h1>
      </div>

      <Card title="Profil" splitContent="yes"></Card>
    </RootContainer>
  </div>
);
