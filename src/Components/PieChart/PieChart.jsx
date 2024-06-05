import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import axios from 'axios';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function PieChart() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get('https://tours-api-7hh1.onrender.com/tours/tours')
      .then(response => {
        const locationsData = response.data.data.map(tour => tour.location);
        setLocations(locationsData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

 

  const uniqueLocations = [...new Set(locations)];
  const locationColors = [
    'rgba(135, 206, 250, 0.5) ',   
    'rgba(84, 36, 325, 0.5)', 
    'rgba(217, 216, 24, 0.5)',  
    'rgba(217, 56, 138, 0.5)',  
    'rgba(217, 117, 56, 0.5)',  
    'rgba(24, 217, 69, 0.5)',   
    'rgba(191, 24, 217, 0.5)'   
  ];
  
  const locationCounts = uniqueLocations.map((location, index) => ({
    label: location,
    y: locations.filter(l => l === location).length,
    color: locationColors[index] // Assigning custom color based on index
  }));
  

  const options = {
    title: {
      text: 'Tour Locations Statistics'
    },
    data: [{
      type: 'pie',
      startAngle: 240,
      yValueFormatString: '##0',
      indexLabel: '{label} {y}',
      dataPoints: locationCounts
    }]
  };

  return (
    <div className='card shadow'>
      <div className='card-body'>
        <CanvasJSChart options={options} />
      </div>
    </div>
  );
}
