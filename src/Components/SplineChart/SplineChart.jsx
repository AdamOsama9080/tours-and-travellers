import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SplineChart = () => {
    const [toursData, setToursData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:2000/tours/tours')
            .then(response => {
                setToursData(response.data.data || []);
                console.log('Fetched data:', response.data.data);
            })
            .catch(error => {
                console.error('Error fetching tours data:', error);
            });
    }, []);

    const convertDurationToDays = (duration) => {
        // Parse duration string to extract the number of days
        const durationParts = duration.split(' ');
        const numberOfDays = parseInt(durationParts[0], 10);
        return numberOfDays;
    };

    const generateDataPoints = () => {
        const dataPoints = [];
        toursData.forEach(tour => {
            const startDate = new Date(tour.startDate);
            const duration = convertDurationToDays(tour.duration);
            const endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000); // Add duration to start date
            dataPoints.push({ x: startDate, y: duration });
            dataPoints.push({ x: endDate, y: 0 }); // Add a data point at the end date with y = 0 for a discontinuous line
        });
        // Sort data points by date
        dataPoints.sort((a, b) => a.x - b.x);
        return dataPoints;
    };
    
    const options = {
        animationEnabled: true,
        title: {
            text: "Tour Duration Over Time"
        },
        axisX: {
            title: "Date",
            valueFormatString: "DD MMM YYYY"
        },
        axisY: {
            title: "Duration (days)"
        },
        data: [{
            type: "spline",
            // markerSize: 5,
            color: "rgba(56, 24, 217, 0.5)",
            markerColor: "rgba(56, 24, 217, 1)",
            dataPoints: generateDataPoints()
        }]
    };

    return (
        <div className='card shadow'>
        <div className='card-body'>
          <CanvasJSChart options={options} />
        </div>
      </div>
    );
};

export default SplineChart;
