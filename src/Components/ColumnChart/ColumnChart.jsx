import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const locationColors = [
  'rgba(135, 206, 250, 0.5)',
  'rgba(84, 36, 325, 0.5)',
  'rgba(217, 216, 24, 0.5)',
  'rgba(217, 56, 138, 0.5)',
  'rgba(217, 117, 56, 0.5)',
  'rgba(24, 217, 69, 0.5)',
  'rgba(191, 24, 217, 0.5)'
];

export default function ColumnChart() {
  const [toursData, setToursData] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    axios.get('https://apis-2-4nek.onrender.com/tours/tours')
      .then(response => {
        setToursData(response.data.data || []);
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    const generateDataPoints = () => {
      const travelersByLocation = {};

      toursData.forEach(tour => {
        const location = tour.location;
        const totalTravelers = tour.totalTravelers;
        travelersByLocation[location] = (travelersByLocation[location] || 0) + totalTravelers;
      });

      const dataPoints = Object.keys(travelersByLocation).map((location, index) => ({
        label: location,
        y: travelersByLocation[location],
        color: locationColors[index % locationColors.length] // Assign color based on index
      }));

      setDataPoints(dataPoints);
    };

    generateDataPoints();
  }, [toursData]);

  const options = {
    animationEnabled: true,
    title: {
      text: "Number of Travelers by Location"
    },
    axisX: {
      title: "Location"
    },
    axisY: {
      title: "Number of Travelers"
    },
    data: [{
      type: "column",
      dataPoints: dataPoints
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
