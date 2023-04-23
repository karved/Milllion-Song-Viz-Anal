import React from 'react';
import ReactECharts from 'echarts-for-react';

function Chart (props) {

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      textStyle: {
        fontFamily: 'Montserrat'
      },
    },
    legend: {
      textStyle: {
        fontFamily: 'Montserrat'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
      
    },
    xAxis: [
      {
        type: 'category',
        name: "Year",
        data: props.data.map(item => item.year),
        
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: "Sentiment Score",
   
      }
    ],
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        saveAsImage: {}
      }
    },
    // dataZoom: [
    //   {
    //     type: 'inside'
    //   },
    //   {
    //     type: 'slider'
    //   }
    // ],
    series: [
  
      {
        name: 'Positive',
        type: 'bar',
        stack: 'Ad',
        color: "#b2df8a",
  
        data: props.data.map(item => item.positive)
      },
      {
        name: 'Negative',
        type: 'bar',
        stack: 'Ad',
        color: "#fb9a99",
  
        data: props.data.map(item => item.negative)
      },
      {
        name: 'Neutral',
        type: 'bar',
        stack: 'Ad',
        color: "#a6cee3",
    
        data: props.data.map(item => item.neutral)
      },
     
    ]
  };

  return <ReactECharts option={options} style={{ height: "400%" }}  />;
};

export default Chart;