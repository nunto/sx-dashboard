import React, { Component } from 'react';
import Chart from 'react-google-charts';


class AreaChart extends Component {
    render() {
        return (
            <Chart
            width={'100%'}
            height={'100%'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Year', 'Sales', 'Expenses'],
              ['2016', 1000, 400],
              ['2017', 1170, 460],
              ['2018', 660, 1120],
              ['2019', 1030, 540],
            ]}
            options={{
              title: 'Company Performance',
              hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
              vAxis: { minValue: 0 },
              // For the legend to fit, we make the chart area smaller
              chartArea: { width: '57.5%', height: '70%' },
              // lineWidth: 25
            }}
          />
        );
    }
}

export default AreaChart;