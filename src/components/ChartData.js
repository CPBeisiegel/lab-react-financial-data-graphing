import axios from 'axios';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';



export function ChartData(){

    const [coins, setCoins] = useState({})
    const [loading, setLoading] = useState(true)
    const [chart, setChart] = useState(null)
    const [data, setData]  = useState(null);
    const [link, setLink] = useState("http://api.coindesk.com/v1/bpi/historical/close.json");

useEffect(() => {
    if(data !== null){
        setLink(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${data.from}&end=${data.to}`)
    }
})
       
        
useEffect(() => {
    setLoading(true);
    async function fetchData(){
         try {
           const response = await axios.get('http://api.coindesk.com/v1/bpi/historical/close.json')
           setCoins({...response.data.bpi});
           setLoading(false)
           
         } catch (error){
            setLoading(false)
             console.log(error)
         }
     }

     fetchData();

 },[link])

 useEffect(() => {
       
        if (!loading) {
            function createChart() {
                const ctx = document.getElementById("myCanvas").getContext("2d");

                const myChart = new Chart(ctx,{
                    type: 'line',
                    data:{
                        labels: Object.keys(coins),
                        datasets: [{
                          label: 'Preço Bitcoin',
                          data: Object.values(coins),
                          fill: true,
                          borderColor: 'rgb(75, 192, 192)',
                          tension: 0.1
                        }]
                      }
                })
        
                setChart(myChart);
          }
          createChart();
    }


  
 }, [loading, setCoins])


   

return (
    <div>
        <canvas id="myChart" width="400" height="400"></canvas>
    </div>
)
}