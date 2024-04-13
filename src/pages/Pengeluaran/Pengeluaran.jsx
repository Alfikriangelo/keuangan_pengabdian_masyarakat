import React, { useEffect, useRef } from 'react'
import Navbar from '../../component/Navbar/Navbar'
import Chart from 'chart.js/auto'


const Pengeluaran = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if(chartInstance.current){
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: [
          'Pemasukan',
          'Pengeluaran',
          
        ],
        datasets: [{
          data: [500000, 50000000],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
          ]
      }],
      }
    })
  })

  return (
    <div>
        <Navbar />
        <div style={{width: 300, marginTop: 130}}>
          <canvas ref={chartRef} />
        </div>
    </div>
  )
}

export default Pengeluaran