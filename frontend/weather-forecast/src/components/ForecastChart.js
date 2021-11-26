import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '',
        },
    }
};








const ForecastChart = () => {

    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Temperature Readings',
                data: [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    });


    const fetchTemperatureReadings = function () {
        return axios.get('/weatherdata')


    }

    useEffect(() => {

        fetchTemperatureReadings().then(responseData => {
            // console.log('data received')
            updateChartData(responseData)
            setInterval(() => {
                fetchTemperatureReadings().then(responseData => {

                    updateChartData(responseData)

                })
            }, 5000)

        })
    }, [])



    function updateChartData(responseData) {
        let chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Temperature Readings',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
            ],
        };

        let foreCasttimes = responseData.data.readings.forecast.map((element) => element.time)
        let foreCasttemps = responseData.data.readings.forecast.map((element) => element.temp_f)
        let chartTimeLAbels= [responseData.data.readings.current.time, ...foreCasttimes].slice(0,4)

        chartTimeLAbels.forEach(element => {
            chartData.labels.push(element.substring(12))
        })


        chartData.datasets[0].data = [responseData.data.readings.current.temp_f, ...foreCasttemps].slice(0,4)
       
        // chartData.datasets[0].data
            
        
        // console.log('data' , data)

        setData({...chartData})
        // console.log(chartData)
        // ChartJS.update()
        // console.log('chartData' , data)


    }
    return (
        <Line options={options} data={data} />
    );
}

export default ForecastChart;