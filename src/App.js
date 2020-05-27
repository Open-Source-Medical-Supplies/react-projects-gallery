import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import React, { useState, useEffect } from 'react';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import FullCard from "./components/detail-window/full-card";
import FilterMenu from "./components/filter-menu/filter-menu";
import './shared/css/_prime.scss';
import initFabLib from './shared/font-awesome-lib';
import { getRows } from "./service/airtable";

/**
 * @type {{
       _records: Array<{}>
       records: Array<{}>
       selectedCard: {}
       visible: boolean
  }} _records
 */
const StateDefault = {
  _records: [], // immutable
  records: [],
  selectedCard: {},
  visible: false,
};

const App = () => {
  initFabLib();

  let [state, baseSetState] = useState(StateDefault);
  const setState = (props) => baseSetState({...state, ...props});

  const hide = () => setState({selectedCard: {}, visible: false});

  useEffect(() => {
    (async function fetch() {
      const rows = await getRows();
      rows.eachPage(
        (records, fetchNextPage) => {
          const simpleRecords = records
            .map(({fields}) => fields) // strip Airtable operations
            .filter(field => field.staging !== true);
          setState({records: simpleRecords, _records: simpleRecords});
        },
        (err) => {
          if (err) { console.error(err); return; }
        }
      );
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  return (
    <div style={{display: 'flex'}}>
      <div style={{flex: 1, marginRight: '0.5rem'}}>
        <FilterMenu _records={state._records} setState={setState}/>
      </div>
      <div style={{display: 'flex', flex: state.visible ? 2 : 4}}>
        <CardContainer records={state.records} cardChange={setState} selectedCard={state.selectedCard} />
      </div>
      <div style={{display: 'flex', flex: state.visible ? 2 : 0}}>
        <DetailWindow visible={state.visible} onHide={hide} className='p-sidebar-md'>
          <FullCard selectedCard={state.selectedCard} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
