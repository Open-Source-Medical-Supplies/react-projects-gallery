import React, { Component } from 'react';
import CardContainer from './components/card-container';
import FilterMenu from './components/filter-menu/filter-menu';
import initFabLib from './shared/font-awesome-lib';

class App extends Component {
  constructor() {
    super();
    initFabLib();
  }

  render() {
    return (
      <div>
        <FilterMenu />
        <CardContainer />
      </div>
    );
  }
}

export default App;
