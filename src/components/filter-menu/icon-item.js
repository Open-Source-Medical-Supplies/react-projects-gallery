import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Card} from 'primereact/card';

export default function IconItem ({item}) {
  return (
    <Card >
      <FontAwesomeIcon icon={item.icon} />
      {item.label} {/* display name from MedSupCat */}
    </Card>
  );
}