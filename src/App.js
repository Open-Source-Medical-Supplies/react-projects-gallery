import "primeflex/primeflex.css";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import './shared/css/_prime.scss';
import React, { useState } from 'react';
import CardContainer from './components/card-container/card-container';
import DetailWindow from './components/detail-window/detail-window';
import initFabLib from './shared/font-awesome-lib';
import FullCard from "./components/detail-window/full-card";

const CardStateDefault = {
  data: {},
  visible: false
};

const App = () => {
  initFabLib();

  let [cardState, setCard] = useState(CardStateDefault);
  setCard = setCard.bind(this);

  const hide = () => setCard(CardStateDefault);

  return (
    <div style={{display: 'flex'}}>
      <div style={{display: 'flex', flex: 1}}>
        {/* <FilterMenu /> */}
      </div>
      <div style={{display: 'flex', flex: cardState.visible ? 2 : 4}}>
        <CardContainer cardChange={setCard} selectedCard={cardState.data} />
      </div>
      <div style={{display: 'flex', flex: cardState.visible ? 2 : 0}}>
        <DetailWindow visible={cardState.visible} onHide={hide} className='p-sidebar-md'>
          <FullCard card={cardState.data} />
        </DetailWindow>
      </div>
    </div>
  );
}

export default App;
