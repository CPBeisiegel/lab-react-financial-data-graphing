import axios from 'axios';
import { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import {FilterData} from './FilterData'


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
},[data])
       
        
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

                if (chart) {
                    chart.destroy();
                  }

                const myChart = new Chart(ctx,{
                    type: 'line',
                    data:{
                        labels: Object.keys(coins),
                        datasets: [{
                          label: 'Preço Bitcoin',
                          data: Object.values(coins),
                          borderColor: 'rgb(75, 192, 192)',
                          tension: 0.2
                        }]
                      }
                })
        
                setChart(myChart);
          }
          createChart();
    }


  
 }, [loading, coins])


   

return (
    <div>
         <FilterData setData={setData} />
        <div>{loading ? "Carregando..." : <canvas id="myCanvas" />}</div>
    </div>
)
}