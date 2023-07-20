import React from 'react';

import Card from '../../components/Card/Card'
import { CChart } from '@coreui/react-chartjs';
import { chartData } from '../../Charts/chartData'

function Dashboard() {
  
  console.log("dashboard did load");
  return (
    <div>
      <h4 className='text-center mt-3'>Dashboard</h4>
      <Card  />
      <CChart {...chartData}></CChart>
    </div>
  );
}

export default Dashboard;
