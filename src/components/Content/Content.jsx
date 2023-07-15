import React from 'react';
import Card from '../Card/Card';
import { CChart } from '@coreui/react-chartjs';
import { chartData } from '../../Charts/chartData'

function Content() {
  return (
    <div>
      <Card  />
      <CChart {...chartData}></CChart>
    </div>
  );
}

export default Content;
