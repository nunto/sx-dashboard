import React, { Component } from 'react';
import Chart from 'react-google-charts';


// Pie Chart
class PieChart extends Component {
render() {
      return (
          <Chart
            width={'100%'}
            height={'100%'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Machine', 'Task Assignments'],
              ['Machine A', 49],
              ['Machine B', 31],
              ['Machine C', 25],
              ['Machine D', 41]
            ]}
            options={{
            title: 'Task Assignment Locations',
            is3D: true,
            }}
          />
      )
}
}

export default PieChart;